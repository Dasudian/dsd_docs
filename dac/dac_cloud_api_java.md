---
title: DAC Java API
currentMenu: dac-java-api
---

DSD DAC_CLOUD API 指导手册   
===================   
   
引言   
-------------   
 DSD DAC_CLOUD API提供了功能丰富但使用简单的服务器开发的JAVA API，该API极大的降低了服务器开发与维护难度，降低开发成本，缩短开发周期。用户无需关注服务器的负载均衡性能等问题，只需关注简单的业务逻辑，如同开发简单的单机应用，就可以实现丰富的服务器应用。  
安装环境   
-------------   
 安装环境就是编译环境，目前只支持Ubuntu 14.06和Ubuntu 14.10。   
 
编译方法   
-------------   
 1.下载SDK jar包到指定目录   
 2.在工程中以外部链接库的方式导入该jar包，Eclipse中方法如下:打开工程的properties -> 选择java build path ->选择Add external JARs   
 3.生成jar时，添加外部的manifest.mf文件，在manifest.mf中添加如下Class-Path: /usr/local/lib/dac-1.0.0/api/java/dasudian.jar
 
## API 类##
API 类是该sdk的主要类，developers调用该类与erlang虚拟机交互，处理http请求或其他服务请求。

###Package###
API 类在com.dasudian.cloud中

###属性###
1. ASYNC : static final int类型，值为1，标示异步请求类型
2. SYNC : static final int类型，值为-1，标示同步请求类型

###方法###
1.  int thread_count() 
        **描述：**   
        获取服务系统支持的与erlang虚拟机交互的最大线程数  
        **参数：**  
        **返回值：**   
        返回系统支持的最大线程数   
2.   API(int index)  
        **描述：**   
        API构造函数    
        **参数：**   
        index:与erlang虚拟机交互的线程索引，不能超过thread_count的返回值
        **返回值：**   
        返回当前的API实例   
           
3. void subscribe(final String pattern,
                          final Object instance,
                          final String methodName)   
        **描述：**   
        订阅一个服务，服务由服务名和服务前缀唯一标示   
        **参数：**   
         IN   pattern：服务名。服务id由服务前缀和服务名来唯一标示，服务前缀是包含该服务的应用上传时确定的。具体格式为/prefix/pattern，对于http服务，get和post服务是分开的，格式如name/get 或者name/post   
        IN   instance：服务的回调函数的执行对象   
        IN   methodname 回调函数名。当收到该服务后，SDK会回调该方法。
        **返回值：**   
 
4.  Response send_sync(String name, byte[] request)   
**描述：**   
    发送同步请求给服务名为name的服务,其他参数为默认值   
**参数：**     
IN name  : 请求的服务名  
IN response : 请求的内容  
**返回值：**   
      返回一个Response对象    
         
5.  Response send_sync(String name, byte[] request_info, byte[] request,
                              Integer timeout, Byte priority)   
**描述：**   
    发送同步请求给服务名为name的服务   
**参数：**     
IN name  : 请求的服务名  
IN request_info 请求的metedata数据    
IN response : 请求的内容  
IN timeout :阻塞时间     
IN priority :请求的优先级
**返回值：**   
      返回一个Response对象
      
6. TransId send_async(String name, byte[] request)   
**描述：**   
    异步请求服务名为name的服务，其他参数为默认值
**参数：**     
IN name  : 请求的服务名  
IN response : 请求的内容  
**返回值：**   
      返回一个TransId对象，表示该次请求的会话id     

7. TransId send_async(tring name, byte[] request_info, byte[] request,
                              Integer timeout, Byte priority)   
**描述：**   
    异步请求服务名为name的服务   
**参数：**     
IN name  : 请求的服务名  
IN request_info 请求的metedata数据    
IN response : 请求的内容  
IN timeout   :阻塞时间     
IN priority : 请求的优先级  
**返回值：**   
      返回一个TransId对象，表示该次请求的会话id   
   
8. Response recv_async();   
**描述：**   
    获取最后一次请求transid的返回内容,阻塞时间为默认值  
**参数：**     
**返回值：**   
      返回一个Response对象   
   
9. Response recv_async(Integer timeout);   
**描述：**   
    获取最后一个transid的返回内容,阻塞timeout 毫秒数  
**参数：**     
    IN timeout 方法的阻塞时间  
**返回值：**   
      返回一个Response对象   
   
10. Response recv_async(byte[] trans_id);   
**描述：**   
    获取会话trans_id的返回内容  
**参数：**     
    IN trans_id；会话id  
**返回值：**   
      返回一个Response对象   
   
11. Response recv_async(Integer timeout, byte[] trans_id);   
**描述：**   
    获取会话trans_id的返回内容 ，阻塞时间为timeout  
**参数：**     
    IN trans_id；会话id  
    IN timeout 阻塞时间，单位为ms
**返回值：**   
      返回一个Response对象   
   
12. List< TransId > publish(String name, byte[] request)   
**描述：**   
    向服务名为name的所有服务发布请求  
**参数：**     
    IN name  服务名，可以为正则表达式  
    IN request 请求内容
**返回值：**   
      返回一个TransId列表    

13. List< TransId > publish(String name,
                                     byte[] request_info, byte[] request,
                                     Integer timeout, Byte priority)   
**描述：**   
    向服务名为name的所有服务发布请求  
**参数：**     
    IN name  服务名，可以为正则表达式  
    IN request 请求内容
    IN request_info 请求的metedata数据
    IN timeout ： publish的阻塞时间
    IN priority : 服务请求的优先级
**返回值：**   
      返回一个TransId列表  
          
14. void forward_async(String name, byte[] request_info, byte[] request,
                              Integer timeout, Byte priority,
                              byte[] trans_id, DacPid pid)   
**描述：**   
    异步转发请求给服务名为name的服务,执行完毕后抛出一个SDK必须要获取的ForwardAsyncException异常，应用程序必须将其抛出，否则会报错。即之后的代码 不会执行。目的服务执行完会直接回复请求 
**参数：**     
    IN name  目的服务名，可以为正则表达式  
    IN request_info 请求的元数据    
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pi  转发请求的pid 
**返回值：**   
         
   
15. void forward_sync(String name, byte[] request_info, byte[] request,
                              Integer timeout, Byte priority,
                              byte[] trans_id, DacPid pid)   
**描述：**   
    同步转发外界请求给服务名为name的服务,执行完毕后抛出一个SDK必须要获取的ForwardsyncException异常，应用程序必须将其抛出，否则会报错。即之后的代码 不会执行。目的服务执行完后会回复请求  
**参数：**     
    IN name  目的服务名，可以为正则表达式  
    IN request_info 请求的元数据    
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pi  转发请求的pid 
**返回值：**   
      

16. void poll(int timeout)   
**描述：**   
    轮询是否有请求到达  
**参数：**     
    IN timeout  轮询周期，单位ms,如果设置为-1,表示永久阻塞直到有请求到来  
**返回值：**    

17. void return_(Integer command,
                        String name, String pattern,
                        byte[] response_info, byte[] response,
                        Integer timeout, byte[] trans_id, DacPid pid)   
**描述：**   
    响应请求回复，该函数执行完毕后会抛出ReturnAsyncException或ReturnSyncException异常，应用程序不可捕获它，该异常必须得由SDK捕获，否则会报错。所以可以在回调函数的最后一行返回。  
**参数：**     
    Integer command 回复类型，API.ASYNC：异步回复；API.SYNC:同步回复，必须与回调函数的参数保持一致
    IN name  服务名，与回调函数的参数保持一致  
    IN request_info 请求的元数据    
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pi  转发请求的pid 
**返回值：**    

18. void return_async(string name, String pattern, byte[] response_info, byte[] response,
                        Integer timeout, byte[] trans_id, DacPid pid)   
**描述：**   
    异步响应请求回复，该函数执行完毕后会抛出ReturnAsyncException异常，应用程序不可捕获它，该异常必须得由SDK捕获，否则会报错。所以可以在回调函数的最后一行调用该方法。  
**参数：**     
    IN name  服务名，与回调函数的参数保持一致  
    IN request_info 请求的元数据    
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pi  转发请求的pid 
**返回值：**    

19. void return_sync(string name, String pattern, byte[] response_info, byte[] response,
                        Integer timeout, byte[] trans_id, DacPid pid)   
**描述：**   
    同步响应请求回复，该函数执行完毕后会抛出ReturnAsyncException异常，应用程序不可捕获它，该异常必须得由SDK捕获，否则会报错。所以可以在回调函数的最后一行调用该方法。  
**参数：**     
    IN name  服务名，与回调函数的参数保持一致  
    IN request_info 请求的元数据    
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pi  转发请求的pid 
**返回值：**    

20. HashMap< String, List< String >> info_key_value_parse(byte[] info)    
**描述：**   
   对于http get 请求，其携带的参数会被转成一个byte数组，developers可以调用该函数来转成对应的< key, value>的结构，value为string list  
**参数：**     
    IN info: byte[]类型的数据
**返回值：** HashMap< String, List< String>>类型的转换值    


###NOTE###
 1. callback函数返回值为object类型，如果不调用forward_async或forward_sync或return_，必须要返回数据，否则会产生NULL异常。SDK会检查callback的返回值，然后返回给服务请求者。检查类型为如下三种：
byte[]: SDK将其作为response的内容，response_info为空string，
byte[2][]: SDK把byte[0]作为response_info, byte[1]作为response的内容
其他: SDK对其进行string处理然后作为response的内容返回给服务请求者。
如果返回内容为空字符串，SDK不会回复服务请求者。所以建议返回格式为{"ok","error"}这种格式。如果是http请求，返回类型不能是byte[2][]     
     
 2. response的对象主要由transid,response_info,response内容构成。

## Response 类##
Response 类是API类的内部类，developers一般通过它来获取请求内容

###Package###
API 类在com.dasudian.cloud.API中 

###属性###
请参见相关方法

###方法###
1. Response(byte[] info, byte[] resp, byte[] trans_id) 
**描述：**   
   初始化一个response对象  
**参数：**     
    IN info 返回数据的元数据
    IN resp 返回内容    
    IN trans_id 会话id    
    
2. boolean isEmpty() 
**描述：**   
  检查response是否为空，空返回true ，否则false
**参数：**    
**返回值：**
 boolean类型   
 
3. string getResponse() 
**描述：**   
  获取response内容
**参数：**    
**返回值：**
 返回response内容  

4. string getResponseInfo() 
**描述：**   
  获取responseInfo内容
**参数：**    
**返回值：**
 返回responseInfo内容  

5. string getTransId() 
**描述：**   
  获取TransId内容
**参数：**    
**返回值：**
 返回获取TransId内容 

6. string toString() 
**描述：**   
  把response对象转化为string 类型，其转化后的格式如(responseInfo,response,transId)
**参数：**    
**返回值：**
 string 化response对象

## Dsd_log 类##
DSD dac cloud api 提供了简单易用的日志记录类Dsd_log，支持日志按级别输出，日志级别共有Debug, Info, Warn, Error, Fatal

###Package###
Dsd_log 类在com.dasudian.cloud中 

###属性###
请参见相关方法

###方法###
1. Dsd_log getLog();   
**描述：**   
    返回一个Dsd_log的实例，该方法是一个类方法  
**参数：**     
**返回值：**   
      返回一个Dsd_log类    

2. void set_level(string level);   
**描述：**   
    设置日志记录级别，必须是DEBUG，INFO, WARN, ERROR, ALL, FATAL, OFF这些关键字，否则会抛出DsdException异常  
**参数：** 
  IN level : 日志级别，必须是DEBUG，INFO, WARN, ERROR, ALL, FATAL, OFF这些关键字 ，否则会抛出DsdException异常     
**返回值：**  

3. string get_level()
**描述：**   
    获取日志级别  
**参数：**     
**返回值：**   
      返回当前日志的打印级别    

4. void info(Object message)
**描述：**   
    打印日志message，级别为info  
**参数：** 
   IN message: 打印日志内容    
**返回值：**   
      无    

5. void debug(Object message)
**描述：**   
    打印日志message，级别为debug  
**参数：** 
   IN message: 打印日志内容    
**返回值：**   
      无     

6. void warn(Object message)
**描述：**   
    打印日志message，级别为warn  
**参数：** 
   IN message: 打印日志内容    
**返回值：**   
      无     

7. void error(Object message)
**描述：**   
    打印日志message，级别为error  
**参数：** 
   IN message: 打印日志内容    
**返回值：**   
      无    

8. void fatal(Object message)
**描述：**   
    打印日志message，级别为fatal  
**参数：** 
   IN message: 打印日志内容    
**返回值：**   
      无 


## Dsd_memcached 类##
DSD dac cloud api 提供了访问memcacahed数据库的方法。

###Package###
API 类在com.dasudian.cloud中 

###属性###
请参见相关方法

###方法###

1.  Dsd_memcached(API m)   
**描述：**   
    实例化Dsd_memcached类，必须传入一个API实例 
**参数：** 
IN API m : 实例化Dsd_memcached类所需要的API 实例    
**返回值：**   
     无   

2.  byte[] get_key(final String serv_name, final String key)  
**描述：**   
   访问服务名为serv_name的memcached 服务，请求key的值，返回一个byte数组，developers可以将其转成string ,或其他类型，这根据value的类型而定。如果没有该key或查询失败,返回null
**参数：** 
IN serv_name: memcached服务名
IN key: 查询的key名    
**返回值：**   
     返回key的值，格式为byte数组，如果没有该key或查询失败，返回null   

3.  int add_key(final String serv_name, final String key, final String value) 
**描述：**   
    向数据库serv_name添加一个key, 值为value, 成功返回0，失败返回非0 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value ： key 的值   
**返回值：**   
     成功：返回0；失败：返回 -1    

4. int add_key_expiredTime(final String serv_name, final String key, final String value, final int time)   
**描述：**   
    向数据库serv_name添加一个key, 值为value, 该key的生成周期为time 秒, 成功返回0，失败返回非0 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value ： key 的值
IN time : key的生成周期，单位为秒    
**返回值：**   
     成功：返回0；失败：返回 -1     

5.  int increment_key(final String serv_name, final String key, final int inc)   
**描述：**   
    请求数据库serv_name，修改key的值，在原来的基础上增加inc，成功返回0，失败非0
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN inc ： 增加量    
**返回值：**   
     成功返回0，失败返回非0    

6.  int decrement_key(final String serv_name, final String key, final int dec) 
**描述：**   
    请求数据库serv_name，修改key的值，在原来的基础上减小dec，成功返回0，失败非0 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN dec ： 减小量   
**返回值：**   
     成功返回0，失败返回非0    

7.  int set_key(final String serv_name, final String key, final String value) 
**描述：**   
    请求数据库serv_name，设置key的值为value 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value： 待修改的值     
**返回值：**   
     成功返回0，失败返回非0    

8.  set_key_expiredTime(final String serv_name, final String key, final String value, final int time)   
**描述：**   
   请求数据库serv_name，设置key的值为value，生成周期为time 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value： 待修改的值
IN time : key的生存周期，单位为秒    
**返回值：**   
     成功返回0，失败返回非0    

9. int delete_key(final String serv_name, final String key)
**描述：**   
   请求数据库serv_name，删掉key 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名   
**返回值：**   
     成功返回0，失败非0
         
10.  int replace_key(final String serv_name, final String key, final String value) 
**描述：**   
    请求数据库serv_name，替换key的值为value
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value： 待修改的值
**返回值：**   
     成功返回0，失败返回非0    

11.  int append_key(final String serv_name, final String key, final String value) 
**描述：**   
   请求数据库serv_name, 修改key的值，添加一个后缀value 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value： 添加的 后缀   
**返回值：**   
     成功返回0，失败返回非0    

12.  int prepend_key(final String serv_name, final String key, final String value) 
**描述：**   
   请求数据库serv_name, 修改key的值，添加一个前缀value 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value： 添加的 前缀   
**返回值：**   
     成功返回0，失败返回非0    

13.  String get_version(final String serv_name)
**描述：**   
   请求数据库serv_name的版本号
**参数：** 
IN serv_name: memcached 服务名
**返回值：**   
    返回数据的版本号，请求失败返回null     

14.  int flush(final String serv_name)
**描述：**   
   请求数据库serv_name，清空所有的key
**参数：** 
IN serv_name: memcached 服务名
**返回值：**   
    成功返回0，失败返回非0

## Dsd_dsdb类##
DSD dac cloud api 提供了访问dsdb数据库的方法。

###Package###
Dsd_dsdb 类在com.dasudian.cloud中 

###属性###
请参见相关方法

###方法###
1.  Dsd_dsdb(API m)
**描述：**   
    实例化Dsd_dsdb类，必须传入一个API实例 
**参数：** 
 IN API m : 实例化Dsd_dsdb类所需要的API 实例    
**返回值：**   
     无    
   
2. List< string> get_result()
**描述：**   
    获取查询请求的结果，返回内容为一个List< string >类型
**参数：**  
**返回值：**   
     dsdb查询请求的结果，List< string>类型

3. int get_result_length()
**描述：**   
    dsdb查询请求的返回结果为list< string>类型，该函数返回list中元素个数
**参数：**  
**返回值：**   
     查询结果string的个数   

4. string get_next_page_id()
**描述：**   
    dsdb支持分页查询，分页查询返回的结果携带查询下一页请求的索引，developer调用该方法来获取查询下页的索引
**参数：**  
**返回值：**   
     查询下页的索引字符串

5.  int put(String database, String key, String value)
**描述：**   
    向数据库database添加一个值为value的key，成功返回0，失败返回非0
**参数：** 
IN database: 请求的数据库
IN key: 待添加的key
IN value: 添加的值  
**返回值：**   
     成功返回0，失败返回非0  

6.  int get(String database, String key, String value)
**描述：**   
    向数据库database添加一个值为value的key，成功返回0，失败返回非0，developers调用get_result方法获取查询结果
**参数：** 
IN database: 请求的数据库
IN key: 待添加的key
**返回值：**   
     成功返回0，失败返回非0   

7. int delete(String database, String key)
**描述：**   
    删除database中key
**参数：** 
IN database: 请求的数据库
IN key: 待删除的key
**返回值：**   
     成功返回0，失败返回非0   

8. int search(String database, String key, float value)
**描述：**   
    请求database数据库，搜索内容符合key=value的所有记录，返回记录的列表，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
**返回值：**   
     成功返回0，失败返回非0   

9. int search(String database, String key, String value)
**描述：**   
    请求database数据库，搜索内容符合key=value的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
**返回值：**   
     成功返回0，失败返回非0  

10. int search_range(String database, String key, String start, String end)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
**返回值：**   
     成功返回0，失败返回非0

11. int search_range(String database, String key, float start, float end)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
**返回值：**   
     成功返回0，失败返回非0    

12. int search_pagination(String database, String key, String value, String next_page_id , int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合关键字key=value所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
IN next_page_id : 查询下页的索引，如果为空或null，则是查询首页
IN num_per_page: 每页的返回数据条数
**返回值：**   
     成功返回0，失败返回非0   

13. int int search_pagination(String database, String key, float value, String next_page_id , int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合关键字key=value所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
IN next_page_id : 查询下页的索引，如果为空或null，则是查询首页
IN num_per_page: 每页的返回数据条数
**返回值：**   
     成功返回0，失败返回非0   

14. int search_range_pagination(String database, String key, String start, String end, String next_page_id , int num_per_page)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
IN next_page_id : 查询下页的索引，如果为空或null，则是查询首页
IN num_per_page: 每页的返回数据条数
**返回值：**   
     成功返回0，失败返回非0   

15. int search_range_pagination(String database, String key, float start, float end, String next_page_id , int num_per_page)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
IN next_page_id : 查询下页的索引，如果为空或null，则是查询首页
IN num_per_page: 每页的返回数据条数
**返回值：**   
     成功返回0，失败返回非0   

16. int search_value(String database, String key, String value)
**描述：**   
    请求database数据库，搜索内容符合key=value的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
**返回值：**   
     成功返回0，失败返回非0    

17. int search_value(String database, String key, float value)
**描述：**   
    请求database数据库，搜索内容符合key=value的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
**返回值：**   
     成功返回0，失败返回非0    

18. int search_value_range(String database, String key, String start, String end)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
**返回值：**   
     成功返回0，失败返回非0   

19. int search_value_range(String database, String key, float start, float end)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
**返回值：**   
     成功返回0，失败返回非0   

20. int int search_value_pagination(String database, String key, float value, String next_page_id , int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合关键字key=value所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
IN next_page_id : 查询下页的索引，如果为空或null，则是查询首页
IN num_per_page: 每页的返回数据条数
**返回值：**   
     成功返回0，失败返回非0    

21. int int search_value_pagination(String database, String key, String value, String next_page_id , int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合关键字key=value所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
IN next_page_id : 查询下页的索引，如果为空或null，则是查询首页
IN num_per_page: 每页的返回数据条数
**返回值：**   
     成功返回0，失败返回非0   

22. int search_value_range_pagination(String database, String key, float start, float end, String next_page_id , int num_per_page)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
IN next_page_id : 查询下页的索引，如果为空或null，则是查询首页
IN num_per_page: 每页的返回数据条数
**返回值：**   
     成功返回0，失败返回非0    

23. int search_value_range_pagination(String database, String key, String start, String end, String next_page_id , int num_per_page)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，每页num_per_page个数据，next_page为分页查询索引，如果为null或空字符串，则是查询第一页的数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
IN next_page_id : 查询下页的索引，如果为空或null，则是查询首页
IN num_per_page: 每页的返回数据条数
**返回值：**   
     成功返回0，失败返回非0  

24. int list_all(String database)
**描述：**   
    请求database数据库，列出所有的key，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的名字
**参数：** 
IN database: 请求的数据库
**返回值：**   
     成功返回0，失败返回非0   

25. int search_or(String database, Dsdb_search_cond conds)
**描述：**   
    请求database数据库，搜索内容符合conds中任何一个条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
**返回值：**   
     成功返回0，失败返回非0  

26. int search_and(String database, Dsdb_search_cond conds)
**描述：**   
    请求database数据库，搜索内容符合conds中所有条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
**返回值：**   
     成功返回0，失败返回非0   

27. int search_or_pagination(String database, Dsdb_search_cond conds, String next_pag, int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合conds中任何一个条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
IN next_pag : 分页查询索引
IN num_per_page: 每页返回的数据个数
**返回值：**   
     成功返回0，失败返回非0   

28. int search_and_pagination(String database, Dsdb_search_cond conds, String next_pag, int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合conds中所有条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
IN next_pag : 分页查询索引
IN num_per_page: 每页返回的数据个数
**返回值：**   
     成功返回0，失败返回非0  

29. int search_value_or(String database, Dsdb_search_cond conds)
**描述：**   
    请求database数据库，搜索内容符合conds中任何一个条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
**返回值：**   
     成功返回0，失败返回非0  

30. int search_value_and(String database, Dsdb_search_cond conds)
**描述：**   
    请求database数据库，搜索内容符合conds中所有条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
**返回值：**   
     成功返回0，失败返回非0   

31. int search_value_or_pagination(String database, Dsdb_search_cond conds, String next_pag, int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合conds中任何一个条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
IN next_pag : 分页查询索引
IN num_per_page: 每页返回的数据个数
**返回值：**   
     成功返回0，失败返回非0   

32. int search_value_and_pagination(String database, Dsdb_search_cond conds, String next_pag, int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合conds中所有条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
IN next_pag : 分页查询索引
IN num_per_page: 每页返回的数据个数
**返回值：**   
     成功返回0，失败返回非0

## Dsd_search_cond 类##
DSD_search_cond是Dsd_dsdb的内部类，方便developers按条件查询dsdb数据库

###Package###
Dsd_search_cond 类在com.dasudian.cloud.Dsd_dsdb中 

###属性###
请参见相关方法

###方法###

1. Dsdb_search_cond()
**描述：**   
     初始化一个Dsdb_search_cond的实例
**参数：** 
**返回值：**     

2. void insert(String key , String value)
**描述：**   
     插入一个key=value的查询条件
**参数：** 
IN key : 搜索条件的关键字key
IN  value： 关键字的内容
**返回值：**   

3. void insert(String key , int value)
**描述：**   
     插入一个key=value的查询条件
**参数：** 
IN key : 搜索条件的关键字key
IN  value： 关键字的内容
**返回值：**    

4. void insert(String key , String start, String end)
**描述：**   
     插入一个key的值在[start, end]之间的条件
**参数：** 
IN key : 搜索条件的关键字key
IN  start： 最小值
IN end :最大值
**返回值：** 

5. void insert(String key , String start, String end)
**描述：**   
     插入一个key的值在[start, end]之间的条件
**参数：** 
IN key : 搜索条件的关键字key
IN  start： 最小值
IN end :最大值
**返回值：**


## Dsd_redis 类##
Dsd dac cloud api 提供了简单的访问redis数据库的方法。

###Package###
Dsd_redis 类在com.dasudian.cloud中 

###属性###
请参见相关方法

###方法###

1.  Dsd_redis(API m)   
**描述：**   
    实例化Dsd_redis类，必须传入一个API实例 
**参数：** 
IN API m : 实例化Dsd_redis类所需要的API 实例    
**返回值：**   
     无   

2.  byte[] execute(final String serv_name, final String cmd)  
**描述：**   
    请求redis数据库serv_name,执行cmd命令
**参数：** 
  IN serv_name : 数据库
  IN cmd: 待执行的命令   
**返回值：**   
     返回byte数组格式的返回结果。 

3.   byte[] execute_transaction(final String serv_name, @SuppressWarnings("String") final List<String> cmds)  
**描述：**   
    请求redis数据库serv_name, 以事务的方式执行cmds命令列表
**参数：** 
  IN serv_name : 数据库
  IN cmd: 待执行的命令列表   
**返回值：**   
     返回byte数组格式的返回结果。
