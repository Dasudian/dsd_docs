---
title: Installation
currentMenu: dsdb-intro-installation
parent2: dsdb-intro
parent1: dsd-dsdb
---

## Installation

This page provides directions for installing, starting, and configuring DSDB.

### Requirements

Installation of the DSDB package may require `root` or administrator privileges in order to complete successfully.

#### Networking

By default, DSDB uses the following network ports:

- TCP port `8083` is used for DSDB's [Admin panel](/dsdb/tools/web_admin.md)
- TCP port `8088` is used for client-server communication over DSDB's HTTP API
- TCP ports `8088` and `8091` are required for clustered DSDB instances

> Note: In addition to the ports above,
DSDB also offers multiple plugins that may require custom ports.
All port mappings can be modified through the [configuration file](/dsdb/administration/config.md),
which is located at `/etc/dsdb/dsdb.conf` for default installations.

### Installation

#### Ubuntu & Debian
Debian and Ubuntu users can install the latest stable version of DSDB using the `apt-get` package manager.
For Ubuntu users, you can add the DSDBData repository by using the following commands:

```shell
curl -sL https://repos.dasudian.com/dsdb.key | sudo apt-key add -
source /etc/lsb-release
echo "deb https://repos.dasudian.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/dsdb.list
```

For Debian users, you can add the DSDBData repository by using the following commands:

```shell
curl -sL https://repos.dasudian.com/dsdb.key | sudo apt-key add -
source /etc/os-release
test $VERSION_ID = "7" && echo "deb https://repos.dasudian.com/debian wheezy stable" | sudo tee /etc/apt/sources.list.d/dsdb.list
test $VERSION_ID = "8" && echo "deb https://repos.dasudian.com/debian jessie stable" | sudo tee /etc/apt/sources.list.d/dsdb.list
```

And then to install and start the DSDB service:

```shell
sudo apt-get update && sudo apt-get install dsdb
sudo service dsdb start
```

#### RedHat & CentOS
RedHat and CentOS users can install the latest stable version of DSDB using the `yum` package manager:

```shell
cat <<EOF | sudo tee /etc/yum.repos.d/dsdb.repo
[dsdb]
name = DSDB Repository - RHEL \$releasever
baseurl = https://repos.dasudian.com/rhel/\$releasever/\$basearch/stable
enabled = 1
gpgcheck = 1
gpgkey = https://repos.dasudian.com/dsdb.key
EOF
```

Once repository is added to the `yum` configuration,
you can install and start the DSDB service by running:

```shell
sudo yum install dsdb
sudo service dsdb start
```

#### SLES & openSUSE
There are RPM packages provided by openSUSE Build Service for SUSE Linux users:

```shell
## add go repository
zypper ar -f obs://devel:languages:go/ go
## install latest dsdb
zypper in dsdb
```

#### FreeBSD/PC-BSD

DSDB is part of the FreeBSD package system.
It can be installed by running:

```shell
sudo pkg install dsdb
```

The configuration file is located at `/usr/local/etc/influxd.conf` with examples in `/usr/local/etc/influxd.conf.sample`.

Start the backend by executing:

```shell
sudo service influxd onestart
```

To have DSDB start at system boot, add `influxd_enable="YES"` to `/etc/rc.conf`.

#### Mac OS X

Users of OS X 10.8 and higher can install DSDB using the [Homebrew](http://brew.sh/) package manager.
Once `brew` is installed, you can install DSDB by running:

```shell
brew update
brew install dsdb
```

To have `launchd` start DSDB at login, run:

```shell
ln -sfv /usr/local/opt/dsdb/*.plist ~/Library/LaunchAgents
```

And then to start DSDB now, run:

```shell
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.dsdb.plist
```

Or, if you don't want/need launchctl, in a separate terminal window you can just run:

```shell
influxd -config /usr/local/etc/dsdb.conf
```

### Hosted

For users who don't want to install any software and are ready to use DSDB, you may want to check out our [managed hosted DSDB offering](http://customers.dasudian.com).

<a href="/dsdb/introduction/getting_started.html"><font size="6"><b>⇒ Now get started!</b></font></a>

### Configuration

For non-packaged installations, it is a best practice to generate a new configuration
for each upgrade to ensure you have the latest features and settings.
Any changes made in the old file will need to be manually ported to the newly generated file.
Packaged installations will come with a configuration pre-installed,
so this step may not be needed if you installed DSDB using a
package manager (though it is handy to know either way).

> Note: Newly generated configuration files have no knowledge of any local customizations or settings.
Please make sure to double-check any configuration changes prior to deploying them.

To generate a new configuration file, run:

```shell
influxd config > dsdb.generated.conf
```

And then edit the `dsdb.generated.conf` file to have the desired configuration settings.
When launching DSDB, point the process to the correct configuration file using the `-config` option. For example, use:

```shell
influxd -config dsdb.generated.conf
```

To launch DSDB with your newly generated configuration. In addition, a valid configuration file can be displayed at any time using the command `influxd config`.

If no `-config` option is supplied, DSDB will use an internal default configuration (equivalent to the output of `influxd config`).

> Note: The `influxd` command has two similarly named flags.
The `config` flag prints a generated default configuration file to STDOUT but does not launch the `influxd` process.
The `-config` flag takes a single argument, which is the path to the DSDB configuration file to use when launching the process.

The `config` and `-config` flags can be combined to output the union of the internal default configuration and the configuration file passed to `-config`.
The options specified in the configuration file will overwrite any internally generated configuration.

```shell
influxd config -config /etc/dsdb/dsdb.partial.conf
```

The output will show every option configured in the `dsdb.partial.conf` file and will substitute internal defaults for any configuration options not specified in that file.

The example configuration file shipped with the installer is for information only.
It is an identical file to the internally generated configuration except that the example file has comments.

### Hosting on AWS

#### Hardware

We recommend using two SSD volumes.
One for the `dsdb/wal` and one for the `dsdb/data`.
Depending on your load each volume should have around 1k-3k provisioned IOPS.
The `dsdb/data` volume should have more disk space with lower IOPS and the `dsdb/wal` volume should have less disk space with higher IOPS.

Each machine should have a minimum of 8G RAM.

We’ve seen the best performance with the C3 class of machines.

#### Configuring the Instance

This example assumes that you are using two SSD volumes and that you have mounted them appropriately.
This example also assumes that each of those volumes is mounted at `/mnt/influx` and `/mnt/db`.
For more information on how to do that see the Amazon documentation on how to [Add a Volume to Your Instance](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-add-volume-to-instance.html).

#### Config File
You'll have to update the config file appropriately for each DSDB instance you have.

```
...

[meta]
  dir = "/mnt/db/meta"
  ...

...

[data]
  dir = "/mnt/db/data"
  ...
wal-dir = "/mnt/influx/wal"
  ...

...

[hinted-handoff]
    ...
dir = "/mnt/db/hh"
    ...
```

#### Permissions

When using non-standard directories for DSDB data and configurations, also be sure to set filesystem permissions correctly:

```shell
chown dsdb:dsdb /mnt/influx
chown dsdb:dsdb /mnt/db
```

#### Other Considerations

If you're planning on using a cluster, you may also want to set `-join` flags for the `INFLUXD_OPTS` variable in `/etc/default/dsdb`.
For example:

```
INFLUXD_OPTS='[-join hostname_1:port_1[,hostname_2:port_2]]'
```

For more detailed instructions on how to set up a cluster, please see the [Clustering](/dsdb/guides/clustering.md) section.

### Nightly and Development Versions

Nightly packages are available for Linux through the DSDBData package repository by using the `nightly` channel.
Other package options can be found on the [downloads page](https://dasudian.com/downloads/)
