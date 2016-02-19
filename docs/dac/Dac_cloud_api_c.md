DAC_CLOUD_API_C指导手册   
===================   
   
引言   
-------------   
 CLOUD_API_C提供了功能丰富但使用简单的API，用户无需关注性能负载均衡等，就可以实现丰富的http及其他类型的服务。   
 
安装环境   
-------------   

ubuntu 14.06或14.10

 编译方法   
-------------   

 1.下载并解压SDK到指定目录   
 2.修改工程的Makefile，添加CLOUD_API_C的头文件引用路径和动态库的链接路径   
  　　INCLUDE_DIR=dir   
　　LIB_DIR=dir   
　　CFLAGS+= -I\$(INCLUDE_DIR) -g -O0 -fexceptions   
　　LDFLAGS+= -L\$(LIB_DIR) -ldsdcloud   
　　具体请参考下面的demo，/home/sea/SDK/dasudian_cloud-1.0.0是本机的API安装路径   
　  ` INCLUDE_DIR=/home/sea/SDK/dasudian_cloud-1.0.0   
　　LIB_DIR=/home/sea/SDK/dasudian_cloud-1.0.0   
　　CFLAGS+= -I\$(INCLUDE_DIR) -g -O0 -fexceptions   
　　LDFLAGS+= -L\$(LIB_DIR) -ldsdcloud   
　　dm_test: dm_test.o   
　　gcc -o dm_test dm_test.o \$(CFLAGS) \$(LDFLAGS)    
　　dm_test.o:dm_test.c   
　　gcc  -c dm_test.c \$(CFLAGS)`   
   
##CLOUD API使用方法##
developers 引用头文件dsd_cloud.h，调用如下的方法，实现负载均衡，性能分布等功能。 

1. int dsd_cloud_initialize_thread_count(unsigned int * const thread_count) 
        **描述：**   
        获取系统设置的与erlang虚拟机交互的最大句柄数，适用于通过多线程与erlang虚拟机交互。   
        **参数：**   
         INOUT   thread_count：系统设置的与虚拟机交互的可分配最大句柄数
        **返回值：**   
        成功 ：0    
        失败 ：非0
        
2. int dsd_cloud_initialize(dsd_cloud_instance_t * p, unsigned int const thread_index)   
        **描述：**   
        初始化Dasudian Cloud API。一个service只能调用一次。   
        **参数：**   
         INOUT   p：dsd_cloud_instance_t 结构体指针，该函数会修改p指向的内容
         IN  thread_index : 线程索引，从0开始，不能大于调用dsd_cloud_initialize_thread_count函数让系统分配的最大线程数     
        **返回值：**   
        成功 ：0    
        失败 ：非0   
           
3. int dsd_cloud_destroy(dsd_cloud_instance_t * p)   
        **描述：**   
        反初始化cloud api ，当服务退出时需要调用该函数。   
        **参数：**   
         IN   p：dsd_cloud_instance_t 结构体指针，该函数会修改p指向的内容     
        **返回值：**   
        成功 ：0    
        失败 ：非0   
4. int dsd_cloud_subscribe(dsd_cloud_instance_t * p, char const * const pattern, dsd_cloud_callback_t f)   
        **描述：**   
        向服务器订阅一个服务，服务名为pattern ,支持简单正则表达式格式。当服务器收到对应的服务请求时，就转发到该API注册的回调函数f来执行   
        **参数：**   
         IN  p : 指向 dsd_cloud_initialize函数初始化的API实例   
         IN  pattern：服务名。支持简单的正则表达式，例如服务名为get*，那么服务器会把所有的get1,get2,geta等服务请求都会转到该API上。   
         IN  f： 服务注册的回调函数，当API收到服务请求后，就会回调该函数。     
        **返回值：**   
        成功 ：0    
        失败 ：非0   
           
5. int dsd_cloud_unsubscribe(dsd_cloud_instance_t * p, char const * const pattern)   
        **描述：**   
        取消一个已经注册的服务   
        **参数：**   
         IN  p : 指向 dsd_cloud_initialize函数初始化的API实例   
         IN  pattern：服务名。     
        **返回值：**   
        成功 ：0    
        失败 ：非0   
   
6. int dsd_cloud_send_sync(dsd_cloud_instance_t * p, char const * const name, void const * const   request,uint32_t const request_size)   
        **描述：**   
       同步服务请求，向 服务名为name 的服务发起请求。该函数会阻塞直到目的服务返回消息或者阻塞定时器到时。   
        **参数：**   
         IN  p : 指向 dsd_cloud_initialize函数初始化的API实例   
         IN  name：请求的服务名   
         IN   request: 请求的内容   
         IN   request_size :请求的内容长度     
        **返回值：**   
        成功 ：0    
        失败 ：非0   
           
7. int dsd_cloud_send_async(dsd_cloud_instance_t * p, char const * const name,   
　　　　　void const * const request, uint32_t const request_size)   
        **描述：**   
       异步服务请求，向 服务名为name 的服务发起请求。该函数会立即返回。如果需要获得对端的返回消息，需要调用dsd_cloud_recv_async来获取返回信息。   
        **参数：**   
         IN  p : 指向 dsd_cloud_initialize函数初始化的API实例   
         IN  name：请求的服务名   
         IN   request: 请求的内容   
         IN   request_size :请求的内容长度   
        **返回值：**   
        成功 ：0  ，失败非0  
   
8. int dsd_cloud_publish((dsd_cloud_instance_t * p, char const * const name,   
　　　　void const * const request,　uint32_t const request_size)   
        **描述：**   
       向所有订阅了 name服务的进程 发布 request信息。   
        **参数：**   
          IN  p : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
         IN  name：发布的服务名。   
         IN   request: 请求的内容   
         IN   request_size :请求的内容长度   
        **返回值：**   
        成功 ：0    
        失败 ：非0   
           
9. int dsd_cloud_forward_sync(dsd_cloud_instance_t * p,   
　　　　char const * const name,   
　　　　void const * const request_info,   
　　　　uint32_t const request_info_size,   
　　　　void const * const request,   
　　　　uint32_t const request_size,   
　　　　uint32_t timeout,   
　　　　int8_t const priority,   
　　　　char const * const trans_id,   
　　　　char const * const pid,   
　　　　uint32_t const pid_size)   
**描述：**   
       同步 转发服务请求至name描述的服务.   
**参数：**   
         IN  p : 指向 dsd_cloud_initialize函数初始化的API实例   
         IN  name: 目的服务名   
         IN   request_info: 请求信息   
         IN   request_info_size :请求信息的长度   
         IN   request：请求的内容   
         IN   request_size 请求的长度   
         IN   timeout：该方法掉用的阻塞时间   
         IN   priority：转发请求的优先级   
         IN   trans_id：转发服务的id   
	 IN   pid :	本服务的pid   
	 IN   pid_size ：pid 长度   
**返回值：**   
         成功：0   
         失败：非0  

10. int dsd_cloud_return(dsd_cloud_instance_t * p,   
                  int const command,   
                  char const * const name,   
                  char const * const pattern,   
                  void const * const response_info,   
                  uint32_t const response_info_size,   
                  void const * const response,   
                  uint32_t const response_size,   
                  uint32_t timeout,   
                  char const * const trans_id,   
                  char const * const pid,   
                  uint32_t const pid_size)   
**描述：**   
      回复 request请求   
**参数：**   
         IN  p : 指向 dsd_cloud_initialize函数初始化的API实例   
         IN command : 调用方式，1：同步回复；0：异步回复。通常与请求的保持一致。   
         IN  name: 本地服务名   
         IN  pattern ；请求服务名   
         IN   response_info: 响应信息   
         IN   response_info_size :响应信息的长度   
         IN  response：响应的内容   
         IN  response_size 响应的长度   
         IN   timeout：该方法掉用的阻塞时间   
         IN   trans_id：转发服务的id   
	  IN   pid :	本服务的pid   
	  IN   pid_size ：pid 长度   
**返回值：**   
         成功：0   
         失败：非0     
   
11. int dsd_cloud_poll(dsd_cloud_instance_t * p,　int timeout)   
**描述：**   
      服务轮询 是否有新的请求   
**参数：**   
      IN :本地instance 指向 dsd_cloud_initialize函数初始化的API实例   
      IN :  timeout ：轮询周期,默认为-1，即表示阻塞直到下一个服务到来。如果设置为0，表示不阻塞，可能会导致CPU占用率过高。   
**返回值：**   
     0：成功   
     非0：失败   
   
12. char* dsd_cloud_get_response(dsd_cloud_instance_t * p)   
**描述：**   
     本地服务发出请求后，调用此函数来获取请求的回复内容   
**参数：**   
IN p  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
**返回值：**   
      返回指向响应内容的指针   
         
13. int dsd_cloud_get_response_size(dsd_cloud_instance_t * p)   
**描述：**   
     本地服务发出请求后，调用此函数来获取请求的回复内容长度   
**参数：**   
IN p  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
**返回值：**   
      返回响应内容的长度   
   
14. int dsd_cloud_get_response_info(dsd_cloud_instance_t * p)   
**描述：**   
     本地服务发出请求后，调用此函数来获取请求的回复信息   
**参数：**   
IN p  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
**返回值：**   
      返回指向响应信息的指针   
   
15. int dsd_cloud_get_response_info_size(dsd_cloud_instance_t * p)   
**描述：**   
     本地服务发出请求后，调用此函数来获取回复信息的长度   
**参数：**     
IN p  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
**返回值：**   
      返回响应信息长度   
   
##MemCached数据库访问方法##
dsd dac cloud api 提供了非常丰富的访问memcached的API，开发者无需安装及维护MemCached数据库。开发者需要引用头文件dsd_mchdb.h。具体的函数如下：

1. char * dsd_memCachDB_get_key(dsd_cloud_instance_t * api, char *service_name ,char *key)   
**描述：**   
    调用 服务名为service_name 的memcached服务，获取key的值。   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 查询的key   
**返回值：**   
      key的值，如果没有该key则返回ＮＵＬＬ   
         
2. char * dsd_memCachDB_get_manykey(dsd_cloud_instance_t * api, char *service_name ,char **keys,int n)   
**描述：**   
    调用 服务名为service_name 的memcached服务，一次获取多个key的值。   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN keys: 查询的key列表，此参数为一个二维数组   
IN n  : key 的数量   
**返回值：**   
      查询到的key的值   
   
3. int  dsd_memCachDB_add_key(dsd_cloud_instance_t * api, char *service_name , char *key,char *value);   
**描述：**   
    调用 服务名为service_name 的memcached服务，添加一个key，值为value。   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 需要添加的key名   
IN vlaue :key的值   
**返回值：**   
      成功：０   
      失败：非０   
    
4. int dsd_memCachDB_add_key_expiredTime(dsd_cloud_instance_t * api, char *service_name , char*　　  key,char *value,int expire_time);   
**描述：**   
    调用 服务名为service_name 的memcached服务，添加一个key，值为value,有效期为expire_time。   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 需要添加的key名   
IN vlaue :key的值   
IN expire_time : key的有效期   
**返回值：**   
      成功：０   
      失败：非０   
   
5. int dsd_memCachDB_set_key(dsd_cloud_instance_t * api, char *service_name , char *key,char *value)   
**描述：**   
    调用 服务名为service_name 的memcached服务，修改key的值为value   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 需要设置的key名   
IN vlaue :key的值   
**返回值：**   
      成功：０   
      失败：非０   
   
6. int dsd_memCachDB_set_key_expiredTime(dsd_cloud_instance_t * api, char *service_name , char *key,char *value,int expire_time);   
**描述：**   
    调用 服务名为service_name 的memcached服务，修改key的值为value，有效期为expire_time   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 需要设置的key名   
IN vlaue :key的值   
IN expire_time : key的有效期 ，单位秒  
**返回值：**   
      成功：０   
      失败：非０   
   
7. int dsd_memCachDB_replace_key(dsd_cloud_instance_t * api, char *service_name , char *key,char *value);   
**描述：**   
    调用 服务名为service_name 的memcached服务，替换key的值为value   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 需要设置的key名   
IN vlaue :key的值   
**返回值：**   
      成功：０   
      失败：非０   
   
8. int dsd_memCachDB_delete_key(dsd_cloud_instance_t * api, char *service_name , char *key)   
**描述：**   
    调用 服务名为service_name 的memcached服务，删除某个key   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 需要设置的key名   
**返回值：**   
      成功：０   
      失败：非０   
   
9. int dsd_memCachDB_increment_key(dsd_cloud_instance_t * api, char *service_name , char *key, int inc)   
**描述：**   
    调用 服务名为service_name 的memcached服务，给key的值加上增量inc,该函数只对整形值有效，否则报错。   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 需要设置的key名   
IN inc : 增量   
**返回值：**   
      成功：０   
      失败：非０   
   
10. int dsd_memCachDB_decrement_key(dsd_cloud_instance_t * api, char *service_name , char *key, int dec)   
**描述：**   
    调用 服务名为service_name 的memcached服务，给key的值减去inc,该函数只对整形值有效，否则报错。   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 需要设置的key名   
IN dec : 减量   
**返回值：**   
      成功：０   
      失败：非０   
   
11. dsd_memCachDB_prepend_key(dsd_cloud_instance_t * api, char *service_name , char *key, char * value)   
**描述：**   
    调用 服务名为service_name 的memcached服务，修改key的值，加上前缀value.   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 需要设置的key名   
IN value :　需要添加的前缀   
**返回值：**   
      成功：０   
      失败：非０   
          
12. dsd_memCachDB_append_key(dsd_cloud_instance_t * api, char *service_name , char *key, char * value)   
**描述：**   
    调用 服务名为service_name 的memcached服务，修改key的值，加上后缀value.   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
IN key : 需要设置的key名   
IN value :　需要添加的后缀   
**返回值：**   
      成功：０   
      失败：非０   

13. char* dsd_memCachDB_version(dsd_cloud_instance_t * api, char *service_name)   
**描述：**   
    调用 服务名为service_name 的memcached服务，获取数据库版本号 
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
**返回值：**   
  返回数据库的版本号

14. int dsd_memCachDB_flush(dsd_cloud_instance_t * api, char *service_name)   
**描述：**   
    调用 服务名为service_name 的memcached服务，清空数据库所有内容 
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : memcached 的服务名   
**返回值：**   
  清空数据库 
      
##Redis数据库访问方法##

dsd dac cloud api 提供了简单易用的访问redis的API，开发者无需安装及维护redis数据库。开发者需要引用头文件dsd_redis.h。具体的函数如下：
  
1. dsd_redis_reply dsd_redis_exe(dsd_cloud_instance_t *api ,char *service_name , char *cmd)   
**描述：**   
    调用 服务名为service_name 的redis服务   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : redis的服务名   
IN char *cmd :redis执行命令   
**返回值：**   
      返回一个dsd_redis_reply的结构体，结构体如下：   
      ｛   
      　　int err;　      //错误码，０:成功；非０:失败   
             void * reply;   //返回内容   
	        int reply_len;　//返回内容的长度   
      ｝   
      客户端需要先判断err,然后在获取返回值的长度。   
   
2. dsd_redis_reply dsd_redis_exe(dsd_cloud_instance_t *api ,char *service_name , int cmdc,char **cmds);   
**描述：**   
    调用服务名为service_name的redis 服务，以事务方式一次执行多条命令   
**参数：**     
IN api  : 本地instance，指向 dsd_cloud_initialize函数初始化的API实例   
IN service_name : redis 的服务名   
IN key : 所有命令的数   
IN value :　指向所有命令。   
**返回值：**   
      返回一个dsd_redis_reply的结构体，结构体如下：   
      ｛   
          int err;　      //错误码，０:成功；非０:失败   
          void * reply;   //返回内容   
	      int reply_len;　//返回内容的长度   
      ｝   
      客户端需要先判断err,然后在获取返回值的长度。  

##Dsdb数据库访问方法##

dsd dac cloud api 提供了丰富易用的访问Dsdb数据库的API，开发者无需安装及维护Dsdb数据库。开发者需要引用头文件dsd_dsdb.h。具体的函数如下： 

###结构体###
数据库查询接口返回数据格式：
  typedef struct dsdb_result_s
{
    int length;
    char **result;
    char *next_page_id;
}dsdb_result_s     
char **result: 返回结果，字符串数组，
int length: 字符串的个数
char *next_page_id: 分页查询时，下页的搜索id，如果没有，则为NULL

###函数###
1. `int put(dsd_cloud_instance_t * p, char * database, char *key, char *value)`
描述：向数据库database插入一个key，其值为value ,成功返回dsd_dsdb_success，失败返回 dsd_dsdb_error。当database或者key为空时，返回dsd_dsdb_error
参数：     
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN char * value :value
返回值：成功：dsd_dsdb_success；失败：dsd_dsdb_error        

2. `dsdb_result_s* get(dsd_cloud_instance_t * p, char* database, char *key)`
描述：从数据库database读取key的值。失败返回NULL，成功返回指向dsdb_result_s的结构体指针, 应用程序需要调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL    
      
3. `int delete_key(dsd_cloud_instance_t * p, char *database, char *key)`
描述：从数据库database删除Key。成功返回dsd_dsdb_success，失败返回 dsd_dsdb_error。当database或者key为空时，返回dsd_dsdb_error
参数：     
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
返回值：成功：dsd_dsdb_success；失败：dsd_dsdb_error     

4. ` dsdb_result_s* search_number(dsd_cloud_instance_t * p, char * database, char *key, float value)`
描述：从数据库database中搜索内容符合key=value这种模式的记录，查询结果为符合条件的记录名列表，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN float value :value
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL        

5.  ` dsdb_result_s* search_string(dsd_cloud_instance_t * p, char * database, char *key, char* value)`
描述：从数据库database中搜索内容符合key=value这种模式的记录，查询结果为符合条件的记录名列表，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN char * value :value
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL 

6. ` dsdb_result_s* search_string_pagination(dsd_cloud_instance_t * p, char *database, char *key, char *value, char *next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key=value这种模式的记录，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页数据的id, 查询结果为符合条件的记录名列表，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN char * value :value
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL    

7. ` dsdb_result_s* search_number_pagination(dsd_cloud_instance_t * p, char *database, char *key, float value, char *next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key=value这种模式的记录，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页数据的id, 查询结果为符合条件的记录名列表，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN float value :value
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL      

8. ` dsdb_result_s* search_string_range(dsd_cloud_instance_t * p, char *database, char *key, char *start, char *end)`
描述：从数据库database中搜索内容符合key的值在[start,end]之间的记录，查询结果为符合条件的记录名列表，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN char *start :最小值
IN char *end :最大值
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL 

9. ` dsdb_result_s* search_number_range(dsd_cloud_instance_t * p, char *database, char *key, float start, float end)`
描述：从数据库database中搜索内容符合key的值在[start,end]之间的记录，查询结果为符合条件的记录名列表，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN float start :最小值
IN float end :最大值
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL    

10. ` dsdb_result_s* search_string_range_pagination(dsd_cloud_instance_t * p, char *database, char *key, char *start, char *end, char *next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key的值在[start,end]之间的记录，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页数据的id, 查询结果为符合条件的记录名列表，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN char *start :最小值
IN char *end :最大值
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL  

11. ` dsdb_result_s* search_number_range_pagination(dsd_cloud_instance_t * p, char *database, char *key, float start, float end, char *next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key的值在[start,end]之间的记录的名，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页数据的id, 查询结果为符合条件的记录名列表，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN float start :最小值
IN float end :最大值
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL        

12. `dsdb_result_s* search_or(dsd_cloud_instance_t * p, char *database, dsdb_search* conditions)`
描述：从数据库database中搜索 内容符合conditions中任意条件的记录的名。NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN dsdb_search* conditions ；搜索条件列表
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL     


13. `dsdb_result_s* search_or_pagination(dsd_cloud_instance_t * p, char *database, dsdb_search *conditions, char *next_seq, int num_per_page)`
描述：从数据库database中搜索 内容符合conditions中任意条件的记录，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页的查询id ，如果结果数少于num_per_page，则全部返回，同时下页查询id为空。失败：返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN dsdb_search* conditions ；搜索条件列表
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL   

14. `dsdb_result_s* search_and(dsd_cloud_instance_t * p, char *database, dsdb_search* conditions)`
描述：从数据库database中搜索 内容符合conditions中所有条件的记录的名。NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN dsdb_search* conditions ；搜索条件列表
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL      

15. `dsdb_result_s* search_and_pagination(dsd_cloud_instance_t * p, char *database, dsdb_search *conditions, char *next_seq, int num_per_page)`
描述：从数据库database中搜索 内容符合conditions中所有条件的记录的名，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页的查询id ，如果结果数少于num_per_page，则全部返回，同时下页查询id为空。失败：返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN dsdb_search* conditions ；搜索条件列表
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL   

16. `dsdb_result_s* list_all(dsd_cloud_instance_t * p, char *database)`
描述：列出数据库database中的所有key。失败返回NULL，成功返回所有记录名列表。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL   

17. ` dsdb_result_s* search_value_number(dsd_cloud_instance_t * p, char * database, char *key, float value)`
描述：从数据库database中搜索内容符合key=value这种模式的记录，查询结果为所有符合条件的记录值，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN float value :value
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL        

18.  ` dsdb_result_s* search_value_string(dsd_cloud_instance_t * p, char * database, char *key, char* value)`
描述：从数据库database中搜索内容符合key=value这种模式的记录，查询结果为所有符合条件的记录值，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN char * value :value
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL 

19. ` dsdb_result_s* search_value_string_pagination(dsd_cloud_instance_t * p, char *database, char *key, char *value, char *next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key=value这种模式的记录，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页数据的id, 查询结果为所有符合条件的记录值，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN char * value :value
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL    

20. ` dsdb_result_s* search_value_number_pagination(dsd_cloud_instance_t * p, char *database, char *key, float value, char *next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key=value这种模式的记录，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页数据的id, 查询结果为所有符合条件的记录值，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN float value :value
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL      

21. ` dsdb_result_s* search_value_string_range(dsd_cloud_instance_t * p, char *database, char *key, char *start, char *end)`
描述：从数据库database中搜索内容符合key的值在[start,end]之间的记录，查询结果为所有符合条件的记录值，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN char *start :最小值
IN char *end :最大值
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL 

22. ` dsdb_result_s* search_value_number_range(dsd_cloud_instance_t * p, char *database, char *key, float start, float end)`
描述：从数据库database中搜索内容符合key的值在[start,end]之间的记录，查询结果为所有符合条件的记录值，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN float start :最小值
IN float end :最大值
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL    

23. ` dsdb_result_s* search_value_string_range_pagination(dsd_cloud_instance_t * p, char *database, char *key, char *start, char *end, char *next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key的值在[start,end]之间的记录，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页数据的id, 查询结果为所有符合条件的记录值，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN char *start :最小值
IN char *end :最大值
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL  

24. ` dsdb_result_s* search_value_number_range_pagination(dsd_cloud_instance_t * p, char *database, char *key, float start, float end, char *next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key的值在[start,end]之间的记录，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页数据的id, 查询结果为所有符合条件的记录值，失败返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN char * key :key名
IN float start :最小值
IN float end :最大值
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL        

25. `dsdb_result_s* search_value_or(dsd_cloud_instance_t * p, char *database, dsdb_search* conditions)`
描述：从数据库database中搜索 内容符合conditions中任意条件的记录的内容。NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN dsdb_search* conditions ；搜索条件列表
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL     


26. `dsdb_result_s* search_value_or_pagination(dsd_cloud_instance_t * p, char *database, dsdb_search *conditions, char *next_seq, int num_per_page)`
描述：从数据库database中搜索 内容符合conditions中任意条件的记录的内容，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页的查询id ，如果结果数少于num_per_page，则全部返回，同时下页查询id为空。失败：返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN dsdb_search* conditions ；搜索条件列表
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL   

27. `dsdb_result_s* search_value_and(dsd_cloud_instance_t * p, char *database, dsdb_search* conditions)`
描述：从数据库database中搜索 内容符合conditions中所有条件的记录的内容。NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN dsdb_search* conditions ；搜索条件列表
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL      

28. `dsdb_result_s* search_vlaue_and_pagination(dsd_cloud_instance_t * p, char *database, dsdb_search *conditions, char *next_seq, int num_per_page)`
描述：从数据库database中搜索 内容符合conditions中所有条件的记录的内容，分页查询，即数据库每次只返回num_per_page个数据，同时返回查询下页的查询id ，如果结果数少于num_per_page，则全部返回，同时下页查询id为空。失败：返回NULL，成功返回dsdb_result_s指针。应用程序调用`void free_dsdb_result(dsdb_result_s *res)` 释放返回值，否则会导致内存泄露。
参数：
IN dsd_cloud_instance_t * p : 调用系统服务的client实例
IN char* database :数据库名
IN dsdb_search* conditions ；搜索条件列表
IN char * next_seq ： 搜索下页数据的id，如果为NULL或“0”，查询第一页数据。
IN int num_per_page：每页返回数据数量
返回值：成功：dsdb_result_s指针，应用需要调用free_dsdb_result 释放该指针；失败：NULL     

29. `void free_dsdb_result(dsdb_result_s *res)`
描述：释放res内存
参数：无
返回值：无

29. `dsdb_search* dsdb_cond_init()`
描述：初始化一个dsdb_search的结构体，需要调用dsdb_cond_free释放。失败返回NULL，成功返回非NULL
参数：无
返回值：失败；NULL，成功：其他    

30. `int insert_string_cond(dsdb_search *cond, char *key, char *value)`
描述：向dsdb_search中插入一条key=value的条件，成功dsd_dsdb_success,失败:dsd_dsdb_error
参数：
IN dsdb_search*cond :搜索条件结构体
IN char *key :key =value条件的key
IN char *value :key=value条件的value
返回值：成功dsd_dsdb_success,失败:dsd_dsdb_error    

31. `int insert_number_cond(dsdb_search *cond, char *key, float value)`
描述：向dsdb_search中插入一条key=value的条件，成功dsd_dsdb_success,失败:dsd_dsdb_error
参数：
IN dsdb_search*cond :搜索条件结构体
IN char *key :key =value条件的key
IN flaot value :key=value条件的value
返回值：成功dsd_dsdb_success,失败:dsd_dsdb_error   

32. `int insert_range_string_cond(dsdb_search *cond, char *key, char *start, char *end)`
描述：向dsdb_search中插入一条key的内容在[start,end]之间的条件，成功dsd_dsdb_success,失败:dsd_dsdb_error
参数：
IN dsdb_search*cond :搜索条件结构体
IN char *key :k搜索关键字Key
IN char *start :最小值
IN char *end   ：最大值
返回值：成功dsd_dsdb_success,失败:dsd_dsdb_error    

33. `int insert_range_number_cond(dsdb_search *cond , char *key, float start , float end )`
描述：向dsdb_search中插入一条key的内容在[start,end]之间的条件，成功dsd_dsdb_success,失败:dsd_dsdb_error
参数：
IN dsdb_search*cond :搜索条件结构体
IN char *key :k搜索关键字Key
IN float start :最小值
IN float end   ：最大值
返回值：成功dsd_dsdb_success,失败:dsd_dsdb_error    

34. `void dsdb_cond_free(dsdb_search *to)`
描述：释放to所指向的内存区域
参数：
IN dsdb_search *to：待释放的dsdb_search
返回值：无
      
