---
title: DSDB Documentation
currentMenu: dsdb-index
parent1: dsd-dsdb
---

# DSDB Documentation

DSDB is a [time series database](https://en.wikipedia.org/wiki/Time_series_database) built from the ground up to handle high write and query loads.
DSDB is meant to be used as a backing store for any use case involving large amounts of timestamped data, including DevOps monitoring, application metrics, IoT sensor data, and real-time analytics.

## Key Features

Here are some of the features that DSDB currently supports that make it a great choice for working with time series data.

* Custom high performance datastore written specifically for time series data.
* Replication and high-availability are most stringent target to achieve.
* Written entirely in Erlang and with natural fault-tolerance property built inside.
* Clustering is built in.
Nothing else is needed to make data highly available (unlike Redis, ZooKeeper, Cassandra, and others).
* Simple, high performing write and query HTTP(S) APIs.
* Expressive SQL-like query language tailored to easily query aggregated data.
* Tags allow series to be indexed for fast and efficient queries.
* Retention policies efficiently auto-expire stale data.
* Continuous queries automatically compute aggregate data to make frequent queries more efficient.
* Built in web admin interface.

## Project Status

* The native SQL query engine is built in for beta version.
A significant optimization for query engine is in progress targeted for release in version 1.2.0.
