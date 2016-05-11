---
title: "Server Monitoring"
currentMenu: "dsdb-monitoring"
parent2: dsdb-admin
parent1: dsd-dsdb
---

# Server Monitoring

DSDB can display statistical and diagnostic information about each node.
This information can be very useful for troubleshooting and performance monitoring.
 
## SHOW STATS
To see node stats execute the command `SHOW STATS`.
An example is shown below.

```sql
SHOW STATS
```

```json
{
    "results": [
        {
            "series": [
                {
                    "name": "server",
                    "columns": [
                        "broadcastMessageRx",
                        "batchWriteRx",
                        "pointWriteRx",
                        "writeSeriesMessageTx"
                    ],
                    "values": [
                        [
                            37
                        ],
                        [
                            299984
                        ],
                        [
                            2789
                        ],
                        [
                            25
                        ]
                    ]
                }
            ]
        }
    ]
}
```

The statistics returned by `SHOW STATS` are stored in memory only, and are reset to zero when the node is restarted.

## SHOW DIAGNOSTICS
To see node diagnostics execute the command `SHOW DIAGNOSTICS`.
This returns information such as build information, uptime, hostname, server configuration, memory usage, and Go runtime diagnostics.

## Internal Monitoring
DSDB also writes statistical and diagnostic information to database named `_internal`, which records metrics on the internal runtime and service performance.
The `_internal` database can be queried and manipulated like any other DSDB database.
Check out the [monitor service README](https://github.com/Dasudian/dsdb/blob/master/monitor/README.md) and the [internal monitoring blog post](https://dsdb.com/blog/2015/09/22/monitoring_internal_show_stats.html) for more detail.

## Useful Commands

Below are a collection of commands to find useful performance metrics about your DSDB instance. 

To find the number of unique series in a database run the following command: 
```bash
$ influx -execute "SHOW SERIES" -database "mydb" | sed '/name: .*/d' | sed '/\-\-/d' | sed '/_key/d' | sed '/^$/d' | wc -l
```
To find the number of points per second being written to the instance. Must have the `monotor` service enabled:
```bash
$ influx -execute 'select derivative(pointReq, 1s) from "write" where time > now() - 5m' -database '_internal' -precision 'rfc3339'
```
To find the number of writes separated by database since the beginnning of the log file:
```bash
$ grep 'POST' /var/log/dsdb/influxd.log | awk '{ print $10 }' | sort | uniq -c 
```
