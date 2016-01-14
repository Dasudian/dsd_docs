# 大数点文档

该项目用于开发大数点的公告文档，所有文档使用**markdown**格式编写，按照目录结构存放在*docs*目录下。  

## 文档目录结构

```
docs/
├── get-started　（开始）
│   ├── intro-dsd.md　（大数点介绍）
│   └── intro-serv.md　（开发者服务介绍）
├── dev-platform　（开发者平台操作指南）
│   └── register-login.md　（注册和登陆）
└── integration-dev　（服务集成指南）
    ├── integrate-im-android.md　（Android上集成IM功能）
    └── integrate-im-ios.md　（iOS上集成IM功能）
```

## 编写文档流程

```bash
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
