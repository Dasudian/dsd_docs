dsd_dsdb API 介绍
---------
dsd_dsdb  API 提供了一套简洁易用的访问DSDB数据库的API，应用程序只需要引用dsd_dsdb.h文件，编译时连接libdsdcloud.so即可。   


结构体
---
查询或搜索接口返回数据格式：
  typedef struct dsdb_result_s
{
    int length;
    char **result;
    char *next_page_id;
}dsdb_result_s     
char **result: 返回结果，字符串数组，
int length: 字符串的个数
char *next_page_id: 分页查询时，下页的搜索id，如果没有，则为NULL


API
---
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

29.`void free_dsdb_result(dsdb_result_s *res)`
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


