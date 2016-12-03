---
title: DataHub-CSharp
currentMenu: datahub-sdk-csharp
parent2: datahub-sdk
parent1: dsd-datahub
---

## 获取sdk

联系大数点客服人员获取最新的sdk和文档，以及instanceId和instanceKey。
instanceId和instanceKey用于sdk和大数点服务器建立安全的通信。

## 集成前准备

在自己的项目中引入大数点IoT DataHub的动态库。将DataHub.dll和M2Mqtt.dll拷贝到你工程中exe文件的运行目录下。
然后在你的项目中引用该dll库。


## 初始化

使用DataHubClient的Builder创建一个DataHubClient实例。

```
string serverURI = "private server URI";// 私有云服务器地址，如果不设置该地址，则使用大数点公有云服务器
string instanceId = "your instanceId";// 从大数点客服务获取的instanceId
string instanceKey = "your instanceKey";// 从大数点客服获取的instanceKey
string clientId = "your clientid"; // 客户端的唯一标识，不同的客户端id不能相同
string userName = Guid.NewGuid().ToString(); // 用户名，可任意填写

// create client instance
DataHubClient client = new DataHubClient.Builder(instanceId, instanceKey, userName, clientId)
    .SetServerURI(serverURI).Build();
```

DataHubClient.Builder详细说明

```
/// <summary>
/// 使用该Builder获取DataHubClient实例
/// </summary>
public class Builder
{
    ......

    /// <summary>
    /// 通过该Builer获取DataHubClient实例
    /// </summary>
    /// <param name="instanceId">联系大数点客服获取</param>
    /// <param name="instanceKey">联系大数点客服获取</param>
    /// <param name="userName">用户名，可任意填写</param>
    /// <param name="clientId">客户端Id，唯一标识一个客户端，用于服务器向客户端推送消息，必须保证每个客户端Id不相同</param>
    public Builder(string instanceId, string instanceKey, string userName, string clientId)
    {
    }

    /// <summary>
    /// 设置私有云服务器地址
    /// </summary>
    /// <param name="serverURI">服务器地址</param>
    /// <returns>返回当前Builder</returns>
    public Builder SetServerURI(string serverURI)
    {
    }

    /// <summary>
    /// 设置是否清除会话
    /// </summary>
    /// <param name="cleanSession">true:清除会话，在客户端断开连接后，订阅的topic不会在服务器保存。
    /// false：不清除会话，断开连接后订阅的topic会保留。</param>
    /// <returns>返回当前Builder</returns>
    public Builder SetCleanSession(bool cleanSession)
    {
    }

    /// <summary>
    /// 设置加密证书
    /// </summary>
    /// <param name="certificate">大数点提供的私有加密证书</param>
    /// <returns>返回当前Builder</returns>
    public Builder SetCertificate(X509Certificate certificate)
    {
    }

    /// <summary>
    /// 忽略加密证书
    /// </summary>
    /// <param name="ignoreCertificate">true：忽略加密证书。false：不忽略加密证书，则需要使用大数点私有加密证书</param>
    /// <returns>返回当前Builder</returns>
    public Builder SetIgnoreCertificate(bool ignoreCertificate)
    {
    }

    /// <summary>
    /// 设置是否开启sdk内部的自动重连功能
    /// </summary>
    /// <param name="automaticReconnect">true:开启sdk内部自动重连功能，
    /// 在SDK与服务器断开连接后SDK会没5秒连接一次服务器直到连接成功；
    /// false：不开启sdk内部自动重连功能</param>
    /// <returns>返回当前Builder</returns>
    public Builder SetAutomaticReconnect(bool automaticReconnect)
    {
    }

    /// <summary>
    /// 构建DataHubClient实例
    /// </summary>
    /// <returns>返回DataHubClient实例</returns>
    public DataHubClient Build()
    {
    }
}
```

## 设置回调函数

```
// 接收服务器或者其他客户端发布的消息
public event MessageEventHandler MessageReceived;
// 监听发布消息的结果
public event PublishedEventHandler Published;
// 监听订阅结果
public event SubscribedEventHandler Subscribed;
// 监听取消订阅结果
public event UnsubscribedEventHandler Unsubscribed;
// 监听SDK与服务连接断开
public event ConnectionLostEventHandler ConnectionLost;
```

## 连接服务器

```
/// <summary>
/// 连接服务器
/// </summary>
/// <returns>成功：0；失败：查看错误码</returns>
public byte Connect()
```

## 订阅

该方法为异步方法，不会阻塞主线程。

```
/// <summary>
/// 订阅
/// </summary>
/// <param name="topic">主题名</param>
/// <param name="qos">服务质量</param>
/// <returns>成功：返回消息id，该id可以用来在Subscribed回调函数中用来确认消息是否发送成功；
/// 失败：返回错误码</returns>
public int Subscribe(string topic, byte qos)
```

服务质量说明

```
// qos(quality of service),服务质量
// 最多发送一次，发送失败了不会再发送
public const byte QOS_LEVEL_AT_MOST_ONCE = 0x00;
// 至少发送一次，可能会发送多次
public const byte QOS_LEVEL_AT_LEAST_ONCE = 0x01;
// 发送失败后会重发，但是会确保服务器只收到一次
public const byte QOS_LEVEL_EXACTLY_ONCE = 0x02;
```

## 取消订阅

```
/// <summary>
/// 取消订阅
/// </summary>
/// <param name="topic">主题名</param>
/// <returns>成功：返回消息id，可以在Unsubscribed中确定消息是否发送成功；
/// 失败：返回错误码</returns>
public int Unsubscribe(string topic)
```

## 发布消息

异步发送

```
/// <summary>
/// 发送异步消息
/// </summary>
/// <param name="topic">主题名</param>
/// <param name="message">消息内容</param>
/// <param name="qos">服务质量</param>
/// <returns>成功：返回消息id，可在Published回调函数中确定消息是否发送成功；
/// 失败：返回错误码</returns>
public int Publish(string topic, byte[] message, byte qos)
```

同步发送

```
/// <summary>
/// 发送同步请求
/// </summary>
/// <param name="topic">主题名</param>
/// <param name="message">消息内容</param>
/// <param name="qos">服务质量</param>
/// <param name="timeout">超时时间，多长时间没有收到服务的应答视为超时，单位ms</param>
/// <returns>返回结果码：成功：Constants.SUCCESS；失败：Constants.ERROR_SERVER_NOT_CONNECTED(服务器未连接),
/// Constants.ERROR_SNED_TIMEOUT(发送超时)</returns>
public int SendRequest(string topic, byte[] message, byte qos, Int32 timeout)
```

## 获取sdk连接状态

```
/// <summary>
/// 获取当前sdk与服务器的连接状态
/// </summary>
/// <returns>true：sdk与服务器连接正常；false：sdk与服务器连接断开</returns>
public bool IsConnected()
```

## 断开与服务器的连接

```
/// <summary>
/// 断开与服务器的连接
/// </summary>
public void Disconnect()
```
