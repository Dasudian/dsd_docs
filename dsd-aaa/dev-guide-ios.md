---
title: "AAA iOS"
currentMenu: aaa-ios
parent1: dsd-aaa
---

# iOS上集成AAA服务

## 集成前准备
到[大数点开发者平台](https://dev.dasudian.com/)注册成为大数点合作伙伴并创建应用

## 下载SDK
到[大数点官网](https://dev.dasudian.com/sdk/)下载AAA SDK.

## SDK内容

 - libdsd_aaa.a
 - dsdAAAClient.h
 - User.h

## 配置工程
将以上三个文件导入到工程目录下即可使用.

## 使用SDK

### 用户类的属性字段说明

```
/**
*   用户类的属性字段说明
* @param phoneNumber 电话号码
* @param veriCode    验证码，
* @param name        用户名
* @param sex         性别，请使用male和female，提交后不可修改
* @param birthday    生日，提交后不可修改。
* @param password    密码，由字母数字下划线组成，可修改。
* @param email       邮箱
* @param area        地域信息，eg：广东省/深圳市/南山区
* @param signature   个性签名。
*/

```
### 初始化SDK
在开始调用后面的api之前需要使用该方法初始化sdk，只有初始化sdk成功后，调用后面的api才能成功。
该方法主要用于大数点对用户信息进行验证。

```
/**
*  1.初始化SDK方法
*
*  @param appid         注册app时获取的appid
*  @param appkey        在AAA注册app时获取的appkey
*  @param serveraddress 服务器地址
*
*  @return 成功返回当前一个对象实例,失败返回nil.
*/

- (id)initWithAppid:(NSString *)appid Appkey:(NSString *)appkey ServerAddress:(NSString *)serveraddress;


```

### 注册手机号

```
/**
*  2. 注册手机号
*
*  @param phoneNumber 手机号码
*  @return json字符串  eg：成功{"result":"success","veri_code":"pinysl"}，veri_code为获取的验证码，在下一步的验证手机号中将用到。失败{"result":"fail","reason":"reason..."}
*/
- (NSString *)dsdAAARegisterUserPhoneNumber:(NSString *)phonenumber;

```

### 验证手机号

```
/**
*  3.验证手机号
*
*  @param phoneNumber  手机号码
*  @param code         短信验证码
*  @return  eg：成功{"result":"success"}，失败{"result":"fail","reason":"reason..."}
*/
- (NSString *)dsdAAAVerifyCodeWithphoneNumber:(NSString *)phonenumber code:(NSString *)code;

```

### 注册用户信息


```
/**
*  4.注册用户信息
*
*  @param user  用户User对象的一个实例
*
*  @return  json格式字符串，eg：成功{"result":"success"}，失败{"result":"fail","reason":"reason..."}
*/

- (NSString *)dsdAAARegisterWithUser:(User *)user;


```

### 手机号登陆


```
/**
*  5.手机号登陆
*
*  @param phoneNumber  手机号码
*  @param password     密码
*
*  @return json格式字符串，eg：成功{"result":"success"}，失败{"result":"fail","reason":"reason..."}
*/
- (NSString *)dsdAAALoginWithphoneNumber:(NSString *)phonenumber passWord:(NSString *)password;

```

### 自动登陆

```
/**
*  6.自动登陆
*
*
*  @return  json格式字符串，eg：成功{"result":"success"}，失败{"result":"fail","reason":"reason..."}
*/
-(NSString *)dsdAAAAutoLogin;


```

### 查看个人信息

```
/**
*  7.查看个人信息，需要先登录
*  @param phoneNumber  手机号码
*
*  @return json格式字符串，eg：成功
* {"result":"success","info":{"name":"dasudian","birthday":"19921015",
* "sex":"male","phone_num":"13618074451","email":"hr@dasudian.com",
* "area":"广东省/深圳市/南山区","portrait":"8vcKSfPVD9U1jR5EAq",
* "signature":"Change the world!"}}
* 失败{"result":"fail","reason":"reason..."}
*/
- (NSString *)dsdAAAGetUserWithphoneNumber:(NSString *)phonenumber;


```
### 设置头像


```
/**
*  8.设置头像，需要先登录
*
*  @param imagePath 头像图像路径
*
*  @return json格式字符串 成功返回图片的url，失败{"result":"fail","reason":"reason..."}
*/
- (NSString *)dsdAAASetIconWithimagePath:(NSString *)imagepath;

```

### 获取验证码


```
/**
*  9.获取验证码（仅用于忘记密码时获取验证码）
*
*  @param phoneNumber  手机号码
*  @return json格式字符串，eg：成功{"result":"success","veri_code":"pinysl"}，
* 失败{"result":"fail","reason":"reason..."}
*/
- (NSString *)dsdAAARequestVericodeWithphoneNumber:(NSString *)phonenumber;


```

### 忘记密码


```
/**
*  10.忘记密码
*
*  @param phonenumber  手机号码
*  @param verifycode   验证码
*  @param newpassword  新密码
*
*  @return @return json格式字符串，eg：成功{"result":"success"}，失败{"result":"fail","reason":"reason..."}
*/

- (NSString *)dsdAAAForgetPasswordWithphoneNumber:(NSString *)phonenumber verifyCode:(NSString *)verifycode Password:(NSString *)password;


```
### 修改密码


```
/**
*  11.修改密码
*
*  @param oldpassword 旧密码
*  @param nwepassword 新密码
*
*  @return  json格式字符串，eg：成功{"result":"success"}，失败{"result":"fail","reason":"reason..."}
*/
- (NSString *)dsdAAAChangePasswdWitholdPassword:(NSString *)oldpassword newPassword:(NSString *)newpassword;

```
### 修改用户名称

```
/**
*  12.修改用户名称
*
*  @param newname  新用户名
*
*  @return json格式字符串，eg：成功{"result":"success"}，失败{"result":"fail","reason":"reason..."}
*/
- (NSString *)dsdAAAChangeNameWithnewName:(NSString *)newname;

```
### 修改个性签名

```
/**
*  13.修改个性签名
*
*  @param signature 新签名
*
*  @return json格式字符串，eg：成功{"result":"success"}，失败{"result":"fail","reason":"reason..."}
*/
- (NSString *)dsdAAAChangeSignatureWithSignature:(NSString *)signature;


```
### 同步联系人

```
/**
*  14.同步联系人,需要先登录
*
*  @param contacts  联系人列表
*
*  @return json格式字符串，eg：成功{"result":"success"}，失败{"result":"fail","reason":"reason..."}
*/
- (NSString *)dsdAAASyncContactWithContacts:(NSString *)contacts;


```
### 获取联系人列表

```
/**
*   15.获取联系人列表,需要先登录
*
*  @param phonenumber  登录时的手机号码
*
*  @return  json格式字符串，{"result":"success","phone_number":"13618074451","contacts",
* ["13761975289","+8618565618719","18565618719"]}}
*/
- (NSString *)dsdAAAGetContactWithphoneNumber:(NSString *)phonenumber;

```
### 从qq拉取用户信息并保存

```
/**
*  16.从qq拉取用户信息并保存
*
*  @param uid         即openid用户的ID，与QQ号码一一对应
*  @param accesstoken 使用Authorization_Code获取
*  @param consumerkey 即oauth_consumer_key 申请QQ登录成功后，分配给应用的appid
*
*  @return
*/
- (NSString *)dsdAAAqqWithUid:(NSString *)uid accessToken:(NSString *)accesstoken consumerKye:(NSString *)consumerkey;


```
### 从wechat拉取用户信息并保存

```
/**
*  17.从wechat拉取用户信息并保存
*
*  @param uid         即openid 用户的唯一标识。
*  @param accesstoken 调用接口凭证,由微信提供
*  @param consumerkey 即oauth_consumer_key 申请QQ登录成功后，分配给应用的appid
*
*  @return 
*/
- (NSString *)dsdAAAwechatWithUid:(NSString *)uid accessToken:(NSString *)accesstoken consumerKey:(NSString *)consumerkey;



```
### 从服务器上获取保存的QQ和wechat授权用户信息

```
/**
*  18.从服务器上获取保存的QQ和wechat授权用户信息
*
*  @param uid     即openid 用户的唯一标识。
*  @param type    1 -> QQ 2 -> WeChat
*
*  @return  

*/
- (NSString *)dsdAAAOauthUserInfoWithUid:(NSString *)uid Type:(NSInteger)type;


```
### 从服务器上面获取保存的QQ和wechat授权的用户信息列表

```
/**
*  19.从服务器上面获取保存的QQ和wechat授权的用户信息列表
*
*  @param uid      即openid 用户的唯一标识。
*  @param type     1 -> QQ 2 -> WeChat
*  @param start    请求起始位置
*  @param num      请求的行数
*
*  @return  

*/
- (NSString *)dsdAAAOauthUserInfoListWithUid:(NSString *)uid Type:(NSInteger)type Start:(NSInteger)start Num:(NSInteger)num;


```


## 下载ios示例程序
[下载ios示例程序](https://github.com/Dasudian/aaasdk-example-ios)
