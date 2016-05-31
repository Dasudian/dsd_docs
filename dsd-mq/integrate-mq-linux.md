# iOS上集成AAA服务

## 集成前准备
到[大数点开发者平台](https://dev.dasudian.com/)注册成为大数点合作伙伴并创建应用

## 下载SDK
到[大数点官网](https://dev.dasudian.com/sdk/)下载SDK.

## SDK内容

- lib(需要的库)
- header(需要的头文件)


## 配置工程
将以上文件夹中的文件导入到工程目录下即可使用.

## 使用SDK

### 参数说明

```
enum eventType {
reconnectSuccess = 0, //连接服务器成功
connectBroken,//断开连接
subSuccess,//订阅成功
subFailed,//订阅失败
unsubSuccess,//取消订阅成功
unsubFailed,//取消订阅失败
pubSuccess,//发布主题成功
pubFailed,//发布主题失败
msgCome,//订阅的消息到来
subList,//订阅的主题列表
};


/**  统一参数说明：
*   qos:此参数出现在订阅消息和发布主题的方法里面，总共有3个值，代表不同级别的服务质量。
*   0：“最多一次”，尽操作环境所能提供的最大努力分发消息，消息可能会丢失。例如，这个等级可用于环境传感器数据，单次的数据丢失没关系，因为不久之后会再次发送。
*   1：“至少一次”，保证消息可以到达，但是可能会重复。
*   2：“仅一次”，保证消息只到达一次，例如，这个等级可用在一个计费系统中，这里如果消息重复或丢失会导致不正确的收费。
*  userinfo:用户用于统计信息的参数，出现在初始化方法里面，需要注意的是参数可以为空也就是nil，但是如果参数不为空的话那就必须传有效的json字符串key-vlaue键值对形式，例如：{“age”:"*","area":"*".....}.
*  同理当你订阅的时候选择服务质量也会产生相应的效果，只不过是收到消息，而发布的时候是发布消息。
*/




```


### 注册的回调函数

```
/**
* 连接服务器需要注册的回调函数
* @param  event       eventType结构体中事件
* @param  topicName   主题名
* @param  content     消息的内容
* @param  contentLen  消息的内容的长度
* @return             成功返回0。
*/
typedef void (*userCallback)(int event, char *topicName, char *content, int contentLen);


```



### 连接服务器
在开始调用后面的api之前需要使用该方法连接服务器，只有连接服务器成功后，调用后面的api才能成功。

```
/**
* 连接服务器
* @param  serverAddress 服务器地址，如果为空，则默认为大数点的公有云服务器地址
* @param  version       版本号
* @param  appID         appid,开发者在大数点注册app后得到的appid
* @param  appKey        appkey，开发者在大数点注册app后得到的appkey
* @param  userID        用户的id
* @param  clientID      设备的唯一标识符。
* @param  option        用户需要统计的信息，如果为nil则表示不需要统计，如果需要统计则必须是一个合法的json字符串
* @param  appCallBack   注册的回调函数
* @return               成功返回0.
*/
int dsdMqttConnect(char *serverAddress, char *version, char *appID, char *appKey,
char *userID, char *clientID, char *option, userCallback appCallBack);



```






### 订阅主题

```
/**
* 订阅主题
* @param  topic 主题名
* @param  qos   服务质量
* @return       成功返回0
*/
int dsdMqttSubscribe(char *topic, int qos);

```

### 取消订阅

```
/**
* 取消订阅
* @param  topic 需要取消订阅的主题名
* @return       成功返回0
*/
int dsdMqttUnsubscribe(char *topic);
```

### 发布主题

```
/**
* 发布主题
* @param  topicName   发布消息的主题名字
* @param  content     发布消息的内容
* @param  contentLen  发布消息的内容的长度
* @param  qos         发布消息的时候选择的服务质量
* @param  retained    发布消息的时候选择服务器是否保留发布的消息
* @return             成功返回0
*/
int dsdMqttPublish(char *topicName, char *content, int contentLen, int qos, unsigned char retained);

```

### 与服务器断开连接

```
/**
* 与服务器断开连接
* @return 成功返回0
*/
int dsdMqttDisconnect();

```

### 获取主题列表的方法

```
/**
* 获取主题列表的方法
* @return  成功返回0
*/
int dsdMqttGetSubList(void);

```






