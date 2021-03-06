---
title: Getting Started
currentMenu: dsdb-intro-start
parent2: dsdb-intro
parent1: dsd-dsdb
---

# Getting Started

With DSDB [installed](/dsdb/introduction/installation.md), you're ready to start doing some awesome things.
In this section we'll use the `dsdb` command line interface (CLI), which is included in all
DSDB packages and is a lightweight and simple way to interact with the database.
The CLI communicates with DSDB directly by making requests to the DSDB HTTP API over port `8088` by default.

> **Note:** The database can also be used by making raw HTTP requests.
See [Writing Data](/dsdb/guides/writing_data.md) and [Querying Data](/dsdb/guides/querying_data.md)
for examples with the `curl` application.

## Creating a database

If you've installed DSDB locally, the `dsdb` command should be available via the command line.
Executing `dsdb` will start the CLI and automatically connect to the local DSDB instance
(assuming you have already started the server with `service dsdb start` or by running `dsdb` directly).
The output should look like this:

```sh
$ dsdb
Connected to http://localhost:8088 version 1.0.0
DSDB shell 1.0.0
> 
```

> **Note:** The DSDB HTTP API runs on port `8088` by default.
Therefore, `dsdb` will connect to port `8088` and `localhost` by default.
If you need to alter these defaults, run `dsdb --help`.

The command line is now ready to take input in the form of the DSDB Query Language (a.k.a DSDBQL) statements.
To exit the DSDBQL shell, type `exit` and hit return.

A fresh install of DSDB has no databases (apart from the system `_internal`),
so creating one is our first task.
You can create a database with the `CREATE DATABASE <db-name>` DSDBQL statement,
where `<db-name>` is the name of the database you wish to create.
Names of databases can contain any unicode character as long as the string is double-quoted.
Names can also be left unquoted if they contain _only_ ASCII letters,
digits, or underscores and do not begin with a digit.

Throughout this guide, we'll use the database name `mydb`:

```sql
> CREATE DATABASE mydb
> 
```

> **Note:** After hitting enter, a new prompt appears and nothing else is displayed.
In the CLI, this means the statement was executed and there were no errors to display.
There will always be an error displayed if something went wrong.
No news is good news!

Now that the `mydb` database is created, we'll use the `SHOW DATABASES` statement
to display all existing databases:

```sql
> SHOW DATABASES
name: databases
---------------
name
_internal
mydb

> 
```

> **Note:** The `_internal` database is created and used by DSDB to store internal runtime metrics.
Check it out later to get an interesting look at how DSDB is performing under the hood.

Unlike `SHOW DATABASES`, most DSDBQL statements must operate against a specific database.
You may explicitly name the database with each query,
but the CLI provides a convenience statement, `USE <db-name>`,
which will automatically set the database for all future requests. For example:

```sql
> USE mydb
Using database mydb
> 
```

Now future commands will only be run against the `mydb` database.

## Writing and exploring data

Now that we have a database, DSDB is ready to accept queries and writes.

First, a short primer on the datastore.
Data in DSDB is organized by "time series",
which contain a measured value, like "cpu_load" or "temperature".
Time series have zero to many `points`, one for each discrete sample of the metric.
Points consist of `time` (a timestamp), a `measurement` ("cpu_load", for example),
at least one key-value `field` (the measured value itself, e.g.
"value=0.64", or "temperature=21.2"), and zero to many key-value `tags` containing any metadata about the value (e.g.
"host=server01", "region=EMEA", "dc=Frankfurt").

Conceptually you can think of a `measurement` as an SQL table,
where the primary index is always time.
`tags` and `fields` are effectively columns in the table.
`tags` are indexed, and `fields` are not.
The difference is that, with DSDB, you can have millions of measurements,
you don't have to define schemas up-front, and null values aren't stored.

Points are written to DSDB using the Line Protocol, which follows the following format:

```
<measurement>[,<tag-key>=<tag-value>...] <field-key>=<field-value>[,<field2-key>=<field2-value>...] [unix-nano-timestamp]
```

The following lines are all examples of points that can be written to DSDB:

```
cpu,host=serverA,region=us_west value=0.64
payment,device=mobile,product=Notepad,method=credit billed=33,licenses=3i 1434067467100293230
stock,symbol=AAPL bid=127.46,ask=127.48
temperature,machine=unit42,type=assembly external=25,internal=37 1434067467000000000
```

> **Note:** More information on the line protocol can be found on the [Write Syntax](/dsdb/v1.0/write_protocols/write_syntax/) page.

To insert a single time-series datapoint into DSDB using the CLI, enter `INSERT` followed by a point:

```sql
> INSERT cpu,host=serverA,region=us_west value=0.64
>
```

A point with the measurement name of `cpu` and tag `host` has now been written to the database, with the measured `value` of `0.64`.

Now we will query for the data we just wrote:

```sql
> SELECT host, region, value FROM cpu
name: cpu
---------
time		    	                     host     	region   value
2015-10-21T19:28:07.580664347Z  	serverA	  us_west	0.64

> 
```

> **Note:** We did not supply a timestamp when writing our point.
When no timestamp is supplied for a point, DSDB assigns the local current timestamp when the point is ingested.
That means your timestamp will be different.

Let's try storing another type of data, with two fields in the same measurement:

```sql
> INSERT temperature,machine=unit42,type=assembly external=25,internal=37
>
```

To return all fields and tags with a query, you can use the `*` operator:

```sql
> SELECT * FROM temperature
name: temperature
-----------------
time		                        	 external	  internal	machine	type
2015-10-21T19:28:08.385013942Z  25	        	37     		unit42  assembly

> 
```

DSDBQL has many [features and keywords](/dsdb/query_language/spec.md) that are not covered here,
including support for Go-style regex. For example:

```sql
> SELECT * FROM /.*/ LIMIT 1
--
> SELECT * FROM cpu_load_short
--
> SELECT * FROM cpu_load_short WHERE value > 0.9
```

This is all you need to know to write data into DSDB and query it back.
To learn more about the DSDB write protocol,
check out the guide on [Writing Data](/dsdb/guides/writing_data.md).
To futher explore the query language,
check out the guide on [Querying Data](/dsdb/guides/querying_data.md).
For more information on DSDB concepts, check out the [Key Concepts](/dsdb/concepts/key_concepts.md) page.
