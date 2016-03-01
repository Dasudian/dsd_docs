---
title: Storage Engine
currentMenu: dsdb-concepts-storage-engine
---

# Storage Engine

## Properties of Time Series Data

The workload of time series data is quite different from normal database workloads.
There are a number of factors that conspire to make it very difficult to get it to scale and perform well:

* Billions of individual data points
* High write throughput
* High read throughput
* Large deletes to free up disk space
* Mostly an insert/append workload, very few updates

The first and most obvious problem is one of scale.
In DevOps, for instance, you can collect hundreds of millions or billions of unique data points every day.

To prove out the numbers, let’s say we have 200 VMs or servers running, with each server collecting an average of 100 measurements every 10 seconds.
Given there are 86,400 seconds in a day, a single measurement will generate 8,640 points in a day, per server.
That gives us a total of 200 * 100 * 8,640 = 172,800,000 individual data points per day.
We find similar or larger numbers in sensor data use cases.

The volume of data means that the write throughput can be very high.
We regularly get requests for setups than can handle hundreds of thousands of writes per second.
I’ve talked to some larger companies that will only consider systems that can handle millions of writes per second.

At the same time, time series data can be a high read throughput use case.
It’s true that if you’re tracking 700,000 unique metrics or time series, you can’t hope to visualize all of them, which is what leads many people to think that you don’t actually read most of the data that goes into the database.
However, other than dashboards that people have up on their screens, there are automated systems for monitoring or combining the large volume of time series data with other types of data.

Inside DSDB, we have aggregates that can get calculated on the fly that can combine tens of thousands of time series into a single view.
Each one of those queries does a read on each data point, which means that for DSDB, the read throughput is often many times higher than the write throughput.

Given that time series is a mostly an append only workload, you might think that it’s possible to get great performance on a B+Tree.
Appends in the keyspace are efficient and you can achieve greater than 100,000 per second.
However, we have those appends happening in individual time series.
So the inserts end up looking more like random inserts than append only inserts.

One of the biggest problems we found with time series data is that it’s very common to delete all data after it gets past a certain age.
The common pattern here is that you’ll have high precision data that is kept for a short period of time like a few hours or a few weeks.
You’ll then downsample and aggregate that data into lower precision, which you’ll keep around for much longer.

The naive implementation would be to simply delete each record once it gets past its expiration time.
However, that means that once you’re up to your window of retention, you’ll be doing just as many deletes as you do writes, which is something most storage engines aren’t designed for.

Let’s dig into the details of the two types of storage engines we tried and how these properties had a significant impact on our performance.

### LevelDB and Log Structured Merge Trees

We picked LevelDB as the storage engine because it was what we used for time series data storage for the product that was the precursor to DSDB.

We knew that it had great properties for write throughput and everything works fine.

LevelDB is an implementation of a Log Structured Merge Tree (or LSM Tree) that was built as an open source project at Google.
It exposes an API for a key/value store where the key space is sorted.
This last part is important for time series data as it would allow us to quickly go through ranges of time as long as the timestamp was in the key.

LSM Trees are based on a log that takes writes and two structures known as Mem Tables and SSTables.
These tables represent the sorted keyspace.
SSTables are read only files that continuously get replaced by other SSTables that merge inserts and updates into the keyspace.

The two biggest advantages that LevelDB had for us were high write throughput and built in compression.
However, as we learned more about what people needed with time series data, we encountered a few insurmountable challenges.

The first problem we had was that LevelDB doesn’t support hot backups.
If you want to do a safe backup of the database, you have to close it and then copy it.
The LevelDB variants RocksDB and HyperLevelDB fix this problem so we could have moved to them, but there was another problem that was more pressing that we didn’t think could be solved with either of them.

We needed to give our users a way to automatically manage the data retention of their time series data.
That meant that we’d have to do very large scale deletes.
In LSM Trees a delete is as expensive, if not more so, than a write.
A delete will write a new record known as a tombstone.
After that queries will merge the result set with any tombstones to clear out the deletes.
Later, a compaction will run that will remove the tombstone and the underlying record from the SSTable file.

To get around doing deletes, we split data across what we call shards, which are contiguous blocks of time.
Shards would typically hold either a day or 7 days worth of data.
Each shard mapped to an underlying LevelDB.
This meant that we could drop an entire day of data by just closing out the database and removing the underlying files.

Users of RocksDB may at this point bring up a feature called ColumnFamilies.
When putting time series data into Rocks, it’s common to split blocks of time into column families and then drop those when their time is up.
It’s the same general idea that you create a separate area where you can just drop files instead of updating any indexes when you delete a large block of old data.
Dropping a column family is a very efficient operation.
However, column families are a fairly new feature and we had another use case for shards.

Organizing data into shards meant that it could be moved within a cluster without having to examine billions of keys.
At the time of this writing I don’t think it’s possible to move a column family in one RocksDB to another.
Old shards are typically cold for writes so moving them around would be cheap and easy and we’d have the added benefit of having a spot in the keyspace that is cold for writes so it would be easier to do consistency checks later.

The organization of data into shards worked great for a little while until a large amount of data went into DSDB.
For our users that had 6 months or a year of data in large databases, they would run out of file handles.
LevelDB splits the data out over many small files.
Having dozens or hundreds of these databases open in a single process ended up creating a big problem.
It’s not something we found with a large number of users, but for anyone that was stressing the database to its limits, they were hitting this problem and we had no fix for it.
There were simply too many file handles open.

### Optimized Erlang ETS table for caching
