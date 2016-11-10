

## 初始化前准备

### 获取sdk

联系大数点客服人员获取最新的sdk和开发文档。

### 环境设置

拷贝im-java-sdk-1.0.jar到libs目录下，拷贝dsd_im.crt到res/raw目录下。

### 设置网络访问权限

在AndroidManifest.xml添加如下的网络访问权限。

```
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```

## 初始化SDK并登录

如果build客户端的时候，没有抛出异常，则sdk内部会自动重新连接服务器。

```
/**
 * 连接服务器，并获取到client实例
 * @param serverInfo 服务器信息 
 * @param userInfo	用户个人信息
 * @param context   context
 * @param callback	sdk连接状态回调函数
 * @return	Client 连接成功后，返回一个client对象	
 * @throws ServiceException  连接失败时抛出异常
 */
public static Client build(ServerInfo serverInfo, UserInfo userInfo, Context context, ClientCallback callback) 
			throws ServiceException
```

参数ServerInfo详细说明：

```
public class ServerInfo {
	private URL aucAddress; // 服务器地址，为空则默认使用大数点提供的公有云服务
	private String appId; // 联系大数点客服获取
	private String appSec; // 联系大数点客服获取
	private String userId; // 用户唯一id
	private String clientId; // 设备唯一id
	......
}
````

参数userInfo详细说明：

```
public class UserInfo {
	public final static String MALE = "0";
	public final static String FEMALE = "1";

	private String userid; // 用户唯一id
	private String nickname; // 用户昵称
	private String avatarurl; // 用户头像url
	private String location; // 用户所在地区
	private String sex; // 用户性别,0:男,1:女
	private String signature; // 用户签名
	......
}
```

callback定义说明：

```
public interface ClientCallback {
	// 连接成功时的回调
	void onConnect();
	
	// 连接失败时的回调
	void onConnectError(String reason);
	
	// 连接中途断开时的回调
	void onConnectLost();
}
```


## 聊天室

### 加入聊天室

```
/**
 * 加入聊天室，如果这个聊天室不存在，系统会根据roomId和name自动创建该聊天室
 * @param roomId	聊天室id，需要保证唯一
 * @param name		聊天室的别名
 * @param callback	聊天室回调函数
 * @return ChatRoom	加入聊天室成功后返回ChatRoom对象
 * @throws ServiceException 加入聊天室失败或则sdk异常时抛出异常
 */
ChatRoom enterChatRoom(String roomId, String name, ChatRoomCallback callback) throws ServiceException 
```

参数callback详细说明：

```
public interface ChatRoomCallback {
	// 加入聊天室服务器返回的结果
	void onEnterResult(int result);

	// 退出聊天室服务器返回的结果
	void onExitResult(int result);

	// 收到聊天室消息时的回调函数
	void onChatRoomMessage(Message message);

	// 发送消息时，服务器返回的结果回调
	void onChatRoomMessageDelivery(String id, int result);

	// 聊天室系统通知消息
	void onSystemNotification(Message message);
}
```

### 发送消息

在加入聊天室成功后会返回一个与该聊天室对应的ChatRoom对象，通过这个ChatRoom对象的方法可以发送聊天室消息。
下面是ChatRoom类的方法说明。

```
/**
 * 发送文本消息
 * @param content 要发送的内容
 * @return Message 发送成功返回Message对象
 * @throws ServiceException  发送失败时抛出异常
 */
Message sendTextMessage(String content) throws ServiceException
```

返回值Message说明：

```
public class Message {
	......

	// 这条消息是谁发送的
	private String senderId;

	// 如果是聊天室消息，消息里面会有组的id
	private String groupId;

	// 如果是聊天室消息，消息里面会有组的名字
	private String groupName;

	// 消息的内容
	private JsonNode content;

	// 消息发送的时间
	private String time;

	// 消息id，每一条消息都有唯一的id。可以通过该id判断某条消息是否发送成功
	private int id;

	......
}
```

### 退出聊天室

```
/**
 * 退出聊天室
 * @throws ServiceException 退出失败时抛出异常
 */
exit() throws ServiceException 
```

## 获取聊天室列表

```
/**
 * 获取所有的聊天室
 * @param callback 	结果回调函数
 * @throws ServiceException	失败时抛出异常
 */
public void getGroupList(GetGroupCallback callback) throws ServiceException
```

参数callback说明：

```
public interface GetGroupCallback {
	void onResult(String result);
	// result 是下面的json格式
	{
	    "d" :"36" //dsdmethod
	    "s" :0000 //status 0000：成功, 1XXX: 失败
	    ”gl“:[]//group list
	    "i”:　"xx " //msgid
	｝
}
```

## 退出登录

```
logout();
```