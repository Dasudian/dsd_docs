---
title: Web Admin Interface
currentMenu: dsdb-tools-webadmin
parent2: dsdb-tools
parent1: dsd-dsdb
---

# Web Admin Interface

The built-in web administration GUI is a simple way to interact with DSDB.
For any significant use, whether writing or querying data, direct use of the HTTP API ([reading](/dsdb/guides/querying_data.md), [writing](/dsdb/guides/writing_data.md)) or the [command line interface](/dsdb/tools/shell.md) are better options.

## Accessing the UI

The Admin UI is available by default at port 8083, i.e. [http://localhost:8083](http://localhost:8083).
You can control the port in the DSDB config file using the `port` option in the `[admin]` section.

You can also access remote DSDB instances, although you may only connect to one instance at a time.
To access an instance at a location other than than http://localhost:8083, click the Settings icon in the upper right and enter the proper connection settings for the target DSDB instance.

### HTTP vs HTTPS

The Admin UI uses HTTP by default but can be configured to use HTTPS.
In the DSDB config file, find the `[admin]` section and set `https-enabled = true`.

> **Note:** If HTTPS is enabled, you must explicitly connect to the instance using `https://`, there is no redirect from `http` to `https`.

### Selecting the Database

Choose your target database for writes and queries from the "Databases" pull-down menu in the upper right.
If you have recently created a database you will need to refresh the Admin UI page before it appears in the pull-down menu.

## Writing Data

The Admin UI has a "Write Data" link in the top menu bar.
This link pops up a modal dialog that will accept points in the [line protocol](/dsdb/write_protocols/line.md) format.

## Querying Data

The Admin UI has a "Query" box where you can enter any valid [DSDBQL](/dsdb/query_language/spec.md) command, including database administration and schema exploration commands.
The "Query Templates" pull-down menu will pre-populate the Query box with a number of common DSDBQL queries.
