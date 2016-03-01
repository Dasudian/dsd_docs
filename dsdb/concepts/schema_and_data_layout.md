---
title: Schema Design
currentMenu: dsdb-concepts-schema-data-layout
---

# Scheam Design

Every DSDB use case is special and your [schema](/dsdb/v1.0/concepts/glossary/#schema) will reflect that uniqueness.
There are, however, general guidelines to follow and pitfalls to avoid when designing your schema.

## Encouraged Schema Design

In no particular order, we recommend that you:

* *Encode meta data in tags*

    [Tags](/dsdb/v1.0/concepts/glossary/#tag) are indexed and [fields](/dsdb/v1.0/concepts/glossary/#field) are not indexed.
    This means that queries on tags are more performant than those on fields.

    In general, your queries should guide what gets stored as a tag and what gets stored as a field:
      * Store data in tags if they're commonly-queried meta data
      * Store data in tags if you plan to use them with `GROUP BY()`
      * Store data in fields if you plan to use them with an [InfluxQL function](/dsdb/v1.0/query_language/functions/)
      * Store data in fields if you *need* them to be something other than a string - [tag values](/dsdb/v1.0/concepts/glossary/#tag-value) are always interpreted as strings

* *Avoid using InfluxQL Keywords as identifier names*

    This isn't necessary, but it simplifies writing queries; you won't have to wrap those identifiers in double quotes.
    Identifiers are are database names, [retention policy](/dsdb/v1.0/concepts/glossary/#retention-policy-rp) names, [user](/dsdb/v1.0/concepts/glossary/#user) names, [measurement](/dsdb/v1.0/concepts/glossary/#measurement) names, [tag keys](/dsdb/v1.0/concepts/glossary/#tag-key), and [field keys](/dsdb/v1.0/concepts/glossary/#field-key).
    See [InfluxQL Keywords](https://github.com/dasudian/dsdb/blob/master/dsdbql/INFLUXQL.md#keywords) for words to avoid.

    Note that you will also need to wrap identifiers in double quotes in queries if they contain characters other than `[A-z,_]`.

## Discouraged Schema Design

In no particular order, we recommend that you:

* *Don't have too many series*

    See [Hardware Sizing Guidelines](/dsdb/v1.0/guides/hardware_sizing/#general-hardware-guidelines-for-a-single-node) for [series cardinality](/dsdb/v1.0/concepts/glossary/#series-cardinality) recommendations based on your hardware.

    [Tags](/dsdb/v1.0/concepts/glossary/#tag) that specify highly variable information like UUIDs, hashes, and random strings can increase your series cardinality to uncomfortable levels.
    If you need that information in your database, consider storing the high-cardinality data as a field rather than a tag (note that query performance will be slower).

* *Don't differentiate data with measurement names*

    In general, taking this step will simplify your queries.
    DSDB queries merge data that fall within the same [measurement](/dsdb/v1.0/concepts/glossary/#measurement); it's better to differentiate data with [tags](/dsdb/v1.0/concepts/glossary/#tag) than with detailed measurement names.

    Example:

| Schema 1                                             | Schema 2                                                                 |
|:-----------------------------------------------------|:-------------------------------------------------------------------------|
| *Measurement:* `blueberries.field-1.region-north`    | *Measurement:* `blueberries`; *Tags:* `field = 1` and `region = north`   |
| *Measurement:*  `blueberries.field-2.region-midwest` | *Measurement:* `blueberries`; *Tags:* `field = 2` and `region = midwest` |

    Assume that each measurement contains a single field key called `value`.
    The following queries calculate the average of `value` across all fields and all regions.
    Notice that, even at this small scale, this is harder to do under Schema 1.

    *Schema 1*
    ```
    > SELECT mean(value) FROM /^blueberries/
    name: blueberries.field-1.region-north
    --------------------------------------
    time			        mean
    1970-01-01T00:00:00Z	444

    name: blueberries.field-2.region-midwest
    ----------------------------------------
    time			        mean
    1970-01-01T00:00:00Z	33766.666666666664
    ```
    Then calculate the mean yourself.


    *Schema 2*
    ```
    > SELECT mean(value) FROM blueberries
    name: blueberries
    -----------------
    time			        mean
    1970-01-01T00:00:00Z	17105.333333333332
    ```

* *Don't put more than one piece of information in one tag*

    Similar to the point above, taking this step will simplify your queries.
    It will reduce your need for regular expressions.

    Example:

| Tagset 1                            | Tagset 2                         |
|:------------------------------------|:---------------------------------|
| `location = field-1.region-north`   | `field = 1` and `region = north` |
| `location = field-2.region-north`   | `field = 2` and `region = north` |
| `location = field-2.region-midwest` | `field = 2` and `region = north` |

    Assume that each [tag set](/dsdb/v1.0/concepts/glossary/#tag-set) falls in the [measurement](/dsdb/v1.0/concepts/glossary/#measurement) `blueberries` and is associated with a [field](/dsdb/v1.0/concepts/glossary/#field) called `value`.
    The following queries calculate the average of `value` for blueberries that fall in the `north`.
    While both queries are relatively simple, you can imagine that the regex could get much more complicated if Schema 1 contained a more complex tag value.

    *Schema 1*
    ```
    > SELECT mean(value) FROM blueberries WHERE location =~ /north/
    ```

    *Schema 2*
    ```
    > SELECT mean(value) FROM blueberries WHERE region = 'north'
    ```


* *Don't use the same name for a field key and tag key*

    You won't be able to query the [tag key](/dsdb/v1.0/concepts/glossary/#tag-key) if the tag key is the same as a [field key](/dsdb/v1.0/concepts/glossary/#field-key) in your schema.
    Be sure to differentiate your tag keys and field keys.

    <dt>
    See GitHub Issue [#4630](https://github.com/dasudian/dsdb/issues/4630) for more information.
    </dt>
