---
title: IM Android集成
currentMenu: im-android
parent1: dsd-im
---

# Android上集成IM服务

## 集成前准备
到[大数点开发者平台](https://dev.dasudian.com)注册成为大数点合作伙伴并创建应用，每创建一个应用大数点平台会为其生成一个AppID和AppSec，AppID在大数点平台唯一标识一个应用，而AppSec可以被更新。AppID和AppSec将在您的代码里使用，保证您的应用与大数点平台间的安全传输。

若您还没有注册，请使用如下Demo App作测试：

Demo App:
```
AppID: 9_9AFja3v8muZumgSuiu_A
AppKey: e844ae089ce9ccc0
```

## 下载SDK
到[大数点官网](http://main.dasudian.com/downloads/sdk/latest/im-sdk-android.zip)下载IM SDK.

## SDK内容

 - dsd-lib-IM.jar
 - libdsd_im.so
 
## 配置工程
### 导入库和jar包
拷贝libdsd_im.so到libs/armeabi目录下，如果没有armeabi目录，请手动创建该目录。
拷贝dsd-lib-IM.jar到libs目录下。

### 配置权限
在AndroidManifest.xml中加入如下内容使能必要的访问权限.
```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## 初始化SDK

### 获取DsdIMClient实例

```
DsdIMClient dsdIMClient = DsdIMClient.getInstance();
```

### 设置callback接口

```
void setDsdIMCallback(DsdIMClientInterface dsdIMClientCallback)
```

### 实现接口回调函数

```
class ReceiveMsg implements DsdIMClientInterface {

		@Override
		public void onReceivedMsg(String content) {
		}

		@Override
		public void onReconnectSuccess() {
		}

		@Override
		public void onConnectionLost() {
		}

		@Override
		public void onLoginOnAnotherClient() {
		}

		@Override
		public void onGroupMuted(String content) {
		}

		@Override
		public void onGroupUnmuted(String content) {
		}

		@Override
		public void onSystemGroupMsg(String content) {
		}
	}
```

onReceivedMsg消息
```
{
	"d":"0|1|2",  //0-单播，1-组播，2-广播
	"f":"5289bb2a-cc53-4ad8-9a30-161b1aa680c7",  // 消息发送者
	"g":"101_9AMQjXqiPkvgRKEef2_5289bb2a-cc53-4ad8-9a30-161b1aa680c7_1470291003", // groupId
	"m": 
	{
		"b":"content", // 消息内容
		"t":"1|2|3|4" //消息类型,0-text,1-image,3-audio,4-video
	}, 
	"i":"6", // msgid
	"t":"1470291040" // 消息时间戳
}
```

onGroupMuted消息
```
{
    "d" :"25" //dsdmethod 禁言
    "f":"ocean" //fromuser
    "g":"1001" //groupid
    "ts”: xxxxx //timestamp
}
```

onGroupUnmuted消息
```
{
    "d" :"28" //dsdmethod 取消禁言
    "f":"ocean" //fromuser
    "g":"1001" //groupid
    "ts”: xxxxx //timestamp
}
```

onSystemGroupMsg消息
```
{  
    "d":"38",               //dsdmethod  
    "f":"Dasudian",         //fromuser  
    "t":"14645433534",      //timestamp  
    "m":{                   //msg body  
        "t":1,              //Notification-type(1:群内某人被踢出，2：群组解散，3：某人离开群组，4：某人加入群组)  
        "g":"gid1234567",   //group id  
        "u":"U1"            //UserId,被操作的对象（群成员操作时才有,比如'当t=1时，表示被踢的UserID；当t=2，可以不传；当t=3/4时，表示离开/加入的UserId'）  
    }  
}  
```

### 链接服务器

```java
/**
 * 初始化sdk并链接服务器。
 * @param  serverAddress  服务器地址，为空则默认使用大数点提供的公有云服务
 * @param  version      "1.0"
 * @param  appID        app的id，在大数点开发者平台创建应用时获得
 * @param  appSec       app秘钥，在大数点开发者平台创建应用时获得
 * @param  userId       用户名,用户身份唯一标识
 * 						传null表示不统计，或者传一个用户信息的JSON，比如{"name":"jack","gender":"male","region":"Beijing"}
 * @param  clientId	    客户端的唯一id，用于服务器向客户端推送消息
 * @param  option       可选的用户信息，用于后台统计；
 * @return              成功:0,失败:-1
 */
int dsdInit(String serverAddress, String version,
			String appId, String appSec, String userId, String clientId,
			String option);
```

## 发送单播消息
注意：
1.使用大数点公有云服务器，非VIP用户可以发送的最大消息长度为1024个字节。
2.所有发送消息相关的函数，消息都必须以如下JSON格式发送。
```
{"t":"0|1|2|3|4","b":"msg content"}
@t： Message Type
	0 text
	1 image
	2 audio
    3 video
	4 HTML5 page
@b： 消息内容,如果消息为image或audio等多媒体消息，则为该多媒体的URL。
```

```java
/**
 * 同步单播消息.该函数会阻塞到收到服务器的ack或者超时后返回.
 * @param  from       发送消息的人
 * @param  toUser	  目标用户列表
 * @param  msg        消息内容,必须为JSON格式
 * @return            成功:0,失败:查看失败码
 */
int dsdSendWithAck(String from, String toUser, String msg)；
```

## 发送组播消息

```java
/**
 * 同步的发送组播消息,该函数会阻塞到收到服务器的ack或者超时后返回.
 * @param  user    发送者
 * @param  groupid 组id
 * @param  msg     消息内容
 * @return         成功:0,失败:查看失败码
 */
int dsdMulticastwithAck(String user, String groupid, String msg)；
```

## 发送广播消息

```java
/**
 * 异步的发送广播消息,该函数不会阻塞调用者.
 * @param user  发送者
 * @param msg   消息内容
 */
int dsdBroadcastWithAck(String user, String msg);
```

## 创建组

```java
/**
 * 创建组播组,该函数会阻塞到收到服务器的ack或者超时后返回.
 * @param  user      用户名
 * @return           成功:返回组播组的id,失败:NULL
 */
String dsdCreateGroup(String user);
```

返回格式

```
{
    "d" :"10" //dsdmethod
    "s" : 0//status 0000：成功, 1XXX： 失败
    ”g":”1111” //groupid
    "i":"xxxx"//msgid
｝
```

## 加入组

```java
/**
 * 加入组播组,该函数会阻塞到收到服务器的ack或者超时后返回.
 * @param  user    用户名
 * @param  groupid dsdCreateGroup函数返回的组播组id
 * @return         成功:0,失败:查看失败码
 */
int dsdJoinGroup(String user, String groupId);
```

## 离开组

```java
/**
 * 离开组播组,该函数会阻塞到收到服务器的ack或者超时后返回.
 * @param  user    离开的用户
 * @param  groupid dsdCreateGroup函数返回的组播组id
 * @return         成功:0,失败:查看失败码
 */
int dsdLeaveGroup(String user, String groupId);
```

## 将某人踢出组

```java
/**
 * 将某人踢出组播组,该函数会阻塞到收到服务器的ack或者超时后返回.
 * @param  user        组播组拥有者
 * @param  groupId     dsdCreateGroup函数返回的组播组id
 * @param  groupMember 要踢出的人
 * @return             成功:0,失败:查看失败码
 */
int dsdKickOutOfGroup(String user, String groupId, String groupMember)
```

## 组内将某人禁言

```java
/**
 * 组内将某人禁言
 * @param user			创建组的人
 * @param groupId       组id
 * @param groupMember   被禁言人
 * @return				成功:0,失败:查看失败码
 */
int dsdMuteGroup(String user, String groupId,
		String groupMember);
```

## 组内取消对某人的禁言

```java
/**
 * 组内取消对某人的禁言
 * @param user			创建组的人
 * @param groupId   	组id
 * @param groupMember	组成员
 * @return				成功:0,失败:查看失败码
 */
int dsdUnmuteGroup(String user, String groupId,
		String groupMember);
```

## 将某人加入黑名单

```java
/**
 * 将某人加入黑名单
 * @param sourceUser  用户
 * @param targetUser  将谁加入黑名单
 * @return    		  成功:0,失败:查看失败码
 */
int dsdAddToBlackList(String sourceUser, String targetUser);
```

## 将某人从黑名单移除

```java
/**
 * 将某人从黑名单移除
 * @param sourceUser 用户
 * @param targetUser 要移除的人
 * @return	成功:0,失败:查看失败码
 */
int dsdRemoveFromBlackList(String sourceUser,
		String targetUser);
```

## 获取当前所有的组

```java
/**
 * 获取当前所有的组
 * @param user  用户名
 * @return 成功：返回所有的组，失败：null
 */
String dsdGetAllGroupList(String user);
```

返回格式
```
{
    "d" :"36" //dsdmethod
    "s" :0000 //status 0000：成功, 1XXX: 失败
    ”gl“:[]//group list
    "i”:　"xx " //msgid
｝
```

## 获取某个组内所有的成员

```java
/**
 * 获取某个组内所有的成员
 * @param user		用户名
 * @param groupid   组id
 * @return   成功：返回所有的成员，失败：null
 */
String dsdGetGroupMemberList(String user, String groupid);
```

返回格式
```
{
    "d" :"34" //dsdmethod
    "s" :0000 //status 0000：成功, 1XXX: 失败
    ”gml“:[]//group member list
    "i”:　"xx " //msgid
｝
```

## 添加组管理员

```
/**
 * 添加组管理员
 * @param owner    组拥有者
 * @param groupId  组id
 * @param userId   组成员
 * @return 		   成功:0,失败:查看失败码
 */
int dsdAddGroupManager(String owner, String groupId, String userId);
```

## 移除组管理员

```
/**
 * 移除组管理员
 * @param owner   组拥有者
 * @param groupId 组id
 * @param userId  组成员
 * @return		  成功:0,失败:查看失败码
 */
int dsdRemoveGroupManager(String owner, String groupId, String userId);
```

## 获取组管理员列表

```
/**
 * 获取组管理员列表
 * @param owner   组拥有者
 * @param groupId 组id
 * @return  	  成功：返回所有的成员，失败：null
 */
String dsdGetGroupManagerList(String owner, String groupId);
```

返回的组管理员列表格式
```
{
    "d" :"44" //dsdmethod
    "s" :0000 //status 0000：成功, 1XXX: 失败
    ”gml“:[]//group manager list
    "i”:　"xx " //msgid
｝
```

## 获取历史消息

```
/**
 * 获取历史消息
 * @param userId   对方的名字
 * @param count    获取条数,0：全部，num：num条历史消息
 * @return    	   成功：返回json，失败：null
 */
String dsdGetHistoryMessage(String userId, int count);
```

成功时消息格式：
```
{
    "d" :"100" //dsdmethod
    "s" :0000 //status 0000：成功, 1XXX: 失败
    "ml":[]//msg list
    "i”:　"xx " //msgid
｝
```

## 清除历史消息

```
/**
 * 清除历史消息
 * @param userId  对方的名字
 * @param type    0：清除所有的历史消息，1：清除msgIdList里面的消息
 * @param msgIdList  json数组
 * @return   	  成功:0,失败:查看失败码
 */
int dsdClearHistoryMessage(String userId, int type, String msgIdList);
```

## 获取未读消息

```
/**
 * 获取未读消息
 * @return 成功返回json，失败返回null
 */
public native String dsdGetUnreadMessage();
```

成功时返回的消息格式：
```
{
  "d" :"102" //dsdmethod
  "s" :0000 //status 0000：成功, 1XXX: 失败
  "i”:　"xx " //msgid
  “ml”: [] // message list
｝
```

## 忽略未读消息

```
/**
 * 忽略未读消息
 * @param type			0：忽略全部未读消息，1：忽略部分未读
 * @param userIdList    当type为0时，传null；当type为1时，传要忽略的好友的消息id，格式为json数组
 * 						["userId1","userId2",...]
 * @return				成功:0,失败:查看错误码
 */
public native int dsdIgnoreUnreadMessages(int type, String userIdList);
```

## 消息设置为已读

```
/**
 * 设置消息为已读
 * @param userId    好友的id
 * @return			成功:0,失败:查看错误码
 */
public native int dsdSendMessageReceipt(String userId);
```

## 退出登录

```
/**
 * 退出登录，切换用户时调用
 * @param user 用户
 * @return		成功：0，失败：查看错误列表
 */
int dsdSignOut(String user);
```

## 与服务器断开链接

```java
/**
 * 退出登陆，调用该函数后将不会收到服务器的推送消息。
 */
void dsdDisconnect();
```

## ERROR CODE

```
客户端错误码
2000-非法参数
2001-已经初始化了
2002-客户端初始化失败
2003-连接服务器失败
2004-连接服务器失败
2005-连接服务器超时
2006-发送消息超时
2007-发送的消息太大
2008-发送的消息不是json格式
2009-分配内存失败
2010-服务器未连接

服务器端错误码
0000-成功
1000-系统错误
1001-被禁言
1002-权限不够，操作被拒绝
1003-目标不存在
1004-被拉黑
1005-你已经是群成员，不能重复加入
1006-消息存在敏感词，不允许发送
1007-无效的JSON数据结构
1008-未知的Method
1009-要操作的Group不存在
1010-不是群内成员
1011-要操作的GroupID为空
```

## 下载Android示例程序
[下载Android示例程序](https://www.github.com/Dasudian/imsdk-example-android)
