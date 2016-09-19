---
title: DataHub-Java
currentMenu: datahub-sdk-java
parent2: datahub-sdk
parent1: dsd-datahub
---

# DataHub Java SDK

## Class DataHubClient

### 初始化
```
public DataHubClient(java.lang.String userName,
                     java.lang.String clientId,
                     java.lang.String appId,
                     java.lang.String appSec,
                     ActionCallback callback,
                     java.util.Map<java.lang.String,java.lang.Object> options)
构造函数。Constructor，used to create a IoT instances.
Parameters:
userName - 用户唯一标志符，可以是任意的字符串或则第三方标志符。
users' unique identifier, could be anything from your app server or 3rd party identifier (e.g. openID)
clientId - 客户端id，mac地址获取是UUID，用于服务器唯一标志一个用户，方便消息推送。
(MAC address of mobile phone or other UUID), used for pushing message to specific clients.
appId - app唯一标志符，从大数点官网注册获取，或者联系大数点客服人员获取。
app's unique identifier within Dasudian Cloud,
get it along with appKey while creating an app at [Dasudian Developer's Portal](dev.dasudian.com)
appSec - app秘钥，从大数点官网注册获取，或者联系大数点客服人员获取。。
app's secret to communicate with Dasudian Cloud, which is created together with AppID
callback - 事件回调函数，查看ActionCallback类获取更多细节。
A callback interface,see class ActionCallback for more detail.
options - 可选设置，一般填null：
1.key:aucUrl,value：String：指定AUC的地址，不指定将使用默认的AUC地址。
2.key:mqttCleanSession,value: Boolean：是否清除会话。
options param，usually be null:
1:key:aucUrl,value:String,a url for private cloud.
2:key:mqttCleanSession,value:key:Boolean,clean session or not.
```

### 连接服务器
```
public void connect()
             throws com.dasudian.iot.sdk.ServiceException
连接服务器，该方法是同步方法，会阻塞主线程。连接成功后，sdk会在连接断开后自动重连。
现在的自动重连的机制是：在连接断开后，sdk等待1秒后会尝试连接服务器，如果连接失败会等待双倍的时间后再连接服务器，
直到最后最多等待2分钟后，再次连接服务器。
connect server,this is a synchronize function,It will block the main thread.After connect success, 
sdk will auto reconnect.
the client will attempt to reconnect to the server. It will initially wait 1 second before it 
attempts to reconnect, for every failed reconnect attempt, the delay will double until it is at
2 minutes at which point the delay will stay at 2 minutes.
Throws:
com.dasudian.iot.sdk.ServiceException - 连接服务器失败会抛出异常
when connect failed will throw a exception.
```

### 获取当前连接状态
```
public boolean isConnected()
查看客户端连接状态 get the client connect status.
Returns:
处于连接状态返回true，连接断开返回false
return true if connected, else return false.
```

### 发布消息到服务器
```
public void publish(Message msg)
             throws com.dasudian.iot.sdk.ServiceException
非阻塞的发送消息，发送的结果在回调函数中返回。在网络丢失时，sdk会最多cache 10个消息。
这10个消息在网络连接恢复后会发送给服务器。
Asynchronous send a message, the send result will return in the callback function.
when the connect lost,sdk will cache 10 message most.After the connect re-establish,
the 10 cache message will send to server.
Parameters:
msg - 要发布的消息.the message you want to send.see class Message for more detail.
Throws:
com.dasudian.iot.sdk.ServiceException - 发送失败时抛出异常
An exception is thrown when transmission failure.
```

### 阻塞的发布消息
```
public Message sendRequest(Message msg)
                    throws com.dasudian.iot.sdk.ServiceException
阻塞的发布消息，该方法会阻塞的等待消息发送完成，或则超时返回。超时时间有Message的timeout字段指定。
timeout = 0：表示一直等待；timeout = someValue：表示最多等待someValue毫秒。
a blocking request, If the action completes before the timeout then control returns immediately,
if not it will block until the timeout expires.
There Message timeout field specifies the timeout.
timeout = 0:wait forever.timeout = someValue:the maximum amount of time to wait for, in milliseconds. 
Parameters:
msg - 要发送的消息
Message you want to send.
Returns:
成功时返回发送的消息
return the Message you send when success.
Throws:
com.dasudian.iot.sdk.ServiceException - 发送失败时抛出异常
An exception is thrown when transmission failure.
```

### 订阅消息
```
public void subscribe(Topic topic)
               throws com.dasudian.iot.sdk.ServiceException
订阅一个topic，该方法是同步方法，会阻塞的等待服务器结果，最多阻塞5秒。
subscribe a topic, this function will blocking to wait server response,Up to 5 seconds blocking.
Parameters:
topic - 要订阅的topic
the topic you want to subscribe, see class Topic see more detail.
Throws:
com.dasudian.iot.sdk.ServiceException - 失败时抛出异常
An exception is thrown when transmission failure.
```

### 取消订阅
```
public void unsubscribe(Topic topic)
                 throws com.dasudian.iot.sdk.ServiceException
取消订阅，该方法是同步方法，会阻塞的等待服务器结果，最多阻塞5秒。
unsubscribe a topic, this function will blocking to wait server response,Up to 5 seconds blocking.
Parameters:
topic - 要取消的topic
the topic you want to subscribe, see class Topic see more detail.
Throws:
com.dasudian.iot.sdk.ServiceException - 失败时抛出异常
An exception is thrown when transmission failure.
```

### 与服务器断开连接
```
public void disconnect()
                throws com.dasudian.iot.sdk.ServiceException
断开与服务器的连接
disconnect with server.
Throws:
com.dasudian.iot.sdk.ServiceException - 失败时抛出异常
An exception is thrown when transmission failure.
```