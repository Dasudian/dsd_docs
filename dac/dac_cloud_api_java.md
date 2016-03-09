---
title: DAC Java API
currentMenu: dac-java-api
parent1: dsd-dac
---

# DSD DAC_CLOUD API 指导手册 （JAVA）  

## 引言   

 DSD DAC_CLOUD API提供了功能丰富但使用简单的服务器开发的JAVA API，该API极大的降低了服务器开发与维护难度，降低开发成本，缩短开发周期。用户无需关注服务器的负载均衡性能等问题，只需关注简单的业务逻辑，如同开发简单的单机应用，就可以实现丰富的服务器应用。 
  
## 安装环境   

安装环境就是编译环境，目前只支持   
Ubuntu 14.06和Ubuntu 14.10。   
 
## 编译方法   
  
 1. 下载SDK jar包到指定目录   
 2. 在工程中以外部链接库的方式导入该jar包，Eclipse中方法如下:打开工程的`properties` -> 选择`java build path` ->选择`Add external JARs`   
 3. 生成jar时，添加外部的`manifest.mf`文件，在manifest.mf中添加如下  
> Class-Path: /usr/local/lib/dac-1.0.0/api/java/dasudian.jar
 
 
## API 类

API 类是该sdk的主要类，developers调用该类与erlang虚拟机交互，处理http请求或其他服务请求。

### 包

`API` 类在`com.dasudian.cloud`包中。  

### 属性

##### ASYNC

```java
static final int ASYNC
```
标示异步请求类型，值为1 。 

##### SYNC

```java
static final int SYNC
```
标示同步请求类型，值为-1 。  

### 方法

##### API
```java
API(int index)
```
API构造函数。  
**参数：**  
`index`  - 与erlang虚拟机交互的线程索引，不能超过thread_count的返回值。  
**返回：**  
返回当前的API实例。

##### thread_count
```java
int thread_count()
```
获取服务系统支持的与erlang虚拟机交互的最大线程数。  
**参数：**  
无  
**返回：**  
返回系统支持的最大线程数。    

##### subscribe
```java
void subscribe(final String pattern, 
                      final Object instance, 
                      final String methodName)
```
订阅一个服务，服务由服务名和服务前缀唯一标示。  
**参数：**  
`IN   pattern` - 服务名。服务id由服务前缀和服务名来唯一标示，服务前缀是包含该服务的应用上传时确定的。具体格式为`/prefix/pattern` ，对于http服务，get和post服务是分开的，格式如`name/get` 或者`name/post`  。  
`IN   instance` - 服务的回调函数的执行对象。  
`IN   methodname`  - 回调函数名。当收到该服务后，SDK会回调该方法。   
**返回：**  
无  

##### send_sync
```java
Response send_sync(String name, 
                              byte[] request)
```
发送同步请求给服务名为name的服务,其他参数为默认值。   
**参数：**     
`IN name`  - 请求的服务名。   
`IN response` - 请求的内容。   
**返回值：**   
返回一个Response对象。   

##### send_sync
```java
Response send_sync(String name, 
                              byte[] request_info, 
                              byte[] request,
                              Integer timeout, 
                              Byte priority)
```
发送同步请求给服务名为name的服务。  
**参数：**     
`IN name`  - 请求的服务名  
`IN request_info` - 请求的metedata数据    
`IN response` - 请求的内容   
`IN timeout` - 阻塞时间     
`IN priority` - 请求的优先级   
**返回值：**   
返回一个Response对象。  

##### send_async
```java
TransId send_async(String name, 
                              byte[] request)
```
异步请求服务名为name的服务，其他参数为默认值
**参数：**     
`IN name`  - 请求的服务名。  
`IN response`  - 请求的内容。    
**返回值：**   
返回一个TransId对象，表示该次请求的会话id 。   

##### send_async
```java
TransId send_async(String name, 
                              byte[] request_info, 
                              byte[] request,
                              Integer timeout, 
                              Byte priority)
```
异步请求服务名为name的服务。  
**参数：**     
`IN name`  - 请求的服务名。  
`IN request_info` - 请求的metedata数据。    
`IN response` - 请求的内容。  
`IN timeout` - 阻塞时间。     
`IN priority` - 请求的优先级。  
**返回值：**   
返回一个TransId对象，表示该次请求的会话id 。  

##### recv_async
```java
Response recv_async()
```  
获取最后一次请求transid的返回内容,阻塞时间为默认值。  
**参数：**  
无    
**返回值：**   
返回一个Response对象。  

##### recv_async
```java
Response recv_async(Integer timeout)
```  
获取最后一个transid的返回内容,阻塞timeout 毫秒数。  
**参数：**     
`IN timeout` - 方法的阻塞时间。  
**返回值：**   
返回一个Response对象。  

##### recv_async
```java
Response recv_async(byte[] trans_id)
```
获取会话trans_id的返回内容。  
**参数：**     
`IN trans_id` - 会话id 。  
**返回值：**   
返回一个Response对象。  

##### recv_async
```java
Response recv_async(Integer timeout, byte[] trans_id)
```  
获取会话trans_id的返回内容 ，阻塞时间为timeout  。  
**参数：**     
`IN trans_id` - 会话id  。  
`IN timeout` - 阻塞时间，单位为ms 。  
**返回值：**   
返回一个Response对象。  

##### publish
```java
List< TransId > publish(String name, byte[] request)
```  
向服务名为name的所有服务发布请求。  
**参数：**     
`IN name`  服务名，可以为正则表达式。  
`IN request` 请求内容。  
**返回值：**   
返回一个TransId列表。  

##### publish
```java
List< TransId > publish(String name,
                                     byte[] request_info, byte[] request,
                                     Integer timeout, Byte priority)
```  
向服务名为name的所有服务发布请求。  
**参数：**     
`IN name`  - 服务名，可以为正则表达式。  
`IN request` - 请求内容。  
`IN request_info` - 请求的metedata数据。  
`IN timeout` - publish的阻塞时间。  
`IN priority` - 服务请求的优先级。  
**返回值：**   
返回一个TransId列表。  

##### forward_async
```java
void forward_async(String name, byte[] request_info, byte[] request,
                              Integer timeout, Byte priority,
                              byte[] trans_id, DacPid pid)
``` 
异步转发请求给服务名为name的服务,执行完毕后抛出一个SDK必须要获取的ForwardAsyncException异常，应用程序必须将其抛出，否则会报错。即之后的代码 不会执行。目的服务执行完会直接回复请求。  
**参数：**     
`IN name` - 目的服务名，可以为正则表达式。  
`IN request_info` - 请求的元数据。  
`IN request` - 请求内容。    
`IN timeout` - 请求的阻塞时间。  
`IN priority` - 请求的优先级。  
`IN trans_id` - 转发请求的事务id 。  
`IN pi` - 转发请求的pid 。  
**返回值：**   
无

##### forward_sync
```java
void forward_sync(String name, byte[] request_info, byte[] request,
                              Integer timeout, Byte priority,
                              byte[] trans_id, DacPid pid)
```  
同步转发外界请求给服务名为name的服务,执行完毕后抛出一个SDK必须要获取的ForwardsyncException异常，应用程序必须将其抛出，否则会报错。即之后的代码 不会执行。目的服务执行完后会回复请求。  
**参数：**     
`IN name` - 目的服务名，可以为正则表达式。  
`IN request_info` - 请求的元数据。  
`IN request` - 请求内容。  
`IN timeout` - 请求的阻塞时间。  
`IN priority` - 请求的优先级。  
`IN trans_id` - 转发请求的事务id 。  
`IN pi` - 转发请求的pid 。  
**返回值：**   
无  

##### poll
```java
void poll(int timeout)
```    
轮询是否有请求到达。  
**参数：**     
`IN timeout` - 轮询周期，单位ms,如果设置为-1,表示永久阻塞直到有请求到来。  
**返回值：**   
无   

##### return_
```java
void return_(Integer command,
                  String name, String pattern,
                  byte[] response_info, byte[] response,
                  Integer timeout, byte[] trans_id, DacPid pid)
```  
响应请求回复，该函数执行完毕后会抛出ReturnAsyncException或ReturnSyncException异常，应用程序不可捕获它，该异常必须得由SDK捕获，否则会报错。所以可以在回调函数的最后一行返回。  
**参数：**     
`Integer command` - 回复类型，API.ASYNC：异步回复；API.SYNC:同步回复，必须与回调函数的参数保持一致。  
`IN name` - 服务名，与回调函数的参数保持一致。  
`IN request_info` - 请求的元数据。  
`IN request` - 请求内容。  
`IN timeout` - 请求的阻塞时间。  
`IN priority` - 请求的优先级。   
`IN trans_id` - 转发请求的事务id 。  
`IN pi` - 转发请求的pid 。  
**返回值：**    
无  

##### return_async
```java
void return_async(string name, 
                          String pattern, 
                          byte[] response_info, 
                          byte[] response,
                          Integer timeout, 
                          byte[] trans_id, 
                          DacPid pid)
```
异步响应请求回复，该函数执行完毕后会抛出ReturnAsyncException异常，应用程序不可捕获它，该异常必须得由SDK捕获，否则会报错。所以可以在回调函数的最后一行调用该方法。  
**参数：**     
`IN name` - 服务名，与回调函数的参数保持一致。  
`IN request_info` - 请求的元数据。  
`IN request` - 请求内容。  
`IN timeout` - 请求的阻塞时间。  
`IN priority` - 请求的优先级。  
`IN trans_id` 转发请求的事务id 。  
`IN pi`  转发请求的pid 。  
**返回值：**    
无

##### return_sync
```java
void return_sync(string name, 
                        String pattern, 
                        byte[] response_info, 
                        byte[] response,
                        Integer timeout, 
                        byte[] trans_id, 
                        DacPid pid)
```  
同步响应请求回复，该函数执行完毕后会抛出ReturnAsyncException异常，应用程序不可捕获它，该异常必须得由SDK捕获，否则会报错。所以可以在回调函数的最后一行调用该方法。  
**参数：**     
`IN name` - 服务名，与回调函数的参数保持一致。  
`IN request_info` - 请求的元数据。  
`IN request` - 请求内容。  
`IN timeout` - 请求的阻塞时间。  
`IN priority` - 请求的优先级。  
`IN trans_id` - 转发请求的事务id 。  
`IN pi` - 转发请求的pid 。  
**返回值：**    
无

##### info_key_value_parse
```java
HashMap< String, List< String >> info_key_value_parse(byte[] info)
```
对于http get 请求，其携带的参数会被转成一个byte数组，developers可以调用该函数来转成对应的< key, value>的结构，value为string list  。  
**参数：**     
`IN info` - byte[]类型的数据。  
**返回值：**  
`HashMap< String, List< String>>`类型的转换值。  


**NOTE**:  
1. callback函数返回值为object类型，如果不调用forward_async或forward_sync或return_，必须要返回数据，否则会产生NULL异常。SDK会检查callback的返回值，然后返回给服务请求者。检查类型为如下三种：   
  - byte[]: SDK将其作为response的内容，response_info为空string ；  
  - byte[2][]: SDK把byte[0]作为response_info, byte[1]作为response的内容；     
  - 其他: SDK对其进行string处理然后作为response的内容返回给服务请求者。  
如果返回内容为空字符串，SDK不会回复服务请求者。所以建议返回格式为{"ok","error"}这种格式。 如果是http请求，返回类型不能是byte[2][]  。  
2. response的对象主要由transid,response_info,response内容构成。  

## Response 类

Response 类是API类的内部类，developers一般通过它来获取请求内容

### 包
API 类在`com.dasudian.cloud.API`包中。    

### 属性
请参见相关方法。  

### 方法

##### Response
```java
Response(byte[] info, byte[] resp, byte[] trans_id)
```
构造函数，初始化一个Response对象。  
**参数：**     
`IN info` - 返回数据的元数据。  
`IN resp` - 返回内容。  
`IN trans_id` - 会话id 。  

##### isEmpty
```java
boolean isEmpty()
```
检查response是否为空，空返回true ，否则false 。  
**返回值：**  
 boolean类型。  

##### getResponse
```java
string getResponse()
```
获取response内容。  
**返回值：**  
返回response内容。  

##### getResponseInfo
```java
string getResponseInfo()
```  
获取responseInfo内容。   
**返回值：**   
返回responseInfo内容。  

##### getTransId
```java
string getTransId()
```  
获取TransId内容。  
**返回值：**   
返回获取TransId内容。  

##### toString
```java
string toString()
```
把response对象转化为string 类型，其转化后的格式如(responseInfo,response,transId) 。  
**返回值：**  
String 化Response对象。  


## Dsd_log 类

DSD dac cloud api 提供了简单易用的日志记录类`Dsd_log`，支持日志按级别输出，日志级别共有Debug, Info, Warn, Error, Fatal 。  

### 包
Dsd_log 类在`com.dasudian.cloud`包中。   

### 属性
请参见相关方法。  

### 方法

##### getlog
```java
Dsd_log getLog()
```
返回一个Dsd_log的实例，该方法是一个类方法。  
**返回值：**   
返回一个Dsd_log类。  

##### set_level
```java
void set_level(string level)
```
设置日志记录级别，必须是DEBUG，INFO, WARN, ERROR, ALL, FATAL, OFF这些关键字，否则会抛出DsdException异常。  
**参数：** 
`IN level` - 日志级别，必须是DEBUG，INFO, WARN, ERROR, ALL, FATAL, OFF这些关键字 ，否则会抛出DsdException异常。  

##### get_level
```java
string get_level()
```
获取日志级别。  
**返回值：**   
返回当前日志的打印级别。  

##### info
```java
void info(Object message)
```  
打印日志message，级别为info 。  
**参数：** 
`IN message` - 打印日志内容。  

##### debug
```java
void debug(Object message)
```
打印日志message，级别为debug 。  
**参数：**   
`IN message` - 打印日志内容。  

##### warn
```java
void warn(Object message)
```
打印日志message，级别为warn 。  
**参数：** 
`IN message` - 打印日志内容。  

##### error
```java
void error(Object message)
```  
打印日志message，级别为error  。  
**参数：** 
`IN message` - 打印日志内容。  

##### fatal
```java
void fatal(Object message)
```
打印日志message，级别为fatal 。  
**参数：** 
`IN message` - 打印日志内容。  


## Dsd_memcached 类

DSD dac cloud api 提供了访问memcacahed数据库的方法。

### 包
Dsd_memcached 类在 `com.dasudian.cloud` 包中。   

### 属性
请参见相关方法。  

### 方法

##### Dsd_memcached
```java
Dsd_memcached(API m)
```
构造函数，实例化Dsd_memcached类，必须传入一个API实例。  
**参数：** 
`IN API m` - 实例化Dsd_memcached类所需要的API 实例。  

##### get_key
```java
byte[] get_key(final String serv_name, 
                      final String key)
```  
访问服务名为serv_name的memcached 服务，请求key的值，返回一个byte数组，developers可以将其转成string ,或其他类型，这根据value的类型而定。如果没有该key或查询失败,返回null 。  
**参数：** 
`IN serv_name` - memcached服务名。  
`IN key` - 查询的key名。  
**返回值：**   
返回key的值，格式为byte数组，如果没有该key或查询失败，返回null 。  

##### add_key
```java
int add_key(final String serv_name, 
                  final String key, 
                  final String value)
```  
向数据库serv_name添加一个key, 值为value, 成功返回0，失败返回非0  。  
**参数：** 
`IN serv_name` - memcached 服务名。  
`IN key` - key名。  
`IN value` - key 的值。  
**返回值：**   
成功：返回0；失败：返回 -1 。  

##### add_key_expiredTime
```java
int add_key_expiredTime(final String serv_name, 
                                      final String key, 
                                      final String value, 
                                      final int time)
```  
向数据库serv_name添加一个key, 值为value, 该key的生成周期为time 秒, 成功返回0，失败返回非0  。  
**参数：** 
`IN serv_name` - memcached 服务名。  
`IN key` - key名。  
`IN value` - key 的值。  
`IN time` - key的生成周期，单位为秒。  
**返回值：**   
成功：返回0；失败：返回 -1 。  

##### increment_key
```java
int increment_key(final String serv_name, 
                          final String key, 
                          final int inc)
```  
请求数据库serv_name，修改key的值，在原来的基础上增加inc，成功返回0，失败非0 。  
**参数：** 
`IN serv_name` - memcached 服务名。  
`IN key` - key名。  
`IN inc` -  增加量。  
**返回值：**   
成功返回0，失败返回非0 。  

##### decrement_key
```java
int decrement_key(final String serv_name, 
                            final String key, 
                            final int dec)
```
请求数据库serv_name，修改key的值，在原来的基础上减小dec，成功返回0，失败非0 。  
**参数：** 
`IN serv_name` - memcached 服务名。  
`IN key` - key名。  
`IN dec` - 减小量。  
**返回值：**   
成功返回0，失败返回非0 。  

##### set_key
```java
int set_key(final String serv_name, 
                final String key, 
                final String value)
```
请求数据库serv_name，设置key的值为value。  
**参数：** 
`IN serv_name` - memcached 服务名。  
`IN key` - key名。  
`IN value` - 待修改的值。  
**返回值：**   
成功返回0，失败返回非0 。  

##### set_key_expiredTime
```java
int set_key_expiredTime(final String serv_name, 
                                    final String key, 
                                    final String value, 
                                    final int time)
```  
请求数据库serv_name，设置key的值为value，生成周期为time 。  
**参数：** 
`IN serv_name` - memcached 服务名。  
`IN key` - key名。  
`IN value` - 待修改的值。  
`IN time` - key的生存周期，单位为秒。  
**返回值：**   
成功返回0，失败返回非0 。  

##### delete_key
```java
int delete_key(final String serv_name, 
                    final String key)
```  
请求数据库serv_name，删掉key 。  
**参数：** 
`IN serv_name` - memcached 服务名。  
`IN key` - key名。  
**返回值：**   
成功返回0，失败非0 。  

##### replace_key
```java
int replace_key(final String serv_name, 
                      final String key, 
                      final String value)
```  
请求数据库serv_name，替换key的值为value 。  
**参数：** 
`IN serv_name` - memcached 服务名。  
`IN key` - key名。  
`IN value` - 待修改的值。  
**返回值：**   
成功返回0，失败返回非0 。  

##### append_key
```java
int append_key(final String serv_name, 
                      final String key, 
                      final String value)
```  
请求数据库serv_name, 修改key的值，添加一个后缀value 。  
**参数：** 
`IN serv_name` - memcached 服务名。  
`IN key` - key名。  
`IN value` - 添加的后缀。  
**返回值：**   
成功返回0，失败返回非0 。  

##### prepend_key
```java
int prepend_key(final String serv_name, 
                        final String key, 
                        final String value)
```   
请求数据库serv_name, 修改key的值，添加一个前缀value 。  
**参数：** 
`IN serv_name` - memcached 服务名。  
`IN key` - key名。  
`IN value` - 添加的 前缀。  
**返回值：**   
成功返回0，失败返回非0 。  

##### get_version
```java
String get_version(final String serv_name)
```  
请求数据库serv_name的版本号。  
**参数：** 
`IN serv_name` - memcached 服务名。  
**返回值：**   
返回数据的版本号，请求失败返回null 。  

##### flush
```java
int flush(final String serv_name)
```  
请求数据库serv_name，清空所有的key 。  
**参数：** 
`IN serv_name` - memcached 服务名。  
**返回值：**   
成功返回0，失败返回非0 。  


## Dsd_dsdb类

DSD dac cloud api 提供了访问dsdb数据库的方法。

### 包

Dsd_dsdb 类在 `com.dasudian.cloud` 包中 。  

### 属性
请参见相关方法。  

### 方法

##### Dsd_dsdb
```java
Dsd_dsdb(API m)
```
构造函数，实例化Dsd_dsdb类，必须传入一个API实例。  
**参数：** 
 `IN API m` - 实例化Dsd_dsdb类所需要的API 实例。  

##### get_result
```java
List< string> get_result()
```  
获取查询请求的结果，返回内容为一个`List< string >`类型。  
**返回值：**   
dsdb查询请求的结果，`List< string>`类型。  

##### get_result_length
```java
int get_result_length()
```  
dsdb查询请求的返回结果为`List< string>`类型，该函数返回list中元素个数。  
**返回值：**   
查询结果string的个数。  

##### get_next_page_id
```java
String get_next_page_id()
```
dsdb支持分页查询，分页查询返回的结果携带查询下一页请求的索引，developer调用该方法来获取查询下页的索引。  
**返回值：**   
查询下页的索引字符串。  

##### put
```java
int put(String database, 
          String key, 
          String value)
```  
向数据库database添加一个值为value的key，成功返回0，失败返回非0 。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 待添加的key 。  
`IN value` - 添加的值。  
**返回值：**   
成功返回0，失败返回非0 。  

##### get
```java
int get(String database, 
          String key, 
          String value)
```  
向数据库database添加一个值为value的key，成功返回0，失败返回非0，developers调用get_result方法获取查询结果。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 待添加的key 。  
**返回值：**   
成功返回0，失败返回非0 。   

##### delete
```java
int delete(String database, 
              String key)
```
删除database中key 。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 待删除的key 。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search
```java
int search(String database, 
              String key, 
              float value)
```  
请求database数据库，搜索内容符合key=value的所有记录，返回记录的列表，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN value` - 关键字内容。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search
```java
int search(String database, 
              String key, 
              String value)
```  
请求database数据库，搜索内容符合key=value的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN value` - 关键字内容。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_range
```java
int search_range(String database, 
                        String key, 
                        String start, 
                        String end)
```  
请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字。   
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN start` - 最小值。  
`IN end`  - 最大值。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_range
```java
int search_range(String database, 
                        String key, 
                        float start, 
                        float end)
```  
请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN start` - 最小值。  
`IN end` - 最大值。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_pagination
```java
int search_pagination(String database, 
                              String key, 
                              String value, 
                              String next_page_id , 
                              int num_per_page)
```  
请求database数据库，分页搜索内容符合关键字key=value所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN value` - 关键字内容。  
`IN next_page_id` - 查询下页的索引，如果为空或null，则是查询首页。  
`IN num_per_page` - 每页的返回数据条数。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_pagination
```java
int int search_pagination(String database, 
                                    String key, 
                                    float value, 
                                    String next_page_id , 
                                    int num_per_page)
```  
请求database数据库，分页搜索内容符合关键字key=value所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN value` - 关键字内容。  
`IN next_page_id` - 查询下页的索引，如果为空或null，则是查询首页。  
`IN num_per_page` - 每页的返回数据条数。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_range_pagination
```java
int search_range_pagination(String database, 
                                        String key, 
                                        String start, 
                                        String end, 
                                        String next_page_id , 
                                        int num_per_page)
```  
请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN start` - 最小值。  
`IN end` - 最大值。  
`IN next_page_id` - 查询下页的索引，如果为空或null，则是查询首页。  
`IN num_per_page` - 每页的返回数据条数。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_range_pagination
```java
int search_range_pagination(String database, 
                                        String key, 
                                        float start, 
                                        float end, 
                                        String next_page_id , 
                                        int num_per_page)
```  
请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN start` - 最小值。  
`IN end` - 最大值。  
`IN next_page_id` - 查询下页的索引，如果为空或null，则是查询首页。  
`IN num_per_page` - 每页的返回数据条数。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_value
```java
int search_value(String database, 
                        String key, 
                        String value)
```  
请求database数据库，搜索内容符合key=value的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容。  
**参数：**  
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN value` - 关键字内容。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_value
```java
int search_value(String database, 
                        String key, 
                        float value)
```
请求database数据库，搜索内容符合key=value的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN value` - 关键字内容。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_value_range
```java
int search_value_range(String database, 
                                  String key, 
                                  String start, 
                                  String end)
```
请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN start` - 最小值。  
`IN end` - 最大值。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_value_range
```java
int search_value_range(String database, 
                                  String key, 
                                  float start, 
                                  float end)
```
请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN start` - 最小值。  
`IN end` - 最大值。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_value_pagination
```java
int int search_value_pagination(String database, 
                                              String key, 
                                              float value, 
                                              String next_page_id , 
                                              int num_per_page)
```
请求database数据库，分页搜索内容符合关键字key=value所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN value` - 关键字内容。  
`IN next_page_id` - 查询下页的索引，如果为空或null，则是查询首页。  
`IN num_per_page` - 每页的返回数据条数。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_value_pagination
```java
int int search_value_pagination(String database, 
                                              String key, 
                                              String value, 
                                              String next_page_id , 
                                              int num_per_page)
```
请求database数据库，分页搜索内容符合关键字key=value所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN value` - 关键字内容。  
`IN next_page_id` - 查询下页的索引，如果为空或null，则是查询首页。  
`IN num_per_page` - 每页的返回数据条数。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_value_range_pagination
```java
int search_value_range_pagination(String database, 
                                                  String key, 
                                                  float start, 
                                                  float end, 
                                                  String next_page_id , 
                                                  int num_per_page)
```
请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN start` - 最小值。  
`IN end` - 最大值。  
`IN next_page_id` - 查询下页的索引，如果为空或null，则是查询首页。  
`IN num_per_page` - 每页的返回数据条数。  
**返回值：**   
成功返回0，失败返回非0。  

##### search_value_range_pagination
```java
int search_value_range_pagination(String database, 
                                                  String key, 
                                                  String start, 
                                                  String end, 
                                                  String next_page_id , 
                                                  int num_per_page)
```  
请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN key` - 搜索关键字。  
`IN start` - 最小值。  
`IN end` - 最大值。  
`IN next_page_id` - 查询下页的索引，如果为空或null，则是查询首页。  
`IN num_per_page` - 每页的返回数据条数。  
**返回值：**   
成功返回0，失败返回非0 。  

##### list_all
```java
int list_all(String database)
```  
请求database数据库，列出所有的key，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的名字。  
**参数：** 
`IN database` - 请求的数据库。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_or
```java
int search_or(String database, Dsdb_search_cond conds)
```  
请求database数据库，搜索内容符合conds中任何一个条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项。  
**参数：** 
`IN database` - 请求的数据库。  
`IN conds` - 查询条件列表。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_and
```java
int search_and(String database, 
                      Dsdb_search_cond conds)
```  
请求database数据库，搜索内容符合conds中所有条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项。  
**参数：** 
`IN database` - 请求的数据库。  
`IN conds` - 查询条件列表。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_or_pagination
```java
int search_or_pagination(String database, 
                                    Dsdb_search_cond conds, 
                                    String next_pag, 
                                    int num_per_page)
```  
请求database数据库，分页搜索内容符合conds中任何一个条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN conds` - 查询条件列表。  
`IN next_pag` - 分页查询索引。   
`IN num_per_page` - 每页返回的数据个数。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_and_pagination
```java
int search_and_pagination(String database, 
                                        Dsdb_search_cond conds, 
                                        String next_pag, 
                                        int num_per_page)
```  
请求database数据库，分页搜索内容符合conds中所有条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项，调用get_next_page_id获取下页的查询索引
**参数：** 
`IN database` - 请求的数据库。  
`IN conds` - 查询条件列表。 
`IN next_pag` - 分页查询索引。  
`IN num_per_page` - 每页返回的数据个数。  
**返回值：**   
成功返回0，失败返回非0 。   

##### search_value_or
```java
int search_value_or(String database, 
                              Dsdb_search_cond conds)
```  
请求database数据库，搜索内容符合conds中任何一个条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容。  
**参数：** 
`IN database` - 请求的数据库。  
`IN conds` - 查询条件列表。  
**返回值：**   
成功返回0，失败返回非0  。  

##### search_value_and
```java
int search_value_and(String database, 
                                Dsdb_search_cond conds)
```  
请求database数据库，搜索内容符合conds中所有条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容。  
**参数：** 
`IN database` - 请求的数据库。  
`IN conds` - 查询条件列表。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_value_or_pagination
```java
int search_value_or_pagination(String database, 
                                                Dsdb_search_cond conds, 
                                                String next_pag, 
                                                int num_per_page)
```  
请求database数据库，分页搜索内容符合conds中任何一个条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN conds` - 查询条件列表。  
`IN next_pag` - 分页查询索引。  
`IN num_per_page` - 每页返回的数据个数。  
**返回值：**   
成功返回0，失败返回非0 。  

##### search_value_and_pagination
```java
int search_value_and_pagination(String database, 
                                                  Dsdb_search_cond conds, 
                                                  String next_pag, 
                                                  int num_per_page)
```  
请求database数据库，分页搜索内容符合conds中所有条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容，调用get_next_page_id获取下页的查询索引。  
**参数：** 
`IN database` - 请求的数据库。  
`IN conds` - 查询条件列表。  
`IN next_pag` - 分页查询索引。  
`IN num_per_page` - 每页返回的数据个数。  
**返回值：**   
成功返回0，失败返回非0 。  


## Dsd_search_cond 类

DSD_search_cond是Dsd_dsdb的内部类，方便developers按条件查询dsdb数据库

### 包
Dsd_search_cond 类在`com.dasudian.cloud.Dsd_dsdb`包中。   

### 属性
请参见相关方法

### 方法

##### Dsdb_search_cond
```java
Dsdb_search_cond()
```  
构造函数，初始化一个Dsdb_search_cond的实例。  

##### insert
```java
void insert(String key , String value)
```  
插入一个key=value的查询条件。  
**参数：** 
`IN key` - 搜索条件的关键字key 。  
`IN  value` - 关键字的内容。  

##### insert
```java
void insert(String key , int value)
```  
插入一个key=value的查询条件。  
**参数：** 
`IN key` - 搜索条件的关键字key 。  
`IN  value` - 关键字的内容。  

##### insert
```java
void insert(String key , String start, String end)
```  
插入一个key的值在[start, end]之间的条件。  
**参数：** 
`IN key` - 搜索条件的关键字key 。  
`IN  start` - 最小值。  
`IN end` - 最大值。  

##### insert
```java
void insert(String key , String start, String end)
```  
插入一个key的值在[start, end]之间的条件。  
**参数：** 
`IN key` - 搜索条件的关键字key 。  
`IN  start` - 最小值。  
`IN end` - 最大值。  


## Dsd_redis 类

Dsd dac cloud api 提供了简单的访问redis数据库的方法。

### 包

Dsd_redis 类在`com.dasudian.cloud`包中 。  

### 属性
请参见相关方法。  

### 方法

##### Dsd_redis
```java
Dsd_redis(API m)
```  
构造函数，实例化Dsd_redis类，必须传入一个API实例。  
**参数：** 
`IN API m` - 实例化Dsd_redis类所需要的API 实例。  

##### execute
```java
byte[] execute(final String serv_name, final String cmd)
```  
请求redis数据库serv_name,执行cmd命令。  
**参数：** 
`IN serv_name` - 数据库。  
`IN cmd` - 待执行的命令。  
**返回值：**   
返回byte数组格式的返回结果。 

##### execute_transaction
```java
byte[] execute_transaction(final String serv_name, 
                                        @SuppressWarnings("String") final List<String> cmds)`
```  
请求redis数据库serv_name, 以事务的方式执行cmds命令列表。  
**参数：** 
`IN serv_name` - 数据库。  
`IN cmd` - 待执行的命令列表。  
**返回值：**   
返回byte数组格式的返回结果。 
