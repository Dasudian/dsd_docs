---
title: CLI/Shell
currentMenu: dsdb-tools-shell
parent2: dsdb-tools
parent1: dsd-dsdb
---

# CLI/Shell

The DSDB's command line interface (`dsdb`) is an interactive shell for the HTTP API.
Use `dsdb` to write data (manually or from a file), query data interactively, and view query output in different formats.

* [Launch `dsdb`](/dsdb/tools/shell.md#launch-dsdb)
* [`dsdb` Arguments](/dsdb/tools/shell.md#dsdb-arguments)
* [`dsdb` Commands](/dsdb/tools/shell.md#dsdb-commands)

## Launch `dsdb`
If you [install](https://dsdbata.com/downloads/) DSDB via a package manager, the CLI is installed at `/usr/bin/dsdb` (`/usr/local/bin/dsdb` on OS X).

To access the CLI, first launch the `dsdb` database process and then launch `dsdb` in your terminal.
Once you've entered the shell and successfully connected to an DSDB node, you'll see the following output:
<br>
<br>
```sh
$ dsdb
Connected to http://localhost:8086 version 1.0.x
DSDB shell 1.0.x
```

## `dsdb` Arguments
There are several arguments you can pass into `dsdb` when starting.
List them with `$ dsdb --help`.
The list below offers a brief discussion of each option.
We provide detailed information on `-execute`, `-format`, and `-import` at the end of this section.

`-compressed`  
Set to true if the import file is compressed.
Use with `-import`.

`-consistency 'any|one|quorum|all'`  
Set the write consistency level.

`-database 'database name'`  
The database to which `dsdb` connects.

`-execute 'command'`  
Execute an [DSDBQL](/dsdb/query_language/data_exploration.md) command and quit.
See [-execute](/dsdb/tools/shell.md#execute-an-dsdbql-command-and-quit-with-execute).

`-format 'json|csv|column'`  
Specifies the format of the server responses.
See [-format](/dsdb/tools/shell.md#specify-the-format-of-the-server-responses-with-format).

`-host 'host name'`  
The host to which `dsdb` connects.
By default, DSDB runs on localhost.

`-import`  
Import new data from a file or import a previously [exported](https://github.com/dsdb/dsdb/blob/master/importer/README.md) database from a file.
See [-import](/dsdb/tools/shell.md#import-data-from-a-file-with-import).

`-password 'password'`  
The password `dsdb` uses to connect to the server.
`dsdb` will prompt for a password if you leave it blank (`-password ''`).

`-path`  
The path to the file to import.
Use with `-import`.

`-port 'port #'`  
The port to which `dsdb` connects.
By default, DSDB runs on port `8086`.

`-pps`  
How many points per second the import will allow.
By default, pps is zero and dsdb will not throttle importing.
Use with `-import`.

`-precision 'rfc3339|h|m|s|ms|u|ns'`  
Specifies the format/precision of the timestamp: `rfc3339` (`YYYY-MM-DDTHH:MM:SS.nnnnnnnnnZ`), `h` (hours), `m` (minutes), `s` (seconds), `ms` (milliseconds), `u` (microseconds), `ns` (nanoseconds).
Precision defaults to nanoseconds.

> **Note:** Setting the precision to `rfc3339` (`-precision rfc3339`) works with the `-execute` option, but it does not work with the `-import option`.
All other precision formats (e.g.
`h`,`m`,`s`,`ms`,`u`, and `ns`) work with the `-execute` and `-import` options.

`-pretty`  
Turns on pretty print for the `json` format.

`-ssl`  
Use https for requests.

`-username 'username'`  
The username `dsdb` uses to connect to the server.

`-version`  
Display the DSDB version and exit.

### Execute an DSDBQL command and quit with `-execute`
Execute queries that don't require a database specification:
```sh
$ dsdb -execute 'SHOW DATABASES'
name: databases
---------------
name
NOAA_water_database
_internal
telegraf
pirates
```

Execute queries that do require a database specification, and change the timestamp precision:
```sh
$ dsdb -execute 'SELECT * FROM h2o_feet LIMIT 3' -database=NOAA_water_database -precision=rfc3339
name: h2o_feet
--------------
time			               level description	    location	     water_level
2015-08-18T00:00:00Z	 below 3 feet		        santa_monica	 2.064
2015-08-18T00:00:00Z	 between 6 and 9 feet  coyote_creek  8.12
2015-08-18T00:06:00Z	 between 6 and 9 feet  coyote_creek  8.005
```

### Specify the format of the server responses with `-format`
The default format is `column`:
```sh
$ dsdb -format=column
[...]
> SHOW DATABASES
name: databases
---------------
name
NOAA_water_database
_internal
telegraf
pirates
```

Change the format to `csv`:
```sh
$ dsdb -format=csv
[...]
> SHOW DATABASES
name,name
databases,NOAA_water_database
databases,_internal
databases,telegraf
databases,pirates
```

Change the format to `json`:
```sh
$ dsdb -format=json
[...]
> SHOW DATABASES
{"results":[{"series":[{"name":"databases","columns":["name"],"values":[["NOAA_water_database"],["_internal"],["telegraf"],["pirates"]]}]}]}
```

Change the format to `json` and turn on pretty print:
```sh
$ dsdb -format=json -pretty
[...]
> SHOW DATABASES
{
    "results": [
        {
            "series": [
                {
                    "name": "databases",
                    "columns": [
                        "name"
                    ],
                    "values": [
                        [
                            "NOAA_water_database"
                        ],
                        [
                            "_internal"
                        ],
                        [
                            "telegraf"
                        ],
                        [
                            "pirates"
                        ]
                    ]
                }
            ]
        }
    ]
}
```

### Import data from a file with `-import`
The import file has two sections:

* **DDL (Data Definition Language)**: Contains the [DSDBQL commands](/dsdb/query_language/database_management.md) for creating the relevant [database](/dsdb/concepts/glossary.md) and managing the [retention policy](/dsdb/concepts/glossary.md#retention-policy-rp).
If your database and retention policy already exist, your file can skip this section.
* **DML (Data Manipulation Language)**: Lists the relevant database and (if desired) retention policy and contains the data in [line protocol](/dsdb/write_protocols/line.md).

Example:

File (`datarrr.txt`):
```
# DDL
CREATE DATABASE IF NOT EXISTS pirates
CREATE RETENTION POLICY oneday ON pirates DURATION 1d REPLICATION 1

# DML
# CONTEXT-DATABASE: pirates
# CONTEXT-RETENTION-POLICY: oneday

treasures,captain_id=dread_pirate_roberts value=801 1439856000
treasures,captain_id=flint value=29 1439856000
treasures,captain_id=sparrow value=38 1439856000
treasures,captain_id=tetra value=47 1439856000
treasures,captain_id=crunch value=109 1439858880
```

Command:
```
$dsdb -import -path=datarrr.txt -precision=s
```

Results:
```
2015/12/22 12:25:06 Processed 2 commands
2015/12/22 12:25:06 Processed 5 inserts
2015/12/22 12:25:06 Failed 0 inserts
```

> **Note:** For large datasets, `dsdb` writes out a status message every 100,000 points.
For example:
<br>
<br>
> ```
2015/08/21 14:48:01 Processed 3100000 lines.
Time elapsed: 56.740578415s.
Points per second (PPS): 54634
```

Things to note about `-import`:

* Allow the database to ingest points by using `-pps` to set the number of points per second allowed by the import.
By default, pps is zero and `dsdb` does not throttle importing.
* Imports work with `.gz` files, just include `-compressed` in the command.
* If your data file has more than 5,000 points, it may be necessary to split that file into several files in order to write your data in batches to DSDB.
By default, the HTTP request times out after five seconds.
DSDB will still attempt to write the points after that time out but there will be no confirmation that they were successfully written.

> **Note:** For how to export data from DSDB version 0.8.9, see [Exporting from 0.8.9](https://github.com/dsdb/dsdb/blob/master/importer/README.md#.

## `dsdb` Commands
Enter `help` in the CLI for a partial list of the available commands.

### Commands
The list below offers a brief discussion of each command.
We provide detailed information on `insert` at the end of this section.

`auth`  
Prompts you for your username and password.
`dsdb` uses those credentials when querying a database.

`connect <host:port>`  
Connect to a different server without exiting the shell.
By default, `dsdb` connects to `localhost:8086`.
If you do not specify either the host or the port, `dsdb` assumes the default setting for the missing attribute.

`consistency <level>`  
Sets the write consistency level: `any`, `one`, `quorum`, or `all`.

`exit`                
Quits the `dsdb` shell.

`format <format>`  
Specifies the format of the server responses: `json`, `csv`, or `column`.
See the description of [-format](/dsdb/tools/shell.md#specify-the-format-of-the-server-responses-with-format) for examples of each format.

`history`  
Displays your command history.
To use the history while in the shell, simply use the "up" arrow.
`dsdb` stores your last 1,000 commands in your home directory in `.dsdb_history`.

`insert`  
Write data using line protocol.
See [insert](/dsdb/tools/shell.md#write-data-to-dsdb-with-insert).

`precision <format>`  
Specifies the format/precision of the timestamp: `rfc3339` (`YYYY-MM-DDTHH:MM:SS.nnnnnnnnnZ`), `h` (hours), `m` (minutes), `s` (seconds), `ms` (milliseconds), `u` (microseconds), `ns` (nanoseconds).
Precision defaults to nanoseconds.

`pretty`  
Turns on pretty print for the `json` format.

`settings`  
Outputs the current settings for the shell including the `Host`, `Username`, `Database`, `Pretty` status, `Format`, and `Write Consistency`.

`use <db_name>`  
Sets the current database.
Once `dsdb` sets the current database, there is no need to specify that database in queries.
`dsdb` automatically queries the current database and its `DEFAULT` retention policy.

#### Write data to DSDB with `insert`
Enter `insert` followed by the data in [line protocol](/dsdb/write_protocols/line.md) to write data to DSDB.
Use `insert into <retention policy> <line protocol>` to write data to a specific [retention policy](/dsdb/concepts/glossary.md#retention-policy-rp).

Write data to a single field in the measurement `treasures` with the tag `captain_id = pirate_king`.
`dsdb` automatically writes the point to the database's `DEFAULT` retention policy.
```
> INSERT treasures,captain_id=pirate_king value=2
>
```

Write the same point to the already-existing retention policy `oneday`:
```
> INSERT INTO oneday treasures,captain_id=pirate_king value=2
Using retention policy oneday
>
```

Note that once you specify a retention policy with `INSERT INTO`, `dsdb` automatically writes data to that retention policy.
This occurs even for later `INSERT` entries that do not include an `INTO` clause.
Restarting the CLI will revert to using the `DEFAULT` retention policy.

### Queries
Execute all DSDBQL queries in `dsdb`.
See [Data Exploration](/dsdb/query_language/data_exploration.md), [Schema Exploration](/dsdb/query_language/schema_exploration.md), [Database Management](/dsdb/query_language/database_management.md), [Authentication and Authorization](/dsdb/administration/authentication_and_authorization.md) for DSDBQL documentation.
