# iOS上集成AAA服务

## 集成前准备
到[大数点开发者平台](https://dev.dasudian.com/)注册成为大数点合作伙伴并创建应用

## 下载SDK
到[大数点官网](https://dev.dasudian.com/sdk/)下载SDK.

## SDK内容

- lib（需要的库）
- header (需要的头文件)

## 配置工程
将以上文件夹中的文件导入到工程目录下即可使用.

## 使用SDK

### 参数说明

```
enum callBackReason{
sendMsgSuccess = 1,//发送消息成功
msgUnicast,//收到单播消息
msgMulticast,//收到组播消息
msgBroadcast,//收到广播消息
connectSuccess,//连接成功
kickedOutGroup,//踢人的回调
disConnect,//断开连接
loginOnAnotherClient//账号在另外一台设备上登录
};


/**  统一参数说明：
*   reason:回调的原因，callBackReason。
*   data:回调函数返回的内容。
*   len:回调内容的长度。
*   
*/


```


### 初始化

```
/**
* 初始化sdk,退出时需要调用dsdDisConnect()来销毁分配得内存.
* @param  serverAddress	服务器地址
* @param  version      "1.0"
* @param  appId        app的id
* @param  appSpec      app得描述信息
* @param  userId       用户名
* @param  opt          用户可选信息，用于后台统计和推送；
*                      必须为JSON，格式如下
*                      {"ctype":"0|1"，....}其中0代表Android，1代表iOS
* @param  clientID     设备id
* @param  userFunction 注册进sdk得回调函数,该函数会在下面几种情况被调用.
*                      1:用户发送得异步消息成功
*                      2:收到服务器发来的单播,组播,广播消息
*                      3:连接服务器成功
*                      4:该用户被提出某个组播组
*                      5:与服务器断开连接
* @return              成功:0,失败:-1
*/
int dsdInit(char* serverAddress,char* version, char * appId ,char *appSpec ,char *userId, char *opt, char* clientID, userCallback userFunction);

```






### 同步单播

```
/**
* 同步单播消息.该函数会阻塞到收到服务器得ack或者超时后返回.
* @param  from       发送消息得人
* @param  toUserlist 目标用户列表
* @param  users      目标用户个数
* @param  msg        消息内容
* @return            成功:0,失败:-1
*/
int dsdSyncSendWithAck(char* from, char** toUserlist, int users, char *msg);
```




### 异步单播

```
/**
* 异步发送单播消息,该函数不会阻塞调用者.
* @param from       发送者
* @param toUserlist 目标用户列表
* @param users      目标用户个数
* @param msg        消息内容
* @param msgid      用户指定得msgid,如果发送成功,该msgid会在回调函数中上报.
*/
void dsdAsyncSendWithAck(char *from, char **toUserlist, int users, char* msg, char *msgid);

```


### 同步组播

```
/**
* 同步得发送组播消息,该函数会阻塞到收到服务器得ack或者超时后返回.
* @param  user    发送者
* @param  groupid 组id
* @param  msg     消息内容
* @return         成功:0,失败:-1
*/
int dsdSyncMulticastwithAck(char* user, char* groupid, char* msg);

```



### 异步组播

```
/**
* 异步得发送组播消息,该函数不会阻塞调用者.
* @param user    发送者
* @param groupid 组id
* @param msg     消息内容
* @param msgid   用户指定得msgid,如果发送成功,该msgid会在回调函数中上报.
*/
void dsdAsyncMulticastwithAck(char* user, char* groupid, char* msg, char* msgid);

```


### 同步广播

```
/**
* 同步得发送广播消息,该函数会阻塞到收到服务器得ack或者超时后返回.
* @param  user 发送者
* @param  msg  消息内容
* @return      成功:0,失败:-1
*/
int dsdSyncBroadcastWithAck(char* user, char* msg);

```


### 异步广播

```
/**
* 异步得发送广播消息,该函数不会阻塞调用者.
* @param user  发送者
* @param msg   消息内容
* @param msgid 用户指定得msgid,如果发送成功,该msgid会在回调函数中上报.
*/
void dsdAsyncBroadcastWithAck(char* user, char* msg, char* msgid);

```


### 创建组

```
/**
* 创建组播组,该函数会阻塞到收到服务器得ack或者超时后返回.
* @param  user      用户名
* @param  groupName 组名
* @return           成功:返回组播组得id,失败:NULL
*/
DSD_UUID dsdCreateGroup(char *user, char *groupName);

```


### 加入组
```
/**
* 加入组播组,该函数会阻塞到收到服务器得ack或者超时后返回.
* @param  user    用户名
* @param  groupid dsdCreateGroup函数返回得组播组id
* @return         成功:0,失败-1
*/
int dsdJoinGroup(char *user , DSD_UUID groupid);

```


### 离开组

```
/**
* 离开组播组,该函数会阻塞到收到服务器得ack或者超时后返回.
* @param  user    离开得用户
* @param  groupid dsdCreateGroup函数返回得组播组id
* @return         成功:0,失败:-1
*/
int dsdLeaveGroup(char *user, DSD_UUID groupid);

```


### 踢出组

```
/**
* 将某人踢出组播组,该函数会阻塞到收到服务器得ack或者超时后返回.
* @param  user        组播组拥有者
* @param  groupid     dsdCreateGroup函数返回得组播组id
* @param  groupmember 要踢出得人
* @return             成功:0,失败-1
*/
int dsdKickOutGroup(char* user, DSD_UUID groupid, char* groupmember);

```

### 释放资源

```
/**
* 与dsdInit()配合使用,该函数用于清楚sdk分配得内存.
*/
void dsdDisConnect(void);

```

