[![Build Status](https://travis-ci.org/Dasudian/dsd_docs.svg?branch-master)](https://travis-ci.org/Dasudian/dsd_docs)  [![Build Status](https://travis-ci.org/Dasudian/dsd_docs.svg?branch-dev)](https://travis-ci.org/Dasudian/dsd_docs)  


# 大数点文档

该项目用于开发大数点的公告文档，所有文档使用**markdown**格式编写，按照相应文档目录结构存放。  

## 文档目录结构

```
integration-dev/ （服务集成指南）
├── im （IM即时消息服务）
│   ├── integrate-im-android.md （Android上集成IM服务）
│   └── integrate-im-ios.md （iOS上集成IM服务）
└── index.md

dsdb/ （Dasudian Database)
├── index.md
├── administration
│   ├── index.md
│   ├── authentication_and_authorization.md
│   ├── backup_and_restore.md
│   ├── config.md
│   ├── logs.md
│   ├── statistics.md
│   └── upgrading.md
├── clients
│   ├── index.md
│   └── api.md
├── concepts
│   ├── index.md
│   ├── api.md
│   ├── crosswalk.md
│   ├── glossary.md
│   ├── how_dsdb_works.md
│   ├── insights_tradeoffs.md
│   ├── key_concepts.md
│   ├── schema_and_data_layout.md
│   └── storage_engine.md
├── data_sources
│   ├── carbon.md
│   ├── collectd.md
│   ├── diamond.md
│   └── opentsdb.md
├── guides
│   ├── clustering.md
│   ├── downsampling_and_retention.md
│   ├── hardware_sizing.md
│   ├── querying_data.md
│   └── writing_data.md
├── introduction
│   ├── index.md
│   ├── getting_started.md
│   └── installation.md
├── query_language
│   ├── index.md
│   ├── continuous_queries.md
│   ├── database_management.md
│   ├── data_exploration.md
│   ├── functions.md
│   ├── math_operators.md
│   ├── schema_exploration.md
│   └── spec.md
├── sample_data
│   └── data_download.md
├── tools
│   ├── index.md
│   ├── chronograf.md
│   ├── grafana.md
│   ├── kapacitor.md
│   ├── shell.md
│   ├── telegraf.md
│   └── web_admin.md
├── troubleshooting
│   ├── index.md
│   ├── frequently_encountered_issues.md
│   └── system_monitoring.md
└── write_protocols
    ├── index.md
    ├── collectd.md
    ├── graphite.md
    ├── json.md
    ├── line.md
    ├── opentsdb.md
    ├── udp.md
    └── write_syntax.md

dac/ （Dasudian API Container）
├── index.md
├── dac_cloud_api_cpp.md
├── dac_cloud_api_java.md
└── dac_cloud_api_c.md

data-hub/ （Dasudian Data Hub）
├── index.md
└── sdk
    ├── embeded_c.md
    └── javascript.md
```

## 编写文档流程

```bash
git clone https://github.com/Dasudian/dsd_docs.git
cd dsd_docs/  
git checkout -b <your branch for write the doc>
... （Update the exist markdown files or add new markdown files)
git commit -m "[doc] Write doc for cloud file api"
git checkout dev
git pull origin dev
git merge --no-ff <branch>
git push origin dev
```

## 设置编译和部署环境

要在本地编译和查看文档，需要PHP环境。

### 安装PHP环境

`$sudo apt-get install php`

安装composer:  

```bash
$php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
$php composer-setup.php --install-dir=/home/<your_home>/bin --filename=composer
$php -r "unlink('composer-setup.php');"
```

### 编译

进入本地源码，如：  
`$cd ~/git/dsd_docs`  

执行安装依赖：  
`$composer install`  

生成静态文件：  
`$vendor/bin/couscous generate`

所有的静态文件将会编译到 *.couscous/generated/* 。  

可以运行：  
`$vendor/bin/couscous preview`

然后浏览器访问 [http://localhost:8000] 查看。
