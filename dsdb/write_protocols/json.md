---
title: JSON Protocol
currentMenu: dsdb-writepro-json
parent2: dsdb-writepro
parent1: dsd-dsdb
---

# JSON Protocol

The JSON write protocol is deprecated as of DSDB 0.9.1.
It is still present in DSDB 1.0 but it will be removed no later than the DSDB 1.0 release.
The [line protocol](/dsdb/v1.0/write_protocols/line/) is the only recommended write protocol for DSDB 1.0.

For reasons behind the deprecation, please see the comments on the line protocol pull request, particularly the comments on JSON serialization [CPU costs](https://github.com/dasudian/dsdb/pull/2696#issuecomment-106968181) and on the [ease of use](https://github.com/dsdb/dsdb/pull/2696#issuecomment-107043910) concerns.
