---
title: Hardware Sizing Guidelines
currentMenu: dsdb-guides-hsg
parent2: dsdb-guides
parent1: dsd-dsdb
---

# Hardware Sizing Guidelines

This guide offers general hardware recommendations for DSDB and addresses some frequently asked questions about hardware sizing. The recommendations are only for the `tsm1` storage engine. Instances still running [unconverted](/dsdb/v1.0/administration/upgrading/#convert-b1-and-bz1-shards-to-tsm1) `b1` or `bz1` shards may have different performance characteristics. See the [DSDB 0.9 sizing guide](/dsdb/v0.9/guides/hardware_sizing/) for more detail.

Single node:

* [General hardware guidelines for a single node](/dsdb/v1.0/guides/hardware_sizing/#general-hardware-guidelines-for-a-single-node)
* [When do I need more RAM?](/dsdb/v1.0/guides/hardware_sizing/#when-do-i-need-more-ram)
* [What kind of storage do I need?](/dsdb/v1.0/guides/hardware_sizing/#what-kind-of-storage-do-i-need)
* [How much storage do I need?](/dsdb/v1.0/guides/hardware_sizing/#how-much-storage-do-i-need)
* [How should I configure my hardware?](/dsdb/v1.0/guides/hardware_sizing/#how-should-i-configure-my-hardware)

Clustering:

* [General hardware guidelines for clusters](/dsdb/v1.0/guides/hardware_sizing/#general-hardware-guidelines-for-clusters)
* [How should I configure my hardware?](/dsdb/v1.0/guides/hardware_sizing/#how-should-i-configure-my-hardware-1)

## General hardware guidelines for a single node

We define the load that you'll be placing on DSDB by the number of writes per second, the number of queries per second, and the number of unique [series](/dsdb/v1.0/concepts/glossary/#series). Based on your load, we make general CPU, RAM, and IOPS recommendations.

| Load                    | Writes per second | Queries per second | Unique series  |
|:------------------------|:------------------|:-------------------|:---------------|
| **Low**                 | < 5 thousand      | < 5                | < 100 thousand |
| **Moderate**            | < 100 thousand    | < 25               | < 1 million    |
| **High**                | > 100 thousand    | > 25               | > 1 million    |
| **Probably infeasible** | > 500 thousand    | > 100              | > 10 million   |


#### Low load recommendations
* CPU: 2-4   
* RAM: 2-4 GB   
* IOPS: 500   

#### Moderate load recommendations
* CPU: 4-6  
* RAM: 8-32GB  
* IOPS: 501.000  

#### High load recommendations
* CPU: 8+  
* RAM: 32+ GB  
* IOPS: 1000+  

#### Probably infeasible load
Performance at this scale is a significant challenge and may not be achievable. Please contact us at <sales@dsdb.com> for assistance with tuning your systems.

## When do I need more RAM?
In general, having more RAM helps queries return faster. There is no known downside to adding more RAM.

The major component that affects your RAM needs is series cardinality. Series cardinality is the total number of [series](/dsdb/v1.0/concepts/glossary/#series) in a database. If you have one measurement with two tags, and each tag has 1,000 possible values then the series cardinality is 1 million. A series cardinality around or above 10 million can cause OOM failures even with large amounts of RAM. If this is the case, you can usually address the problem by redesigning your [schema](/dsdb/v1.0/concepts/glossary/#schema).

The increase in RAM needs relative to series cardinality is exponential where the exponent is between one and two:

![Series Cardinality](/img/dsdb/series-cardinality.png)

## What kind of storage do I need?
DSDB is designed to run on SSDs.  Performance is lower on spinning disk drives and may not function properly under increasing loads.

## How much storage do I need?
Database names, [measurements](/dsdb/v1.0/concepts/glossary/#measurement), [tag keys](/dsdb/v1.0/concepts/glossary/#tag-key), [field keys](/dsdb/v1.0/concepts/glossary/#field-key), and [tag values](/dsdb/v1.0/concepts/glossary/#tag-value) are stored only once and always as strings. Only [field values](/dsdb/v1.0/concepts/glossary/#field-value) and [timestamps](/dsdb/v1.0/concepts/glossary/#timestamp) are stored per-point.

Non-string values require approximately three bytes. String values require variable space as determined by string compression.

## How should I configure my hardware?
When running DSDB in a production environment the `wal` directory and the `data` directory should be on separate storage devices. This optimization significantly reduces disk contention when the system is under heavy write load. This is an important consideration if the write load is highly variable. If the write load does not vary by more than 15% the optimization is probably unneeded.

## General hardware guidelines for clusters

Minimum hardware requirements:

* CPU: 2
* RAM: 4 GB
* IOPS: 1000+

When running a cluster every member should have at least two cores.

For better performance, we recommend having 8 GB RAM and 4 CPUs or more.

## How should I configure my hardware differently from a single-node instance?
Place the `hh` directory on a separate storage device from the `wal` and `data` directories. This significantly reduces disk contention when the cluster is under heavy write load. For more information on setting up a cluster, see [Clustering setup](/dsdb/v1.0/guides/clustering/).
