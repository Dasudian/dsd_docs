---
title: API Endpoints & Ports
currentMenu: dsdb-concepts-api-endpoints
---

# API Endpoints & Ports

## Endpoints

All current API Endpoints are listed below.

### /ping

The ping endpoint accepts both `GET` and `HEAD` HTTP requests.
The response body is empty.
The version of the DSDB server you issued the request to can be extracted through the `X-DSDB-Version` field of the header.
For example this is the response from a server running `1.0.0-nightly-548b898` of DSDB:

```sh
$ curl -sl -I localhost:8088/ping

HTTP/1.1 204 No Content
Request-Id: 58aedfb1-53e5-14e5-a7f5-000000000000
X-DSDB-Version: 1.0.0-nightly-5a8b19b
Date: Wed, 21 Oct 2015 16:29:02 GMT
```

In DSDB versions 1.0.0+ the `/ping` endpoint can also accept an optional query param, `wait_for_leader=Ns` where `N` is the number of seconds to wait before returning a response.
This will check with the leader of the [cluster](/dsdb/v1.0/concepts/glossary/#cluster) to ensure that the leader is available and ready.
One second is a good default, but for highly distributed clusters, or clusters under significant load, it may lead to false negatives.
Increasing the timeout gives the raft leader longer to respond.
The request will return `204` if successful and `503` in the case of a timeout.

```sh
$ curl -sl -I localhost:8088/ping?wait_for_leader=1s

HTTP/1.1 204 No Content
Request-Id: 58aedfb1-53e5-14e5-a7f5-000000000000
X-DSDB-Version: 1.0.0-nightly-5a8b19b
Date: Wed, 21 Oct 2015 16:29:35 GMT
```

### /query
For more information on the `/query` endpoint see the [Querying Data](/dsdb/v1.0/guides/querying_data/) section of our docs.

### /write
For more information on the `/write` endpoint see the [Writing Data](/dsdb/v1.0/guides/writing_data/) section of our docs.

## Ports

### HTTP API PORT

By default the DSDB HTTP API listens on port `8088`.
The `/ping`, `/write`, and `/query` endpoints are all part of the HTTP API.

### Internal Communication port

By default, the communication between clustered instances of DSDB occurs over ports `8088` and `8091`.

### Admin interface port

The admin interface for DSDB runs on port `8084` and exposes web UI for the server.

### Secondary Ports

DSDB also supports communication through UDP, Graphite, Collectd, and OpenTSDB.
By default DSDB makes port `2003` available for Graphite.
No default ports are assigned for UDP, Collectd, or OpenTSDB.
