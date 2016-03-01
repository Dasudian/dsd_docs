DSD DAC_CLOUD API 指导手册   
===================   
   
引言   
-------------   
 DSD DAC_CLOUD API提供了功能丰富但使用简单的服务器开发的C++ API，该API极大的降低了服务器开发与维护难度，降低开发成本，缩短开发周期。用户无需关注服务器的负载均衡性能等问题，只需关注简单的业务逻辑，如同开发简单的单机应用，就可以实现丰富的服务器应用。
   
安装环境   
-------------   
 安装环境就是编译环境，目前只支持Ubuntu 14.06和Ubuntu 14.10。   
 
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
 
## API 类##
API 类是该sdk的主要类，developers调用该类与erlang虚拟机交互，处理http请求或其他服务请求。开发者需要引用头文件dsd_cloud.hpp

### 名称空间###
API 类在dsd_cloud名称空间下

###属性###
1. ASYNC : static final int类型，值为1，标示异步请求类型
2. SYNC : static final int类型，值为-1，标示同步请求类型

###方法###
1.  staici int thread_count() 
        **描述：**   
       静态方法， 获取服务系统支持的与erlang虚拟机交互的最大线程数  
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
           
3. int subscribe_count(char const * const pattern)   
        **描述：**   
        查询 订阅了服务名为pattern的服务数量  
        **参数：**   
         IN   pattern：服务名。服务id由服务前缀和服务名来唯一标示，服务前缀是包含该服务的应用上传时确定的。具体格式为/prefix/pattern，对于http服务，get和post服务是分开的，格式如name/get 或者name/post   
        **返回值：**   返回服务订阅数  
 
4. int send_async(char const * const name,
                       void const * const request,
                       uint32_t const request_size)
**描述：**   
    发送异步请求给服务名为name的服务，其他参数为默认值。developers 调用recv_async来接收服务的返回值，然后调用get_response,get_response_info来取得具体返回内容。成功返回0，失败返回非0
**参数：**     
IN name  : 请求的服务名  
IN request ：请求内容
IN request_size : request长度
**返回值：**   
      成功返回0，失败返回非0    

5. int send_async(std::string const & name,
                              void const * const request,
                              uint32_t const request_size) const
**描述：**   
    发送异步请求给服务名为name的服务，其他参数为默认值，developers 调用recv_async来接收服务的返回值，然后调用get_response,get_response_info来取得具体返回内容。成功返回0，失败返回非0
**参数：**     
IN name  : 请求的服务名  
IN request ：请求内容
IN request_size : request长度
**返回值：**   
      成功返回0，失败返回非0  

6. int send_async(char const * const name,
                       void const * const request_info,
                       uint32_t const request_info_size,
                       void const * const request,
                       uint32_t const request_size,
                       uint32_t timeout,
                       int8_t const priority)  
        **描述：**   
       异步服务请求，向 服务名为name 的服务发起请求。该函数会立即返回，developers 调用recv_async来接收服务的返回值，然后调用get_response,get_response_info来取得具体返回内容。成功返回0，失败返回非0
        **参数：**   
      IN name  : 请求的服务名  
      IN request ：请求内容
      IN request_size : request长度 
      IN request_info : 请求metedata数据
      IN request_info_size : request_info的长度
      IN timeout: 阻塞时间
      IN priority: 请求优先级  
        **返回值：**   
        成功 ：0  ，失败非0    

7. int send_async(std::string const & name,
                              void const * const request_info,
                              uint32_t const request_info_size,
                              void const * const request,
                              uint32_t const request_size,
                              uint32_t timeout,
                              int8_t const priority)  
        **描述：**   
       异步服务请求，向 服务名为name 的服务发起请求。该函数会立即返回，developers 调用recv_async来接收服务的返回值，然后调用get_response,get_response_info来取得具体返回内容。成功返回0，失败返回非0
        **参数：**   
      IN name  : 请求的服务名  
      IN request ：请求内容
      IN request_size : request长度 
      IN request_info : 请求metedata数据
      IN request_info_size : request_info的长度
      IN timeout: 阻塞时间
      IN priority: 请求优先级  
        **返回值：**   
        成功 ：0  ，失败非0  

8. int send_sync(char const * const name,
                       void const * const request,
                       uint32_t const request_size)
**描述：**   
    发送同步请求给服务名为name的服务，其他参数为默认值，developers调用get_response, get_response_info获取具体返回内容。成功返回0，失败返回非0
**参数：**     
IN name  : 请求的服务名  
IN request ：请求内容
IN request_size : request长度
**返回值：**   
      成功返回0，失败返回非0    

9. int send_sync(std::string const & name,
                             void const * const request,
                             uint32_t const request_size)
**描述：**   
    发送同步请求给服务名为name的服务，其他参数为默认值。developers调用get_response, get_response_info获取具体返回内容。成功返回0，失败返回非0
**参数：**     
IN name  : 请求的服务名  
IN request ：请求内容
IN request_size : request长度
**返回值：**   
      成功返回0，失败返回非0  

10. int send_sync(char const * const name,
                       void const * const request_info,
                       uint32_t const request_info_size,
                       void const * const request,
                       uint32_t const request_size,
                       uint32_t timeout,
                       int8_t const priority)  
        **描述：**   
       同步服务请求，向 服务名为name 的服务发起请求。该函数会立即返回，developers调用get_response, get_response_info获取具体返回内容。成功返回0，失败返回非0
        **参数：**   
      IN name  : 请求的服务名  
      IN request ：请求内容
      IN request_size : request长度 
      IN request_info : 请求metedata数据
      IN request_info_size : request_info的长度
      IN timeout: 阻塞时间
      IN priority: 请求优先级  
        **返回值：**   
        成功 ：0  ，失败非0   

11. int send_sync(std::string const & name,
                             void const * const request_info,
                             uint32_t const request_info_size,
                             void const * const request,
                             uint32_t const request_size,
                             uint32_t timeout,
                             int8_t const priority) 
        **描述：**   
       同步服务请求，向 服务名为name 的服务发起请求。该函数会立即返回，developers调用get_response, get_response_info获取具体返回内容。成功返回0，失败返回非0
        **参数：**   
      IN name  : 请求的服务名  
      IN request ：请求内容
      IN request_size : request长度 
      IN request_info : 请求metedata数据
      IN request_info_size : request_info的长度
      IN timeout: 阻塞时间
      IN priority: 请求优先级  
        **返回值：**   
        成功 ：0  ，失败非0 
           
12. int recv_async() ;   
**描述：**   
    开发者发送异步请求后，需要调用该方法来接收请求返回值。所有参数都是默认值  
**参数：**     
**返回值：**   
      成功返回0，失败返回非0    

13. int recv_async(uint32_t timeout)
**描述：**   
    开发者发送异步请求后，需要调用该方法来接收请求返回值。timeout是函数阻塞时间，其他参数默认
**参数：**
IN timeout ：函数阻塞时间     
**返回值：**   
      成功返回0，失败返回非0   

14. int recv_async(char const * const trans_id)
**描述：**   
    开发者发送异步请求后，需要调用该方法来接收请求返回值。trans_id是异步请求的事务id，其他参数默认
**参数：**
IN trans_id ：异步请求的事务id 
**返回值：**   
      成功返回0，失败返回非0   

15. int recv_async(uint32_t timeout,
                       char const * const trans_id) 
**描述：**   
    开发者发送异步请求后，需要调用该方法来接收请求返回值。trans_id是异步请求的事务id，timeout 是函数阻塞时间。其他参数默认
**参数：**
IN trans_id ：异步请求的事务id 
IN timeout ：函数阻塞时间     
**返回值：**   
      成功返回0，失败返回非0

16. int recv_async(uint32_t timeout,
                              std::string const & trans_id)
**描述：**   
    开发者发送异步请求后，需要调用该方法来接收请求返回值。trans_id是异步请求的事务id，timeout 是函数阻塞时间。其他参数默认
**参数：**
IN trans_id ：异步请求的事务id 
IN timeout ：函数阻塞时间     
**返回值：**   
      成功返回0，失败返回非0 

17. int recv_async(uint32_t timeout,
                       bool consume)
**描述：**   
    开发者发送异步请求后，需要调用该方法来接收请求返回值。timeout是函数阻塞时间，consume标示服务器侧是否保留该次服务请求信息（包括回复内容），false，保存，true，不保存，其他参数默认
**参数：**
IN timeout ：函数阻塞时间     
IN consume: consume标示服务器侧是否保留该次服务请求信息（包括回复内容），false，保存，true，不保存
**返回值：**   
      成功返回0，失败返回非0   

18. int recv_async(char const * const trans_id,
                       bool consume) 
**描述：**   
    开发者发送异步请求后，需要调用该方法来接收请求返回值。trans_id是异步请求的事务id，consume标示服务器侧是否保留该次服务请求信息（包括回复内容），false，保存，true，不保存，其他参数默认
**参数：**
IN trans_id ：异步请求的事务id    
IN consume: consume标示服务器侧是否保留该次服务请求信息（包括回复内容），false，保存，true，不保存
**返回值：**   
      成功返回0，失败返回非0  

19. recv_async(uint32_t timeout,
                       char const * const trans_id,
                       bool consume) 
**描述：**   
    开发者发送异步请求后，需要调用该方法来接收请求返回值。timeout是函数阻塞时间，trans_id是异步请求的事务id，consume标示服务器侧是否保留该次服务请求信息（包括回复内容），false，保存，true，不保存，其他参数默认
**参数：**
IN timeout ：函数阻塞时间
IN trans_id ：异步请求的事务id    
IN consume: consume标示服务器侧是否保留该次服务请求信息（包括回复内容），false，保存，true，不保存
**返回值：**   
      成功返回0，失败返回非0 

20. int get_trans_id_count();   
**描述：**   
    sdk会用trans_id来标示每个服务请求，开发者可以调用该函数来获取SDK保存的服务请求id个数 ，比如调用send_async发起了异步请求，系统会保存这个会话id，开发者可以通过这个id来接收服务返回数据等。
**参数：**     
**返回值：**   
     trans_id个数     

21. char const * get_trans_id(unsigned int const i = 0)
**描述：**   
    获取服务请求id。
**参数：**     
**返回值：**   
     trans_id  

22.  bool get_trans_id_null(unsigned int const i = 0) 
**描述：**   
    判断对应的trans_id是否为空，空，返回true，非空，false
**参数：**     
**返回值：**   
     trans_id为空，返回true，非空，返回false  

23.  char const * get_response() 
**描述：**   
    获取response
**参数：**     
**返回值：**   
    response内容

24.  int get_response_size() 
**描述：**   
    获取response的长度
**参数：**     
**返回值：**   
    response内容的长度   

25.  char const * get_response_info() 
**描述：**   
    获取response_info
**参数：**     
**返回值：**   
    response_info内容

26.  int get_response_info_size() 
**描述：**   
    获取response_info的长度
**参数：**     
**返回值：**   
    response_info的长度
         
27. int process_index();   
**描述：**   
    获取该对象所属的线程id
**参数：**     
**返回值：**   
     线程id  

28. int process_count();   
**描述：**   
    获取分配的与erlang虚拟机交互的线程数
**参数：**     
**返回值：**   
     线程数量   

29. int process_count_max()
**描述：**   
    获取系统设置的与erlang虚拟机交互的最大线程数
**参数：**     
**返回值：**   
     线程数量 

30. int process_count_min()
**描述：**   
    获取系统设置的与erlang虚拟机交互的最小线程数
**参数：**     
**返回值：**   
     线程数量  

31. int timeout_initialize()
**描述：**   
    获取初始化的默认的阻塞时间
**参数：**     
**返回值：**   
     阻塞时间，单位为毫秒 
     
32. int timeout_async()
**描述：**   
    获取异步请求的默认的阻塞时间
**参数：**     
**返回值：**   
     阻塞时间，单位为毫秒 

33. int timeout_sync()
**描述：**   
    获取同步请求的默认的阻塞时间
**参数：**     
**返回值：**   
     阻塞时间，单位为毫秒  

34. int priority_default()
**描述：**   
    获取服务默认优先级
**参数：**     
**返回值：**   
     服务优先级 
      
35.  int forward_(int const command,
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
    转发请求给服务名为name的服务,执行完毕后抛出一个SDK必须要获取的forward_async_exception或forward_sync_exception异常，应用程序必须将其抛出，否则会报错。即之后的代码 不会执行。目的服务执行完会直接回复请求 
**参数：**
    IN command 转发请求是同步方式还是异步方式，DSD_CLOUD_ASYNC：异步转发，DSD_CLOUD_SYNC: 同步转发     
    IN name  目的服务名，可以为正则表达式  
    IN request_info 请求的元数据    
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pid  转发请求的pid 
    IN pid_size pid的长度
**返回值：**   
         成功返回0，失败返回非0 

36.  int forward_(int const command,
                            std::string const & name,
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
    转发请求给服务名为name的服务,执行完毕后抛出一个SDK必须要获取的forward_async_exception或forward_sync_exception异常，应用程序必须将其抛出，否则会报错。即之后的代码 不会执行。目的服务执行完会直接回复请求 
**参数：**
    IN command 转发请求是同步方式还是异步方式，DSD_CLOUD_ASYNC：异步转发，DSD_CLOUD_SYNC: 同步转发     
    IN name  目的服务名，可以为正则表达式  
    IN request_info 请求的元数据    
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pid  转发请求的pid 
    IN pid_size pid的长度
**返回值：**   
         成功返回0，失败返回非0 

37.  int forward_async(char const * const name,
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
    异步转发请求给服务名为name的服务,执行完毕后抛出一个SDK必须要获取的forward_async_exception异常，已用无需捕获它，必须将其抛出，否则会报错。即之后的代码 不会执行。目的服务执行完会直接回复请求 
**参数：**
  
    IN name  目的服务名，可以为正则表达式  
    IN request_info 请求的元数据    
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pid  转发请求的pid 
    IN pid_size pid的长度
**返回值：**   
         成功返回0，失败返回非0   

38.  int forward_sync(char const * const name,
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
    同步转发请求给服务名为name的服务,执行完毕后抛出一个SDK必须要获取的forward_sync_exception异常，已用无需捕获它，必须将其抛出，否则会报错。即之后的代码 不会执行。目的服务执行完会直接回复请求 
**参数：**
  
    IN name  目的服务名，可以为正则表达式  
    IN request_info 请求的元数据    
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pid  转发请求的pid 
    IN pid_size pid的长度
**返回值：**   
         成功返回0，失败返回非0
   

39. int poll(int timeout)   
**描述：**   
    轮询是否有请求到达  
**参数：**     
    IN timeout  轮询周期，单位ms,如果设置为-1,表示永久阻塞直到有请求到来  
**返回值：**    
     成功返回0，失败返回非0
     
40.   int return_(int const command,
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
    响应请求回复，该函数如果执行成功后会抛出return_async_exception或return_sync_exception异常，应用程序不可捕获它，该异常必须得由SDK捕获，否则会报错。所以可以在回调函数的最后一行返回。  
**参数：**     
    Integer command 回复类型，API.ASYNC：异步回复；API.SYNC:同步回复，必须与回调函数的参数保持一致
    IN name  服务名，与回调函数的参数保持一致  
    IN request_info 请求的元数据    
    IN request_info_size :request_info的长度   
    IN  request_size: request的长度
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pid  转发请求的pid 
**返回值：**  
    失败，返回非0  

41.   int return_async(char const * const name,
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
    异步响应请求回复，该函数如果执行成功后会抛出return_async_exceptionn异常，应用程序不可捕获它，该异常必须得由SDK捕获，否则会报错。所以最好在回调函数的最后一行返回，因为该函数执行成功不会执行后面的内容。  
**参数：**     
    Integer command 回复类型，API.ASYNC：异步回复；API.SYNC:同步回复，必须与回调函数的参数保持一致
    IN name  服务名，与回调函数的参数保持一致  
    IN request_info 请求的元数据    
    IN request_info_size :request_info的长度   
    IN  request_size: request的长度
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pid  转发请求的pid 
**返回值：**  
    失败，返回非0    

42.   int return_sync(char const * const name,
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
    同步响应请求回复，该函数如果执行成功后会抛出return_sync_exceptionn异常，应用程序不可捕获它，该异常必须得由SDK捕获，否则会报错。所以最好在回调函数的最后一行返回，因为该函数执行成功不会执行后面的内容。  
**参数：**     
    Integer command 回复类型，API.ASYNC：异步回复；API.SYNC:同步回复，必须与回调函数的参数保持一致
    IN name  服务名，与回调函数的参数保持一致  
    IN request_info 请求的元数据    
    IN request_info_size :request_info的长度   
    IN  request_size: request的长度
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pid  转发请求的pid 
**返回值：**  
    失败，返回非0   

43.   int unsubscribe(char const * const pattern)  
**描述：**   
    取消订阅服务名pattern
**参数：**     
    IN  pattern ：取消订阅的服务名称
**返回值：**  
    成功，返回0；失败，返回非0   

44.   template < typename T>
        int subscribe(char const * const pattern,
                      T & object,
                      void (T::*f) (API const &,
                                    int const,
                                    std::string const &,
                                    std::string const &,
                                    void const * const,
                                    uint32_t const,
                                    void const * const,
                                    uint32_t const,
                                    uint32_t,
                                    int8_t,
                                    char const * const,
                                    char const * const,
                                    uint32_t const)) const
**描述：**   
    订阅服务pattern，T为object类的名称
**参数：**     
    IN  pattern ：订阅的服务名称
    IN object ：接口对象
    IN  f: object对象中的某个函数 
**返回值：**  
    成功，返回0；失败，返回非0     

45.   int subscribe(std::string const & pattern,
                      function_object_cxx * object)
**描述：**   
    订阅服务pattern
**参数：**     
    IN  pattern ：订阅的服务名称
    IN object ：接口对象，该对象是一个抽象类，开发者需要编写一个子类，并实现operator()函数。
**返回值：**  
    成功，返回0；失败，返回非0

## function_object_cxx 类##
function_object_cxx类为API 类方法subscribe的回调接口类，该类是个纯虚函数，开发者如果调用 int subscribe(std::string const & pattern, function_object_cxx * object)方法，需要生成一个子类，并且需要实现operator()方法。

###属性###
请参见相关方法

###方法###
1. virtual void operator() (API const &,
                                         int const command,
                                          char const * const name,
                                          char const * const pattern,
                                          void const * const request_info,
                                          uint32_t const request_info_size,
                                          void const * const request,
                                          uint32_t const request_size,
                                          uint32_t timeout,
                                          int8_t priority,
                                          char const * const trans_id,
                                          char const * const pid,
                                          uint32_t const pid_size) = 0
**描述：**   
   developers需要实现该方法，处理服务请求
**参数：**     
    IN API ：API 实例
    IN command 请求类型，API.ASYNC：异步请求；API.SYNC:同步请求
    IN name  服务名，与回调函数的参数保持一致  
    IN request_info 请求的元数据    
    IN request_info_size :request_info的长度   
    IN  request_size: request的长度
    IN request 请求内容    
    IN timeout 请求的阻塞时间   
    IN priority 请求的优先级   
    IN trans_id 转发请求的事务id   
    IN pid  转发请求的pid 
**返回值：**  

## Dsd_log ##
开发者调用如下函数打印日志，引用头文件dsd_log.h

1.  int dsd_log_init()
**描述：**   
    日志初始化函数
**参数：**     
**返回值：**  
    成功，返回0；失败，返回非0

2. dsd_log_set_level(level)
**描述：**   
    设置日志打印级别
**参数：**     
IN level: 日志级别，只能在CLOG_DEBUG，CLOG_INFO，CLOG_WARN，CLOG_ERROR
**返回值：**  

3. dsd_log_info(fmt, ...)
**描述：**   
    info级别打印日志，该函数用法与printf一样
**参数：**     
**返回值：**   

4. dsd_log_warn(fmt, ...)
**描述：**   
    warn级别打印日志，该函数用法与printf一样
**参数：**     
**返回值：**   

5. dsd_log_error(fmt, ...)
**描述：**   
    error级别打印日志，该函数用法与printf一样
**参数：**     
**返回值：**   

6. dsd_log_debug(fmt, ...)
**描述：**   
   debug级别打印日志，该函数用法与printf一样
**参数：**     
**返回值：**  
    

## dsd_mchdb类##
DSD dac cloud api 提供了访问memcacahed数据库的方法。开发者只需要引用头文件dsd_mchdb.hpp

###名称空间###
dsd_mchdb类在dsd_cloud名称下

###属性###
请参见相关方法

###方法###

1.  dsd_mchdb(API &m)  
**描述：**   
    实例化dsd_memcached类，必须传入一个API实例 
**参数：** 
IN API m : 实例化Dsd_memcached类所需要的API 实例    
**返回值：**   
     无   

2.  string get_key( const string &service_name, const string &key)  
**描述：**   
   访问服务名为serv_name的memcached 服务，请求key的值，返回一个string
**参数：** 
IN serv_name: memcached服务名
IN key: 查询的key名    
**返回值：**   
     返回key的值，格式为byte数组，如果没有该key或查询失败，返回null   

3.  int  add_key(const string &service_name , const string &key, const string &value)
**描述：**   
    向数据库serv_name添加一个key, 值为value, 成功返回0，失败返回非0 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value ： key 的值   
**返回值：**   
     成功：返回0；失败：返回 -1    

4. int add_key_expiredTime(const string &service_name , const string &key, const string &value,int expire_time)  
**描述：**   
    向数据库serv_name添加一个key, 值为value, 该key的生成周期为time 秒, 成功返回0，失败返回非0 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value ： key 的值
IN time : key的生成周期，单位为秒    
**返回值：**   
     成功：返回0；失败：返回 -1     

5.  int set_key(const string &service_name ,const string &key,const string &value)   
**描述：**   
    请求数据库serv_name，修改key的值，在原来的基础上增加inc，成功返回0，失败非0
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN inc ： 增加量    
**返回值：**   
     成功返回0，失败返回非0    

6.  int decrement_key(const string serv_name, const string key, const int dec) 
**描述：**   
    请求数据库serv_name，修改key的值，在原来的基础上减小dec，成功返回0，失败非0 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN dec ： 减小量   
**返回值：**   
     成功返回0，失败返回非0    

7.  int increment_key(const string serv_name, const string key, const int inc) 
**描述：**   
    请求数据库serv_name，修改key的值，在原来的基础上增加inc，成功返回0，失败非0 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN inc ： 增加量   
**返回值：**   
     成功返回0，失败返回非0    

8.  int set_key_expiredTime( const string &service_name , const string &key,const string &value,int expire_time)   
**描述：**   
   请求数据库serv_name，设置key的值为value，生成周期为time 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value： 待修改的值
IN time : key的生存周期，单位为秒    
**返回值：**   
     成功返回0，失败返回非0    

8.  int set_key( const string &service_name , const string &key,const string &value)   
**描述：**   
   请求数据库serv_name，设置key的值为value
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value： 待修改的值
**返回值：**   
     成功返回0，失败返回非0    

9. int delete_key(const string serv_name, const string key)
**描述：**   
   请求数据库serv_name，删掉key 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名   
**返回值：**   
     成功返回0，失败非0
         
10.  int replace_key(const string serv_name, const string key, const string value) 
**描述：**   
    请求数据库serv_name，替换key的值为value
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value： 待修改的值
**返回值：**   
     成功返回0，失败返回非0    

11.  int append_key(const string serv_name, const string key, const string value) 
**描述：**   
   请求数据库serv_name, 修改key的值，添加一个后缀value 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value： 添加的 后缀   
**返回值：**   
     成功返回0，失败返回非0    

12.  int prepend_key(const string serv_name, const string key, const string value) 
**描述：**   
   请求数据库serv_name, 修改key的值，添加一个前缀value 
**参数：** 
IN serv_name: memcached 服务名
IN key： key名
IN value： 添加的 前缀   
**返回值：**   
     成功返回0，失败返回非0    

13.  string get_version(const string &service_name);
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

## dsd_dsdb类##
DSD dac cloud api 提供了访问dsdb数据库的方法。

###名称空间###
dsd_dsdb 类在dsd_cloud中 

###属性###
请参见相关方法

###方法###

1.  dsd_dsdb(API &m)
**描述：**   
    实例化dsd_dsdb类，必须传入一个API实例 
**参数：** 
 IN API m : 实例化dsd_dsdb类所需要的API 实例    
**返回值：**   
     无    
   
2. std::list< std::string> get_result_value()
**描述：**   
    获取查询请求的结果，返回内容为一个List< string >类型
**参数：**  
**返回值：**   
     dsdb查询请求的结果，List< string>类型

4. std::string get_result_page_id()
**描述：**   
    dsdb支持分页查询，分页查询返回的结果携带查询下一页请求的索引，developer调用该方法来获取查询下页的索引
**参数：**  
**返回值：**   
     查询下页的索引字符串

5. int put(const std::string &database, const std::string &key, const std::string &value)
**描述：**   
    向数据库database添加一个值为value的key，成功返回0，失败返回非0
**参数：** 
IN database: 请求的数据库
IN key: 待添加的key
IN value: 添加的值  
**返回值：**   
     成功返回0，失败返回非0  

6.  int get(const std::string &database, const std::string &key)
**描述：**   
    向数据库database添加一个值为value的key，成功返回0，失败返回非0，developers调用get_result方法获取查询结果
**参数：** 
IN database: 请求的数据库
IN key: 待添加的key
**返回值：**   
     成功返回0，失败返回非0   

7. int delete_key(const std::string &database, const std::string &key)
**描述：**   
    删除database中key
**参数：** 
IN database: 请求的数据库
IN key: 待删除的key
**返回值：**   
     成功返回0，失败返回非0   

8. int search(const std::string &database, const std::string &key, const std::string &value)
**描述：**   
    请求database数据库，搜索内容符合key=value的所有记录，返回记录的列表，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
**返回值：**   
     成功返回0，失败返回非0   

9. int search(const std::string &database, const std::string &key, float value)
**描述：**   
    请求database数据库，搜索内容符合key=value的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
**返回值：**   
     成功返回0，失败返回非0  

10. int search_range(const std::string &database, const std::string &key, const std::string &start, const std::string &end)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
**返回值：**   
     成功返回0，失败返回非0

11. int search_range(const std::string &database, const std::string &key, float start, float end)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项名字
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
**返回值：**   
     成功返回0，失败返回非0    

12. int search_pagination(const std::string &database, const std::string &key, const std::string &value, const std::string &next_seq, int num_per_page)
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

13.int search_pagination(const std::string &database, const std::string &key, float value, const std::string &next_seq, int num_per_page)
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

14. int search_range_pagination(const std::string &database, const std::string &key, const std::string &start, const std::string &end, const std::string &next_seq, int num_per_page)
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

15.int search_range_pagination(const std::string &database, const std::string &key, float start, float end, const std::string &next_seq, int num_per_page)
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

16. int search_value(const std::string &database, const std::string &key, const std::string &value)
**描述：**   
    请求database数据库，搜索内容符合key=value的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
**返回值：**   
     成功返回0，失败返回非0    

17. int search_value(const std::string &database, const std::string &key, float value)
**描述：**   
    请求database数据库，搜索内容符合key=value的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN value : 关键字内容
**返回值：**   
     成功返回0，失败返回非0    

18. int search_value_range(const std::string &database, const std::string &key, const std::string &start, const std::string &end)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
**返回值：**   
     成功返回0，失败返回非0   

19. int search_value_range(const std::string &database, const std::string &key, const std::string &start, const std::string &end)
**描述：**   
    请求database数据库，搜索内容符合关键字key的内容在[start, end]之间的所有记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的内容
**参数：** 
IN database: 请求的数据库
IN key: 搜索关键字
IN start : 最小值
IN end : 最大值
**返回值：**   
     成功返回0，失败返回非0   

20. int search_value_pagination(const std::string &database, const std::string &key, const std::string &value, const std::string &next_seq, int num_per_page)
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

21.int search_value_pagination(const std::string &database, const std::string &key, float value, const std::string &next_seq, int num_per_page)
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

22. int search_value_range_pagination(const std::string &database, const std::string &key, const std::string &start, const std::string &end, const std::string &next_seq, int num_per_page)
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

23. int search_value_range_pagination(const std::string &database, const std::string &key, float start, float end, const std::string &next_seq, int num_per_page)
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

24. int list_all(const std::string &database)
**描述：**   
    请求database数据库，列出所有的key，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的记录项的名字
**参数：** 
IN database: 请求的数据库
**返回值：**   
     成功返回0，失败返回非0   

25. int search_or(const std::string &database, dsdb_search_cond & conditions)
**描述：**   
    请求database数据库，搜索内容符合conds中任何一个条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
**返回值：**   
     成功返回0，失败返回非0  

26. int search_and(const std::string &database, dsdb_search_cond & conditions)
**描述：**   
    请求database数据库，搜索内容符合conds中所有条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
**返回值：**   
     成功返回0，失败返回非0   

27. int search_or_pagination(const std::string &database, dsdb_search_cond & conditions, const std::string &next_seq, int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合conds中任何一个条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
IN next_pag : 分页查询索引
IN num_per_page: 每页返回的数据个数
**返回值：**   
     成功返回0，失败返回非0   

28. int search_and_pagination(const std::string &database, dsdb_search_cond & conditions, const std::string &next_seq, int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合conds中所有条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
IN next_pag : 分页查询索引
IN num_per_page: 每页返回的数据个数
**返回值：**   
     成功返回0，失败返回非0  

29. int search_value_or(const std::string &database, dsdb_search_cond & conditions)
**描述：**   
    请求database数据库，搜索内容符合conds中任何一个条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
**返回值：**   
     成功返回0，失败返回非0  

30. int search_value_and(const std::string &database, dsdb_search_cond & conditions)
**描述：**   
    请求database数据库，搜索内容符合conds中所有条件的记录，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
**返回值：**   
     成功返回0，失败返回非0   

31. int search_value_or_pagination(const std::string &database, dsdb_search_cond & conditions, const std::string &next_seq, int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合conds中任何一个条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
IN next_pag : 分页查询索引
IN num_per_page: 每页返回的数据个数
**返回值：**   
     成功返回0，失败返回非0   

32. int search_value_and_pagination(const std::string &database, dsdb_search_cond & conditions, const std::string &next_seq, int num_per_page)
**描述：**   
    请求database数据库，分页搜索内容符合conds中所有条件的记录，搜索的page索引为next_pag, 每页返回num_per_page个数据，成功返回0，失败返回非0。developers调用get_result方法获取查询结果，查询结果为符合条件的所有记录项的内容，调用get_next_page_id获取下页的查询索引
**参数：** 
IN database: 请求的数据库
IN conds: 查询条件列表
IN next_pag : 分页查询索引
IN num_per_page: 每页返回的数据个数
**返回值：**   
     成功返回0，失败返回非0

## dsdb_search_cond 类##
dac cloud api 支持用户按组合条件查询，dsd_search_cond类就是为了方便developers按条件查询dsdb数据库

###名称空间###
dsd_search_cond 类在dsd_cloud中 

###属性###
请参见相关方法

###方法###

1. dsdb_search_cond()
**描述：**   
     初始化一个Dsdb_search_cond的实例
**参数：** 
**返回值：**     

2. int dsdb_cond_insert(const std::string &key, const std::string &value )
**描述：**   
     插入一个key=value的查询条件
**参数：** 
IN key : 搜索条件的关键字key
IN  value： 关键字的内容
**返回值：**   

3. int dsdb_cond_insert(const std::string &key, float value )
**描述：**   
     插入一个key=value的查询条件
**参数：** 
IN key : 搜索条件的关键字key
IN  value： 关键字的内容
**返回值：**    

4.int dsdb_cond_insert(const std::string &key, const std::string &start, const std::string &end)
**描述：**   
     插入一个key的值在[start, end]之间的条件
**参数：** 
IN key : 搜索条件的关键字key
IN  start： 最小值
IN end :最大值
**返回值：** 

5. int dsdb_cond_insert(const std::string &key, float start, float end)
**描述：**   
     插入一个key的值在[start, end]之间的条件
**参数：** 
IN key : 搜索条件的关键字key
IN  start： 最小值
IN end :最大值
**返回值：**

## dsd_redis 类##
Dsd dac cloud api 提供了简单的访问redis数据库的方法。

###名称空间###
Dsd_redis 类在dsd_cloud中 

###属性###
请参见相关方法

###方法###

1.  dsd_redis(API m)   
**描述：**   
    实例化Dsd_redis类，必须传入一个API实例 
**参数：** 
IN API m : 实例化Dsd_redis类所需要的API 实例    
**返回值：**   
     无   

2.  dsd_redis_reply dsd_redis_exe execute(const string serv_name, const string cmd)  
**描述：**   
    请求redis数据库serv_name,执行cmd命令
**参数：** 
  IN serv_name : 数据库
  IN cmd: 待执行的命令   
**返回值：**   
     返回dsd_redis_reply结构体

3.   dsd_redis_reply execute_transaction(const string serv_name,  list< string> cmds)  
**描述：**   
    请求redis数据库serv_name, 以事务的方式执行cmds命令列表
**参数：** 
  IN serv_name : 数据库
  IN cmd: 待执行的命令列表   
**返回值：**   
     返回dsd_redis_reply结构体。

## dsd_redis_reply 结构体##
该结构体格式如下：
{
   int err;
   void *reply;
   int reply_len;
} dsd_redis_reply;
应用开发者调用redis数据库接口函数后要先判断err，如果为0，则成功，非0则失败。reply表示返回内容，reply_len表示返回内容的长度。


