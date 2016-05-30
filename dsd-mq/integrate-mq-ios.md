## 集成前准备
到[大数点开发者平台](https://dev.dasudian.com/)注册成为大数点合作伙伴并创建应用

## 下载SDK
到[大数点官网](https://dev.dasudian.com/sdk/client)下载MQTT SDK.

## SDK内容

- libdadmqttlib.a

## 配置工程

### 导入静态文件

## 使用SDK

首先在工程中需要用到的文件中导入DSDMqttClient.h文件
同时SDK支持断线自动重连功能。
-  概绪
统一参数说明：

event:此参数会出现在回调方法里面，共有9个值，代表不同的回调事件被触发。
0:重连成功
1:连接断开
2:订阅成功 
3:订阅失败 
4:取消订阅成功
5:取消订阅失败 
6:发布成功 
7:发布失败 
8:收到别人发布的消息

qos:此参数出现在订阅消息和发布主题的方法里面，总共有3个值，代表不同级别的服务质量。
0：“最多一次”，尽操作环境所能提供的最大努力分发消息，消息可能会丢失。例如，这个等级可用于环境传感器数据，单次的数据丢失没关系，因为不久之后会再次发送。
1：“至少一次”，保证消息可以到达，但是可能会重复。
2：“仅一次”，保证消息只到达一次，例如，这个等级可用在一个计费系统中，这里如果消息重复或丢失会导致不正确的收费。


userinfo:用户用于统计信息的参数，出现在初始化方法里面，需要注意的是参数可以为空也就是nil，但是如果参数不为空的话那就必须传有效的json字符串key-vlaue键值对形式，例如：{“age”:"*","area":"*".....}.

同理当你订阅的时候选择服务质量也会产生相应的效果，只不过是收到消息，而发布的时候是发布消息。



###SDK方法说明
```
/**
*  初始化SDK的方法
*
*  @param ocversion      SDK版本号
*  @param ocappid        appid,开发者在大数点注册app后得到的appid
*  @param ocappkey       appkey，开发者在大数点注册app后得到的appkey
*  @param ocuserid       用户的id
*  @param ocuserinfo     用户需要统计的信息，如果为nil则表示不需要统计，如果需要统计则必须是一个合法的json字符串
*  @param occlientid     设备的唯一标识符。
*  @param ocsereraddress 服务器地址，如果为nil，则默认为大数点的公有云服务器地址
*
*  @return 返回当前初始化方法返回值，如果不成功则为nil，成功则返回当前对象的实例
*/
- (id)initWith:(NSString *)ocversion
appID:(NSString *)ocappid
appKey:(NSString *)ocappkey
userID:(NSString *)ocuserid
userinfo:(NSString *)ocuserinfo
clientID:(NSString *)occlientid
serverAddress:(NSString *)ocsereraddress;

```

```
//  订阅
/**
*  订阅消息的方法
*
*  @param topic 订阅消息的主题
*  @param qos   选择订阅的服务质量
*
*  @return 成功返回0，失败返回-1
*/

- (NSInteger)dsdMqttSubscrlbe:(NSString *)topic
qos:(NSInteger)qos;

```
```
// 取消订阅
/**
*  取消订阅的方法
*
*  @param topic 取消订阅的主题
*
*  @return 成功取消订阅返回0，失败返回-1
*/
- (NSInteger)dsdMqttUnsubscrlbe:(NSString *)topic;

```

```
// 发布主题
/**
*  发布主题的方法
*
*  @param topicName  发布消息的主题名字
*  @param content    发布消息的内容
*  @param contentLen 发布消息的内容的长度
*  @param qos        发布消息的时候选择的服务质量
*  @param retained   发布消息的时候选择服务器是否保留发布的消息
*
*  @return 成功发布消息返回0，失败返回-1
*/
- (NSInteger)dsdMqttPublish:(NSString *)topicName
content:(NSString *)content
contentLen:(NSInteger)contentLen
qos:(NSInteger)qos
retained:(NSInteger)retained;

```


```
//与服务器断开连接
/**
*  断开连接的方法
*
*  @return 断开连接成功发挥0，失败返回-1
*/
- (NSInteger)dsdMqttDisconnect;

```

###SDK中的回调方法
```
/**
*  断开重连的回调方法
*
*  @param event       事件的返回值
*  @param topicName   返回的主题名字，nil
*  @param content     返回的主题内容, nil
*  @param contentLen  返回的主题内容长度,0
*/
- (void)didreconnectSuccess:(NSInteger)event
topicName:(NSString *)topicName
content:(NSString *)content
contentLen:(NSInteger)contentLen;

```

```
/**
*  断开连接的回调方法
*
*  @param event      事件的返回值
*  @param topicName  返回的主题名字,nil
*  @param content    返回到主题的内容,nil
*  @param contentLen 返回的主题的内容长度,0
*/
- (void)didconnectBroken:(NSInteger)event
topicName:(NSString *)topicName
content:(NSString *)content
contentLen:(NSInteger)contentLen;

```
```
/**
*  发布成功的回调方法
*
*  @param event      事件的返回值
*  @param topicName  返回的主题名字,nil
*  @param content    返回的主题的内容,nil
*  @param contentLen 返回的主题的内容长度,0
*/
- (void)didsubSuccess:(NSInteger)event
topicName:(NSString *)topicName
content:(NSString *)content
contentLen:(NSInteger)contentLen;
```
```
/**
*  发布失败的回调方法
*
*  @param event      事件的返回值
*  @param topicName  返回的主题名字,nil
*  @param content    返回的主题的内容,nil
*  @param contentLen 返回的主题的内容的长度,0
*/
- (void)didsubFailed:(NSInteger)event
topicName:(NSString *)topicName
content:(NSString *)content
contentLen:(NSInteger)contentLen;


```
```
/**
*  发布失败的回调方法
*
*  @param event      事件的返回值
*  @param topicName  返回的主题名字,nil
*  @param content    返回的主题的内容,nil
*  @param contentLen 返回的主题的内容的长度,0
*/
- (void)didsubFailed:(NSInteger)event
topicName:(NSString *)topicName
content:(NSString *)content
contentLen:(NSInteger)contentLen;


```
```
/**
*  取消订阅失败的回调方法
*
*  @param event      事件的返回值
*  @param topicName  返回的主题的名字,nil
*  @param content    返回的主题的内容,nil
*  @param contentLen 返回的主题的内容长度,0
*/
- (void)didunsubFailed:(NSInteger)event
topicName:(NSString *)topicName
content:(NSString *)content
contentLen:(NSInteger)contentLen;


```
```
/**
*  发布成功的回调方法
*
*  @param event      事件的返回值
*  @param topicName  返回的主题的名字,nil
*  @param content    返回的主题的内容,nil
*  @param contentLen 返回的主题的内容的长度,0
*/
- (void)didpubSuccess:(NSInteger)event
topicName:(NSString *)topicName
content:(NSString *)content
contentLen:(NSInteger)contentLen;


```
```
/**
*  发布失败的回调方法
*
*  @param event      事件的返回值
*  @param topicName  返回的主题的名字,nil
*  @param content    返回的主题的内容,nil
*  @param contentLen 返回的主题的内容的长度,0
*/
- (void)didpubFailed:(NSInteger)event
topicName:(NSString *)topicName
content:(NSString *)content
contentLen:(NSInteger)contentLen;


```
```
/**
*   接收到消息的回调方法
*
*  @param event      事件的返回值
*  @param topicName  返回的主题的名字,订阅主题的名字
*  @param content    返回的主题的内容,订阅主题的内容
*  @param contentLen 返回的主题的内容的长度
*/
- (void)didreceivedmessage:(NSInteger)event
topicName:(NSString *)topicName
content:(NSString *)content
contentLen:(NSInteger)contentLen;


```