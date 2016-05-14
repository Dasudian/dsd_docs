---
title: "Database Configuration"
currentMenu: "dsdb-configuration"
parent2: dsdb-admin
parent1: dsd-dsdb
---

# Database Configuration

The DSDB configuration file contains configuration settings specific to a local node.

## Using Configuration Files

## Configuration Sections


## Configuration Options


## Global Options

## [meta]

This section controls some of the parameters for the DSDB cluster.
Specifically, it handles the parameters for the Raft consensus group which coordinates metadata about the cluster.
For step-by-step instructions on setting up an DSDB cluster, see [Cluster Setup](/dsdb/guides/clustering.md).

### dir = "/var/opt/dsdb/meta"


>**Note:** The default directory for OSX installations is `/Users/<username>/.dsdb/meta`

### hostname = "localhost"

The hostname is the `hostname` of the node which is advertised to its Raft peers.

### bind-address = ":8088"

The bind address is the `port` of the node which is used to communicates with its Raft peers.

### retention-autocreate = true

Retention policy auto-creation automatically creates a [`default` retention policy](/dsdb/concepts/glossary.md#retention-policy-rp) when a database is created.
The retention policy is named `default`, has an infinite duration, and is also set as the database's default retention policy, which is used when a write or query does not specify a retention policy.
Disable this setting to prevent the creation of a `default` retention policy when creating databases.

### election-timeout = "1s"

The election timeout is the duration a Raft candidate spends in the candidate state without a leader before it starts an election.
The election timeout is slightly randomized on each Raft node to a value between one to two times the election timeout duration.
The default setting should work for most systems.

### heartbeat-timeout = "1s"

The heartbeat timeout is the amount of time a Raft follower remains in the follower state without a leader before it starts an election.
Clusters with high latency between nodes may want to increase this parameter.

### leader-lease-timeout = "500ms"

The leader lease timeout is the amount of time a Raft leader will remain leader if it does not hear from a majority of nodes.
After the timeout the leader steps down to the follower state.
The default setting should work for most systems.

### commit-timeout = "50ms"

The commit timeout is the amount of time a Raft node will tolerate between commands before issuing a heartbeat to tell the leader it is alive.
The default setting should work for most systems.

### cluster-tracing = false

Cluster tracing toggles the logging of Raft logs on Raft nodes.
Enable this setting when debugging Raft consensus issues.

### logging-enabled = true

Meta logging toggles the logging of messages from the meta service.

## [data]

This section controls where the actural shard data for DSDB lives and how it is flushed from the WAL. `dir` may need to be changed to a suitable place for you system, but the WAL settings are an advanced configuration. The defaults should work for most systems.

### dir = "/var/opt/dsdb/data"

The directory where DSDB stores the data.
This directory may be changed.

## [http]

This section controls how DSDB configures the HTTP endpoints.
These are the primary mechanisms for getting data into and out of DSDB.
Edit the options in this section to enable HTTPS and authentication.
See [Authentication and Authorization](/dsdb/administration/authentication_and_authorization.md).

### enabled = true

Set to `false` to disable HTTP.
Note that the DSDB [command line interface (CLI)](/dsdb/tools/shell.md) connects to the database using the HTTP API.

### bind-address = ":8088"

The port used by the HTTP API.

### auth-enabled = false

Set to `true` to require authentication.

### log-enabled = true

Set to `false` to disable logging.

### write-tracing = false

Set to `true` to enable logging for the write payload.
If set to `true`, this will duplicate every write statement in the logs and is thus not recommended for general use.

### pprof-enabled = false

Set to `true` to enable [pprof](http://blog.golang.org/profiling-go-programs) on DSDB so that it gathers detailed performance information.

### https-enabled = false

Set to `true` to enable HTTPS.

### https-certificate = "/etc/ssl/dsdb.pem"

The path of the certificate file.

## [[graphite]]

This section controls one or many listeners for Graphite data.
See the [README](https://github.com/dsdb/dsdb/blob/master/services/graphite/README.md) on GitHub for more information.

### enabled = false

Set to `true` to enable Graphite input.

### database = "graphite"

The name of the database that you want to write to.

### bind-address = ":2003"

The default port.

### protocol = "tcp"

Set to `tcp` or `udp`.

