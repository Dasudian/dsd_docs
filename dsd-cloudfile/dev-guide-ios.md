---
title: "CloudFile-iOS"
currentMenu: cf-ios
parent1: dsd-cloudfile
---

# iOS上集成Cloudfile服务

## 集成前准备
到[大数点开发者平台](https://dev.dasudian.com/)注册成为大数点合作伙伴并创建应用


## 下载SDK
到[大数点官网](https://dev.dasudian.com/sdk/client)下载CF SDK.



## SDK内容

 - libdsd_cf.a
 - DSDCloudFileClient.h

## 配置工程
将SDK中的.a和.h导入到工程目录下即可使用，不用配置路径。


## 使用SDK

### 初始化

```
/**
*  初始化方法，参数都为必填项，不填或填nil则初始化失败
*
*  @param ocversion       版本号，如@“1.0”
*  @param ocappid         注册的appid
*  @param ocappkey        注册app获取的appkey
*  @param ocuserid        userid
*  @param occlientid      设备的唯一id（device token）
*  @param ocserveraddress 用户填写服务器地址
*
*  @return 成功当前类的一个实例对象，失败返回nil
*/
- (id)initWithversion:(NSString *)ocversion
                appID:(NSString *)ocappid
               appKey:(NSString *)ocappkey
               userID:(NSString *)ocuserid
             clientID:(NSString *)occlientid
        serverAddress:(NSString *)ocserveraddress;

```


### 上传文件


```
/**
*  上传文件方法
*
*  @param ocdest     如果是上传文件则为：@“upload”
*  @param ocfilepath 文件的绝对路径
*  @param ocfilename 文件名字
*/
- (void)dsdCfUpload:(NSString *)ocdest 
           filePath:(NSString *)ocfilepath 
           fileName:(NSString *)ocfilename;


```



### 反初始化

```
/**
*  此方法为反初始化方法，调用此方法后若要上传文件，则必须重新初始化。
*/

- (void)dsdCfCleanUp;

```


### 上传回调

```
/**
*   上传文件的回调，代理对象必须实现的代理方法。
*
*  @param fileurl 上传成功fileurl为文件的url，失败fileurl为nil
*/

@required

- (void)dsdUploadcallback:(NSString *)fileurl;

```
