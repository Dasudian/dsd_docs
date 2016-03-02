---
title: Diamond
currentMenu: dsdb-datasource-diamond
parent2: dsdb-datasource
parent1: dsd-dsdb
---

# Diamond

## Saving Diamond Metrics into DSDB

Diamond is a metrics collection and delivery daemon written in Python.
It is capable of collecting cpu, memory, network, i/o, load and disk metrics.
Additionally, it features an API for implementing custom collectors for gathering metrics from almost any source.

[Diamond homepage](https://github.com/python-diamond)

Diamond started supporting DSDB at version 3.5.

## Configuring Diamond to send metrics to DSDB

Prerequisites: Diamond depends on the [dsdb python client](https://github.com/dasudian/dsdb-python).
DSDB-version-specific installation instructions for the dsdb python client can be found on their [github page](https://github.com/dasudian/dsdb-python).
