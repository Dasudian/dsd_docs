# 大数点文档

该项目用于开发大数点的公告文档，所有文档使用**markdown**格式编写，按照目录结构存放在*docs*目录下。  

## 中文文档目录结构

```
.
├── en
└── zh
    ├── 00_开始
    │   ├── 00_大数点IoT平台介绍.md
    │   ├── 01_平台服务介绍.md
    │   └── 02_开发者平台介绍.md
    ├── 01_开发者平台
    │   ├── 00_注册登录.md
    │   ├── 01_应用管理.md
    │   ├── 02_API容器服务
    │   │   ├── 00_REST-API容器服务.md
    │   │   └── 01_RealTime-API容器服务.md
    │   ├── 03_数据库服务
    │   │   ├── 00_DsDoSQL服务.md
    │   │   ├── 01_MySQL服务.md
    │   │   ├── 02_PostgreSQL服务.md
    │   │   ├── 03_Cassandra服务.md
    │   │   └── 04_MongoDB服务.md
    │   ├── 04_高性能缓存服务
    │   │   ├── 00_Memcached服务.md
    │   │   └── 01_Memcached服务.md
    │   └── 05_扩展应用服务
    │       ├── 00_AAA用户管理服务.md
    │       ├── 01_IM即时消息与推送服务.md
    │       ├── 02_轻量级MQ消息队列服务.md
    │       └── 03_高性能云存储服务.md
    ├── 02_应用开发集成指南
    │   ├── 00_云端API开发
    │   │   ├── 00_REST-API开发.md
    │   │   ├── 01_RealTime-API开发.md
    │   │   ├── 02_数据库支持
    │   │   │   ├── 00_DsDoSQL.md
    │   │   │   ├── 01_MySQL.md
    │   │   │   ├── 02_PostgreSQL.md
    │   │   │   ├── 03_Cassandra.md
    │   │   │   └── 04_MongoDB.md
    │   │   └── 03_高性能缓存支持
    │   │       ├── 00_Memcached.md
    │   │       └── 01_Redis.md
    │   └── 01_客户端应用开发
    │       ├── 00_Android平台
    │       │   ├── 00_AAA用户管理.md
    │       │   ├── 01_IM即时消息与推送.md
    │       │   ├── 02_MQ消息队列.md
    │       │   └── 03_高性能云存储.md
    │       └── 01_iOS平台
    │           ├── 00_AAA用户管理.md
    │           ├── 01_IM即时消息与推送.md
    │           ├── 02_MQ消息队列.md
    │           └── 03_高性能云存储.md
    └── 03_SDK参考
        ├── 00_云端SDK
        │   ├── 00_容器API
        │   │   ├── 00_JAVA.md
        │   │   ├── 01_C-C++.md
        │   │   ├── 02_Python.md
        │   │   ├── 03_Ruby.md
        │   │   ├── 04_PHP.md
        │   │   ├── 05_JavaScript.md
        │   │   ├── 06_Go.md
        │   │   ├── 07_Perl.md
        │   │   └── 08_Erlang.md
        │   ├── 01_DsDoSQL
        │   │   ├── 00_JAVA.md
        │   │   ├── 01_C-C++.md
        │   │   ├── 02_Python.md
        │   │   ├── 03_Ruby.md
        │   │   ├── 04_PHP.md
        │   │   ├── 05_JavaScript.md
        │   │   ├── 06_Go.md
        │   │   ├── 07_Perl.md
        │   │   └── 08_Erlang.md
        │   ├── 02_MySQL
        │   │   ├── 00_JAVA.md
        │   │   ├── 01_C-C++.md
        │   │   ├── 02_Python.md
        │   │   ├── 03_Ruby.md
        │   │   ├── 04_PHP.md
        │   │   ├── 05_JavaScript.md
        │   │   ├── 06_Go.md
        │   │   ├── 07_Perl.md
        │   │   └── 08_Erlang.md
        │   ├── 03_PostgreSQL
        │   │   ├── 00_JAVA.md
        │   │   ├── 01_C-C++.md
        │   │   ├── 02_Python.md
        │   │   ├── 03_Ruby.md
        │   │   ├── 04_PHP.md
        │   │   ├── 05_JavaScript.md
        │   │   ├── 06_Go.md
        │   │   ├── 07_Perl.md
        │   │   └── 08_Erlang.md
        │   ├── 04_Cassandra
        │   │   ├── 00_JAVA.md
        │   │   ├── 01_C-C++.md
        │   │   ├── 02_Python.md
        │   │   ├── 03_Ruby.md
        │   │   ├── 04_PHP.md
        │   │   ├── 05_JavaScript.md
        │   │   ├── 06_Go.md
        │   │   ├── 07_Perl.md
        │   │   └── 08_Erlang.md
        │   ├── 05_MongoDB
        │   │   ├── 00_JAVA.md
        │   │   ├── 01_C-C++.md
        │   │   ├── 02_Python.md
        │   │   ├── 03_Ruby.md
        │   │   ├── 04_PHP.md
        │   │   ├── 05_JavaScript.md
        │   │   ├── 06_Go.md
        │   │   ├── 07_Perl.md
        │   │   └── 08_Erlang.md
        │   ├── 06_Memcached
        │   │   ├── 00_JAVA.md
        │   │   ├── 01_C-C++.md
        │   │   ├── 02_Python.md
        │   │   ├── 03_Ruby.md
        │   │   ├── 04_PHP.md
        │   │   ├── 05_JavaScript.md
        │   │   ├── 06_Go.md
        │   │   ├── 07_Perl.md
        │   │   └── 08_Erlang.md
        │   └── 07_Redis
        │       ├── 00_JAVA.md
        │       ├── 01_C-C++.md
        │       ├── 02_Python.md
        │       ├── 03_Ruby.md
        │       ├── 04_PHP.md
        │       ├── 05_JavaScript.md
        │       ├── 06_Go.md
        │       ├── 07_Perl.md
        │       └── 08_Erlang.md
        ├── 01_Android-SDK
        │   ├── 00_AAA.md
        │   ├── 01_IM.md
        │   ├── 02_MQ.md
        │   └── 03_CloudFile.md
        └── 02_iOS-SDK
            ├── 00_AAA.md
            ├── 01_IM.md
            ├── 02_MQ.md
            └── 03_CloudFile.md
```

## 编写文档流程

```
git clone https://github.com/Dasudian/dsd_docs.git
cd dsd_docs/  
git checkout -b <your branch for write the doc>
...
git commit -m "[doc] Write doc for cloud file api"
git checkout dev
git pull origin dev
git merge --no-ff <branch>
git push origin dev
```

在编辑文档可使用下面的命令在本地查看文档：
`(dsd_docs)$ ./serve `

