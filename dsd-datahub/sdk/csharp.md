---
title: DataHub-CSharp
currentMenu: datahub-sdk-csharp
parent2: datahub-sdk
parent1: dsd-datahub
---

# DataHub C# SDK

## 获取sdk
在[大数点官网](www.dasudian.com)注册开发者账号，或者联系大数点客服人员获取sdk、appId、appSec等。

## 集成sdk
dsd_mc.dll是大数点公司开发的MES sdk，应用开发者调用它轻松连接大数点MES云平台。
dsd_mc.dll中只有一个DSDMC的类，该类是一个单例类，开发者调用该类实现数据上传功能。

### 初始化

使用下面的方法获取单例对象
```
public static DSDMC getInstance()
```

### 初始化sdk

```
/**
 * @param servers 服务器地址，null表示使用大数点公有云服务，你也可以指定一个私有云地址。
 * @param appId 数点平台申请的应用ID。在大数点官网注册开发者账号，或者联系大数点客服人员获取。
 * @param appSec 数点平台申请的应用秘钥。在大数点官网注册开发者账号，或者联系大数点客服人员获取。
 * @return 成功返回0，失败非0
 */
public int init(List<String> servers, String appId, String appSec)
```

### 连接服务器

```
/**
 * @return 成功返回0，失败返回非0
 */
public int connect()
```

### 向服务器发送数据

```
/**
 * 向服务器发送消息
 * @param destination: 发送相对路径，类似于webservice里的url相对路径
 * @param content: 发送内容，必须是json格式
 * @param blockTime: 调用该方法的阻塞时间， 单位为毫秒， 等于0， 表示不阻塞，立即返回；大于0：阻塞时间；小于0：永久阻塞直到收到服务器的返回消息
 * @param result: 服务器返回消息，当blockTime为0，其为null
 * @return 成功返回0，失败非0
 */
public int write(String destination, String content, int blockTime , out String result)
```

### 与服务器断开连接

```
public int disconnect()
```