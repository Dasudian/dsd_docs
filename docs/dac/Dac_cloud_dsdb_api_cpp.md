dsd_dsdb类介绍
---------
dsd_dsdb类提供了一套简洁易用的访问DSDB数据库的API，其在dsd_cloud名称空间中。   

API
---
1. `dsd_dsdb(const API &m)`
描述：初始化dsd_dsdb实例，需要一个API的实例，dsd_dsdb使用该API来与SDK交互。
参数：
IN API m: API 实例
返回值：无       

2. `int put(const std::string &database, const std::string &key, const std::string &value)`
描述：向数据库database插入一个key，其值为value ,成功返回DSD_dsdb::SUCCESS，失败返回 dsd_dsdb::ERROR。当database或者key为空时，返回DSD_dsdb::ERROR
参数：
IN string &database :数据库名
IN string &key :key名
IN string &value :value
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR        

3. `int get(const std::string &database, const std::string &key)`
描述：从数据库database读取key的值。失败返回DSD_dsdb::ERROR，成功返回DSD_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :key名
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR     
      
4. `int delete_key(const std::string &database, const std::string &key)`
描述：从数据库database删除Key。成功返回dsd_dsdb::SUCCESS，失败返回 dsd_dsdb::ERROR。当database或者key为空时，返回dsd_dsdb::ERROR
参数：
IN string &database :数据库名
IN string &key :key名
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR     

5. `int search(const std::string &database, const std::string key, const std::string &value)`
描述：从数据库database中搜索内容符合key=value这种模式的记录，查询结果为符合条件的记录列表，失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取查询结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN string &value ：搜索关键字的值
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR        

6. `int search(const std::string &database, const std::string key,  float value)`
描述：从数据库database中搜索内容符合key=value这种模式的记录，查询结果为符合条件的记录列表，失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN float value ：搜索关键字的值
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR 

7. `int search_pagination(const std::string &database, const std::string &key, const std::string &value, const std::string &next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key=value模式的记录，查询结果为符合条件的记录名列表，失败返回dsd_dsdb::ERROR，成功返回DSD_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN string &value ：搜索关键字的值
IN string &next_seq ：下一页的查询id，“0”：第一页的查询id。
IN int num_per_page：每页的记录数
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR       

8. `int search_pagination(const std::string &database, const std::string &key, float value, const std::string &next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key=value模式的记录，查询结果为符合条件的记录名列表，失败返回dsd_dsdb::ERROR，成功返回DSD_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN float value ：搜索关键字的值
IN string &next_seq ：下一页的查询id，“0”：第一页的查询id。
IN int num_per_page：每页的记录数
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR 

9. `int search_range(const std::string &database, const std::string &key, const std::string &start, const std::string &end)`
描述：从数据库database中搜索 内容包含关键字key,并且key的值在[start,end]之间的记录，查询结果为符合条件的记录名，失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN string &start：搜索关键字的最小值
IN string &end ：搜索关键字的最大值
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR     

10. `int search_range(const std::string &database, const std::string &key,  float start,  float end)`
描述：从数据库database中搜索 内容包含关键字key,并且key的值在[start,end]之间的记录，查询结果为符合条件的记录名，失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN float start：搜索关键字的最小值
IN float end ：搜索关键字的最大值
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR  

11 `int search_range_pagination(const std::string &database, const std::string &key, const std::string &start, const std::string &end,const std::string &next_seq, int num_per_page)`
描述：从数据库database中搜索 内容包含关键字key,并且key的值在[start,end]之间的记录，查询结果为符合条件的记录名列表，记录按页返回，每页包含num_per_page个记录，同时返回查询下页数据的索引id。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN string &start：搜索关键字的最小值
IN string &end ：搜索关键字的最大值
IN string &next_seq ：下一页的查询id，“0”：第一页的查询id。
IN int num_per_page：每页的记录数
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR      

12 `int search_range_pagination(const std::string &database, const std::string &key, float start, float end,const std::string &next_seq, int num_per_page)`
描述：从数据库database中搜索 内容包含关键字key,并且key的值在[start,end]之间的记录，查询结果为符合条件的记录名列表，记录按页返回，每页包含num_per_page个记录，同时返回查询下页数据的索引id。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN float start：搜索关键字的最小值
IN float end ：搜索关键字的最大值
IN string &next_seq ：下一页的查询id，“0”：第一页的查询id。
IN int num_per_page：每页的记录数
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR 

13. `int search_or(const std::string &database, dsd_search_cond &conditions)`
描述：从数据库database中搜索 内容符合conditions中任意条件的记录。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN dsd_search_cond &conditions  搜索条件
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR     


14. `int search_or_pagination(const std::string &database, dsd_search_cond &conditions, const string &next_seq, int count_per_page)`
描述：从数据库database中搜索 内容中符合conditions中任意条件的记录，结果按页返回，每页num_per_pae个数据。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN dsd_search_cond &conditions  搜索条件
IN string & next_seq;下一页的查询id，“0”：第一页的查询id。
IN int count_per_page :每页返回数量
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR   

15. `int search_and(const std::string &database, dsd_search_cond &conditions)`
描述：从数据库database中搜索 内容中符合conditions中所有条件的记录。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN dsd_search_cond &conditions  搜索条件
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR      

16. `int search_and_pagination(const std::string &database, dsd_search_cond &conditions, const string &next_seq, int count_per_page)`
描述：从数据库database中搜索 内容中符合conditions中所有条件的记录，结果按页返回，每页num_per_pae个数据。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN dsd_search_cond &conditions  搜索条件
IN string & next_seq;下一页的查询id，“0”：第一页的查询id
IN int count_per_page :每页返回数量
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR   

17. `int  list_all(const std::string &database)`
描述：列出数据库database中的所有key。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :key名
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR   

18. `int search_value(const std::string &database, const std::string key, const std::string value)`
描述：从数据库database中搜索内容符合key=value这种模式的记录,返回记录项的内容，失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN string &value ：搜索关键字的值
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR       

19. `int search_value(const std::string &database, const std::string key, float value)`
描述：从数据库database中搜索内容符合key=value这种模式的记录,返回记录项的内容，失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN float value ：搜索关键字的值
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR  

20. `int search_value_pagination(const std::string &database, const std::string &key, const std::string &value, const std::string &next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key=value模式的记录,返回结果为所有符合条件的记录项的值，内容分页返回，每页的数量为num_per_page，最后一页的可能少于num_per_page。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN string &value ：搜索关键字的值
IN string &next_seq ：下一页的查询id，“0”：第一页的查询id
IN int num_per_page：每页的记录数
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR     

21. `int search_value_pagination(const std::string &database, const std::string &key, float value, const std::string &next_seq, int num_per_page)`
描述：从数据库database中搜索内容符合key=value模式的记录,返回结果为所有符合条件的记录项的值，内容分页返回，每页的数量为num_per_page，最后一页的可能少于num_per_page。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN float value ：搜索关键字的值
IN string &next_seq ：下一页的查询id，“0”：第一页的查询id
IN int num_per_page：每页的记录数
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR    

22. ` int search_value_range(const std::string &database, const std::string &key, const std::string &start, const std::string &end)`
描述：从数据库database中搜索 内容中包含关键字key,并且key的值在[start,end]之间的记录，返回结果为所有符合条件的记录项的值。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN string &start：搜索关键字的最小值
IN string &end ：搜索关键字的最大值
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR      

23. ` int search_value_range(const std::string &database, const std::string &key, float start, float end)`
描述：从数据库database中搜索 内容中包含关键字key,并且key的值在[start,end]之间的记录，返回结果为所有符合条件的记录项的值。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN float start：搜索关键字的最小值
IN float end ：搜索关键字的最大值
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR  

24. `int search_value_range_pagination(const std::string &database, const std::string &key, const std::string &start, const std::string &end, const std::string &next_seql, int count_per_page)`
描述：从数据库database中搜索 内容中包含关键字key,并且key的值在[start,end]之间的记录，查询结果为所有符合条件的记录项的内容列表，内容分页返回，每页的数量为num_per_page，最后一页的可能少于num_per_page。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN string &start：搜索关键字的最小值
IN string &end ：搜索关键字的最大值
IN string &next_seq ：查询下一页的id，“0”：返回第一页的数据。
IN int num_per_page：每页的记录数
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR    

25. `int search_value_range_pagination(const std::string &database, const std::string &key, float start, float end, const std::string &next_seql, int count_per_page)`
描述：从数据库database中搜索 内容中包含关键字key,并且key的值在[start,end]之间的记录，查询结果为所有符合条件的记录项的内容列表，内容分页返回，每页的数量为num_per_page，最后一页的可能少于num_per_page。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN string &key :搜索关键字
IN float start：搜索关键字的最小值
IN float end ：搜索关键字的最大值
IN string &next_seq ：查询下一页的id，“0”：返回第一页的数据。
IN int num_per_page：每页的记录数
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR  

26. `int search_value_or(const std::string &database, dsd_search_cond &conditions)`
描述：从数据库database中搜索 内容中符合conditions中任意条件的记录,。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN dsd_search_cond &conditions  搜索条件
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR      

27. `int search_value_or_pagination(const std::string &database, dsd_search_cond &conditions, const string &next_seq, int count_per_page)`
描述：从数据库database中搜索 内容符合conditions中任意条件的记录的值，结果按页返回，每页数量为count_per_page，最后一页可能小于count_per_page。。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN dsd_search_cond &conditions  搜索条件
IN string & next_seq;下一页的查询id，“0”：第一页的查询id
IN int count_per_page :每页返回数量
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR      

28. `int search_value_and(const std::string &database, dsd_search_cond &conditions)`
描述：从数据库database中搜索 内容符合conditions中所有条件的记录的值。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN dsd_search_cond &conditions  搜索条件
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR      

29. `int search_value_and_pagination(const std::string &database, dsd_search_cond &conditions, const string &next_seq, int count_per_page)`
描述：从数据库database中搜索 内容符合conditions中所有条件的记录的值，结果按页返回，每页数量为count_per_page，最后一页可能小于count_per_page。失败返回dsd_dsdb::ERROR，成功返回dsd_dsdb::SUCCESS。应用程序调用get_result_value()获取返回结果，结果以`list<string>`  呈现，对于分页查询的结果，调用get_result_page_id 获取下一页的查询id，string格式。
参数：
IN string &database :数据库名
IN dsd_search_cond &conditions  搜索条件
IN string & next_seq: 下一页的查询id，“0”：第一页的查询id
IN int count_per_page :每页返回数量
返回值：成功：dsd_dsdb::SUCCESS；失败：dsd_dsdb::ERROR    

30. `std::list<std::string> get_result_value()`
描述：获取查询结果，如果有数据，返回对应的`list<string>` ,否则返回一个空的list
参数：
返回值：返回` list<string>`   

23. `std::string get_result_page_id()`
描述：对于分页查询，获取查询下页数据的索引id ,字符串。如果没有，则是一个空字符串string("")。
参数：
返回值：返回string


dsdb_search_cond类介绍
---------
dsd_dsdb支持多个条件组合搜索的功能，通过dsdb_search_cond类就可以方便的生成查询条件列表     

1.  `dsdb_search_cond()`     
描述：初始化一个dsdb_search_cond的实例
参数：无
返回值：无      

2.  `int dsdb_cond_insert(const std::string &key, const std::string &value )`    
描述：插入一个key=value的搜索条件
参数：
std::string key ：搜索关键字
std::string value :搜索关键字的值
返回值：成功返回0，失败返回其他      

3.  `int dsdb_cond_insert(const std::string &key, float value )`    
描述：插入一个key=value的搜索条件
参数：
std::string key ：搜索关键字
float value :搜索关键字的值
返回值：成功返回0，失败返回其他   
 
4.  `int dsdb_cond_insert(const std::string &key, const std::string &start, const std::string &end)`    
描述：插入一个key 的值在[start,end]之间的搜索条件。
参数：
std::string &key ：搜索关键字
std::string &start : 最小值
std::string &end  : 最大值
返回值：成功返回0，失败返回其他       

5.  `int dsdb_cond_insert(const std::string &key, float start, float end)`    
描述：插入一个key 的值在[start,end]之间的搜索条件。
参数：
std::string &key ：搜索关键字
int start : 最小值
int end  : 最大值
返回值：成功返回0，失败返回其他 

6. `list<string> dsdb_conds_get_all()`
描述：返回所有的条件字符串，以`list<string>` 的形式返回。
参数：无
返回值：返回一个`list<string>` 如果没有，则返回一个空的list     

 
7. `int dsdb_cond_get_size()`
描述：返回 搜索条件的数量。
参数：无
返回值：返回搜索条件的数量


8. `bool dsdb_cond_is_empty()`
描述：检查该实例是否为空，空返回true，否则false
参数：无
返回值：true/false    

9. `std::string dsdb_conds_get(int i)`
描述：请求第i条搜索条件,如果有，返回，否则，返回一个空字符串
参数：
int i: 位置索引
返回值：成功：返回一个非空的字符串，失败，返回一个空的字符串string("")



