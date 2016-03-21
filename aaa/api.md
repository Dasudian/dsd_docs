# 大数点Cloud AAA 开放接口API
 
## 1.获取 token

  在接入大数点`AAA`系统之前，都需要先获取`token`，后续所有的请求都需要带上`token`作为接入的凭证
  
### 请求方法
  
请求时使用`POST`方式请求`https://ex.ap.dasudian.net/auc_app`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">appid</td><td align="center">string</td><td align="center">是</td><td align="center">appid 为用户在大数点开发者平台创建App时生成的AppID</td></tr>
<tr><td align="center">appsec</td><td align="center">string</td><td align="center">是</td><td align="center">appsec 为用户大数点开发者平台创建App时生成的AppKey</td></tr>
</tbody>
</table>

### 请求实例

    curl -v -k https://ex.ap.dasudian.net/auc_app -d '{"appid":"139_A_92ECUvrZ4A6*****", "appsec":"*******7092b"}' -H"content-type:application/json"

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">integer</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">接入服务时要带的凭证，只有正确的token才能被允许接入服务。</td></tr>
</tbody>
</table>

### 返回实例
    {"result":,"token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}
    

## 2.注册

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/pre_register`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">phone_num</td><td align="center">string</td><td align="center">是</td><td align="center">手机号码</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl -v https://aaa.dasudian.net/pre_register -v -k -XPOST -H"Content-Type: application/json" -d '{"phone_num": "13618074451","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
<tr><td align="center">veri_code</td><td align="center">string</td><td align="center">验证码，会由短信平台发送至相应手机号。</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success","veri_code":"pinysl"}


## 3.验证码校验

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/verify_code`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">phone_num</td><td align="center">string</td><td align="center">是</td><td align="center">手机号码</td></tr>
<tr><td align="center">veri_code</td><td align="center">string</td><td align="center">是</td><td align="center">验证码</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl -v https://aaa.dasudian.net/verify_code -v -k -XPOST -H"Content-Type: application/json" -d '{"phone_num": "13618074451","veri_code":"pinysl","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success"}
    
## 4.提交注册信息

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/register`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">phone_num</td><td align="center">string</td><td align="center">是</td><td align="center">手机号码</td></tr>
<tr><td align="center">veri_code</td><td align="center">string</td><td align="center">是</td><td align="center">验证码</td></tr>
<tr><td align="center">name</td><td align="center">string</td><td align="center">是</td><td align="center">名字</td></tr>
<tr><td align="center">sex</td><td align="center">string</td><td align="center">是</td><td align="center">性别</td></tr>
<tr><td align="center">birthday</td><td align="center">string</td><td align="center">是</td><td align="center">生日</td></tr>
<tr><td align="center">password</td><td align="center">string</td><td align="center">是</td><td align="center">密码</td></tr>
<tr><td align="center">email</td><td align="center">string</td><td align="center">是</td><td align="center">邮箱地址</td></tr>
<tr><td align="center">area</td><td align="center">string</td><td align="center">是</td><td align="center">地区</td></tr>
<tr><td align="center">signature</td><td align="center">string</td><td align="center">是</td><td align="center">个性签名</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl -v https://aaa.dasudian.net/register -v -k -XPOST -H"Content-Type: application/json" -d '{"phone_num":"13618074451","name":"test",  "sex":"male","birthday":120000,"password":"123456","email":"barco@dasudian.com", "area":"广东/深圳","veri_code":"pinysl",  "signature":"a","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success"}    

## 5.用户登录

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/login`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">phone_num</td><td align="center">string</td><td align="center">是</td><td align="center">手机号码</td></tr>
<tr><td align="center">password</td><td align="center">string</td><td align="center">是</td><td align="center">密码</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl -v https://aaa.dasudian.net/login -v -k -XPOST -H"Content-Type: application/json" -d '{"phone_num":"13618074451","password":"123456","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success"}  
         

## 6.自动登录

### 请求方法

请求时使用`GET`方式请求`https://aaa.dasudian.net/auto_login`，`domain`为要请求服务器的地址
注:在请求时必须带上登录时服务器返回的`cookie`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl https://aaa.dasudian.net/auto_login?token=g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f -v -k -XGET --cookie "_Dasudian_Auth=g2gDaARrACBjOGMxOWViNjc5NzY3OWI3ODAwOWQxMTlmZjY5ZWJiOW0AAAAEdGVzdGgCaANiAAAH32EFYQtoA2ELYTJhIG0AAABR1Brh37P2scdkhXSftzn2QAJN78ZPeFMV3zUlTWcw21HYYcNKZZmfftUyNPQ%2BDDINtYmcbyL9z6%2Bmulx8jqcaFYYPnldoWSqzS8UtG%2BGZpiJ%2BawAUMjdlZDI5YTQxY2RlNGI4YjJjMDJtAAAAFNC5w3GjDdhBNN9VF0m%2BAB1nxFPN; Version=1; Expires=Mon, 11-May-2015 03:50:32 GMT; Max-Age=604800; Domain=dasudian.net; Path=/; HttpOnly"

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success"}   
            

## 7.查看个人信息

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/get_user`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">phone_num</td><td align="center">string</td><td align="center">是</td><td align="center">手机号码</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl -v https://aaa.dasudian.net/get_user -v -k -XPOST -H"Content-Type: application/json" -d '{"phone_num":"13618074451","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
<tr><td align="center">phone_num</td><td align="center">string</td><td align="center">手机号码</td></tr>
<tr><td align="center">name</td><td align="center">string</td><td align="center">名字</td></tr>
<tr><td align="center">sex</td><td align="center">string</td><td align="center">性别</td></tr>
<tr><td align="center">birthday</td><td align="center">string</td><td align="center">生日</td></tr>
<tr><td align="center">portrait</td><td align="center">string</td><td align="center">头像地址</td></tr>
<tr><td align="center">email</td><td align="center">string</td><td align="center">邮箱地址</td></tr>
<tr><td align="center">area</td><td align="center">string</td><td align="center">地区</td></tr>
<tr><td align="center">signature</td><td align="center">string</td><td align="center">个性签名</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success","info":{"name":"\u6e38\u8857","birthday":120000,"sex":"male","phone_num":"13618074451","email":"barco@dasudian.com","area":"\u5e7f\u4e1c/\u6df1\u5733","portrait":"8vcKSfPVD9U1jR5EAq","signature":"Change the world!"}}             
  

## 8.设置头像

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/update_portrait`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`,在请求时必须带上服务器返回的`cookie`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl https://aaa.dasudian.net/update_portrait -v -i -k -XPOST -H "Content-Type: image/png" --data-binary @/home/dasudian/test.png --cookie "_Dasudian_Auth=g2gDaARrACBjOGMxOWViNjc5NzY3OWI3ODAwOWQxMTlmZjY5ZWJiOW0AAAAEdGVzdGgCaANiAAAH32EFYQtoA2ELYTJhIG0AAABR1Brh37P2scdkhXSftzn2QAJN78ZPeFMV3zUlTWcw21HYYcNKZZmfftUyNPQ%2BDDINtYmcbyL9z6%2Bmulx8jqcaFYYPnldoWSqzS8UtG%2BGZpiJ%2BawAUMjdlZDI5YTQxY2RlNGI4YjJjMDJtAAAAFNC5w3GjDdhBNN9VF0m%2BAB1nxFPN; Version=1; Expires=Mon, 11-May-2015 03:50:32 GMT; Max-Age=604800; Domain=dasudian.net; Path=/; HttpOnly" -d '{"token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
<tr><td align="center">portrait</td><td align="center">string</td><td align="center">头像地址</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success","portrait":"8vcKSfPVD9U1jR5EAq"}      
           

## 9.获取验证码

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/request_vericode`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">phone_num</td><td align="center">string</td><td align="center">是</td><td align="center">手机号码</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl https://aaa.dasudian.net/request_vericode -v -k -XPOST -H"Content-Type: application/json" -d '{"phone_num": "13618074451","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
<tr><td align="center">veri_code</td><td align="center">string</td><td align="center">验证码</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success","veri_code":"pinysl"}
                 
                 
## 10.忘记密码

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/forget_password`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`,在请求时必须带上请求验证码时服务器返回的`cookie`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">phone_num</td><td align="center">string</td><td align="center">是</td><td align="center">手机号码</td></tr>
<tr><td align="center">veri_code</td><td align="center">string</td><td align="center">是</td><td align="center">验证码</td></tr>
<tr><td align="center">password</td><td align="center">string</td><td align="center">是</td><td align="center">密码</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl https://aaa.dasudian.net/forget_password -v -k -XPOST -H"Content-Type: application/json" --cookie "_Dasudian_Auth=g2gDaARrACBjOGMxOWViNjc5NzY3OWI3ODAwOWQxMTlmZjY5ZWJiOW0AAAAEdGVzdGgCaANiAAAH32EFYQtoA2ELYTJhIG0AAABR1Brh37P2scdkhXSftzn2QAJN78ZPeFMV3zUlTWcw21HYYcNKZZmfftUyNPQ%2BDDINtYmcbyL9z6%2Bmulx8jqcaFYYPnldoWSqzS8UtG%2BGZpiJ%2BawAUMjdlZDI5YTQxY2RlNGI4YjJjMDJtAAAAFNC5w3GjDdhBNN9VF0m%2BAB1nxFPN; Version=1; Expires=Mon, 11-May-2015 03:50:32 GMT; Max-Age=604800; Domain=dasudian.net; Path=/; HttpOnly" -d '{"phone_num": "13618074451", "veri_code":"pinysl", "password":"Ibelieve","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success"}  

                     
## 11.修改密码

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/change_password`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`,在请求时必须带上登录时服务器返回的`cookie`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">old_password</td><td align="center">string</td><td align="center">是</td><td align="center">旧密码</td></tr>
<tr><td align="center">new_password</td><td align="center">string</td><td align="center">是</td><td align="center">新密码</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl https://aaa.dasudian.net/change_password -v -k -XPOST -H"Content-Type: application/json" --cookie "_Dasudian_Auth=g2gDaARrACBjOGMxOWViNjc5NzY3OWI3ODAwOWQxMTlmZjY5ZWJiOW0AAAAEdGVzdGgCaANiAAAH32EFYQtoA2ELYTJhIG0AAABR1Brh37P2scdkhXSftzn2QAJN78ZPeFMV3zUlTWcw21HYYcNKZZmfftUyNPQ%2BDDINtYmcbyL9z6%2Bmulx8jqcaFYYPnldoWSqzS8UtG%2BGZpiJ%2BawAUMjdlZDI5YTQxY2RlNGI4YjJjMDJtAAAAFNC5w3GjDdhBNN9VF0m%2BAB1nxFPN; Version=1; Expires=Mon, 11-May-2015 03:50:32 GMT; Max-Age=604800; Domain=dasudian.net; Path=/; HttpOnly" -d '{"old_password":"Ibelieve", "new_password":"Iloveyou","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success"}                      
    
    
## 12.修改用户名称

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/change_name`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`,在请求时必须带上登录时服务器返回的`cookie`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">name</td><td align="center">string</td><td align="center">是</td><td align="center">新名字</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl https://aaa.dasudian.net/change_name -v -k -XPOST -H"Content-Type: application/json" --cookie "_Dasudian_Auth=g2gDaARrACBjOGMxOWViNjc5NzY3OWI3ODAwOWQxMTlmZjY5ZWJiOW0AAAAEdGVzdGgCaANiAAAH32EFYQtoA2ELYTJhIG0AAABR1Brh37P2scdkhXSftzn2QAJN78ZPeFMV3zUlTWcw21HYYcNKZZmfftUyNPQ%2BDDINtYmcbyL9z6%2Bmulx8jqcaFYYPnldoWSqzS8UtG%2BGZpiJ%2BawAUMjdlZDI5YTQxY2RlNGI4YjJjMDJtAAAAFNC5w3GjDdhBNN9VF0m%2BAB1nxFPN; Version=1; Expires=Mon, 11-May-2015 03:50:32 GMT; Max-Age=604800; Domain=dasudian.net; Path=/; HttpOnly" -d '{"name":"游街","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success"}
          

## 13.修改个性签名

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/change_signature`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`,在请求时必须带上登录时服务器返回的`cookie`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">signature</td><td align="center">string</td><td align="center">是</td><td align="center">新签名</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl https://aaa.dasudian.net/change_signature -v -k -XPOST -H"Content-Type: application/json" --cookie "_Dasudian_Auth=g2gDaARrACBjOGMxOWViNjc5NzY3OWI3ODAwOWQxMTlmZjY5ZWJiOW0AAAAEdGVzdGgCaANiAAAH32EFYQtoA2ELYTJhIG0AAABR1Brh37P2scdkhXSftzn2QAJN78ZPeFMV3zUlTWcw21HYYcNKZZmfftUyNPQ%2BDDINtYmcbyL9z6%2Bmulx8jqcaFYYPnldoWSqzS8UtG%2BGZpiJ%2BawAUMjdlZDI5YTQxY2RlNGI4YjJjMDJtAAAAFNC5w3GjDdhBNN9VF0m%2BAB1nxFPN; Version=1; Expires=Mon, 11-May-2015 03:50:32 GMT; Max-Age=604800; Domain=dasudian.net; Path=/; HttpOnly" -d '{"signature":"Change the world!","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success"}  
             
             
## 14.同步联系人

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/sync_contact`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`,在请求时必须带上登录时服务器返回的`cookie`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">contacts</td><td align="center">string</td><td align="center">是</td><td align="center">联系人列表</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl https://aaa.dasudian.net/sync_contact -v -k -XPOST -H"Content-Type: application/json" --cookie "_Dasudian_Auth=g2gDaARrACBjOGMxOWViNjc5NzY3OWI3ODAwOWQxMTlmZjY5ZWJiOW0AAAAEdGVzdGgCaANiAAAH32EFYQtoA2ELYTJhIG0AAABR1Brh37P2scdkhXSftzn2QAJN78ZPeFMV3zUlTWcw21HYYcNKZZmfftUyNPQ%2BDDINtYmcbyL9z6%2Bmulx8jqcaFYYPnldoWSqzS8UtG%2BGZpiJ%2BawAUMjdlZDI5YTQxY2RlNGI4YjJjMDJtAAAAFNC5w3GjDdhBNN9VF0m%2BAB1nxFPN; Version=1; Expires=Mon, 11-May-2015 03:50:32 GMT; Max-Age=604800; Domain=dasudian.net; Path=/; HttpOnly" -d '{"contacts":["13761975289","+8618565618719","18565618719"],"token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success"}  
                 

### 15.获取联系人

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/get_contact`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`,在请求时必须带上登录时服务器返回的`cookie`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">contacts</td><td align="center">string</td><td align="center">是</td><td align="center">联系人列表</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>

### 请求实例

    curl https://aaa.dasudian.net/get_contact -v -k -XPOST -H"Content-Type: application/json"  -d '{"phone_num":"13618074451","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
<tr><td align="center">phone_number</td><td align="center">string</td><td align="center">电话号码</td></tr>
<tr><td align="center">contacts</td><td align="center">string</td><td align="center">联系人列表</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success","phone_number":"13618074451","contacts", ["13761975289","+8618565618719","18565618719"]}}
                      

## 16.从qq拉取用户信息并保存

用户通过App 进行oauth授权后（由App 完成），AAA 系统可以从qq服务器拉取用户信息并保存

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/qq_oauth2`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">uid</td><td align="center">string</td><td align="center">是</td><td align="center">即openid 	用户的ID，与QQ号码一一对应。</td></tr>
<tr><td align="center">access_token</td><td align="center">string</td><td align="center">是</td><td align="center">使用Authorization_Code获取</td></tr>
<tr><td align="center">appid</td><td align="center">string</td><td align="center">是</td><td align="center">在大数点开发平台创建应用时由大数点提供的唯一Id</td></tr>
<tr><td align="center">consumer_key</td><td align="center">string</td><td align="center">是</td><td align="center">即oauth_consumer_key 	申请QQ登录成功后，分配给应用的appid</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>


### 请求实例

    curl https://aaa.dasudian.net/qq_oauth2 -v -k -XPOST -H"Content-Type: application/json"  -d '{"uid":"B36DAECCCB8BAEDB73901211CA983DDD","access_token":"4D732B0E58BA3949FF78E7CDCF673799","appid":"102_A_123","consumer_key":"1104748755","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
<tr><td align="center">user_id</td><td align="center">string</td><td align="center">即openid 	用户的ID，与QQ号码一一对应。</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success","user_id":"B36DAECCCB8BAEDB73901211CA983DDD"} 
                          
                          
## 17.从wechat拉取用户信息并保存

用户通过App 进行oauth授权后（由App 完成），AAA 系统可以从wechat服务器拉取用户信息并保存

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/wechat_oauth2`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">uid</td><td align="center">string</td><td align="center">是</td><td align="center">即openid 	用户的唯一标识。</td></tr>
<tr><td align="center">access_token</td><td align="center">string</td><td align="center">是</td><td align="center">调用接口凭证,由微信提供</td></tr>
<tr><td align="center">appid</td><td align="center">string</td><td align="center">是</td><td align="center">在大数点开发平台创建应用时由大数点提供的唯一Id</td></tr>
<tr><td align="center">consumer_key</td><td align="center">string</td><td align="center">是</td><td align="center">即oauth_consumer_key 	申请QQ登录成功后，分配给应用的appid</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>


### 请求实例

    curl https://aaa.dasudian.net/wechat_oauth2 -v -k -XPOST -H"Content-Type: application/json"  -d '{"uid":"ol3mowZbXbnon9RIa9WN0ZRSHgog","access_token":"OezXcEiiBSKSxW0eoylIeBC_zks4eNeowidNnxPR-B88SUtdMKtz1mfO7xhtyToJsYU0b6cyAHU5qDhOmVB23XGQQJRmR9D0MFk40zor-A668QKeu4QVzKZWWkr10ZdCTCI2iF-icsDNUzeFoTMPLg","appid":"102_A_123","token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
<tr><td align="center">user_id</td><td align="center">string</td><td align="center">即openid 	用户的唯一标识。</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success","user_id":"ol3mowZbXbnon9RIa9WN0ZRSHgog"}     
                           
                           
## 18.从服务器上获取保存的QQ和wechat授权用户信息

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/oauth_user_info`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">uid</td><td align="center">string</td><td align="center">是</td><td align="center">即openid 	用户的唯一标识。</td></tr>
<tr><td align="center">type</td><td align="center">int</td><td align="center">是</td><td align="center"> 1 -> QQ 2 -> WeChat </td></tr>
<tr><td align="center">appid</td><td align="center">string</td><td align="center">是</td><td align="center">在大数点开发平台创建应用时由大数点提供的唯一Id</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
</tbody>
</table>


### 请求实例

    curl https://aaa.dasudian.net/oauth_user_info -v -k -XPOST -H"Content-Type: application/json"  -d '{"uid":"B36DAECCCB8BAEDB73901211CA983DDD","type":1,"appid":"102_A_123"，"token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
<tr><td align="center">user_id</td><td align="center">string</td><td align="center">即openid 	用户的唯一标识。</td></tr>
<tr><td align="center">nickname</td><td align="center">string</td><td align="center">用户昵称</td></tr>
<tr><td align="center">headimgurl</td><td align="center">string</td><td align="center">用户头像url</td></tr>
<tr><td align="center">province</td><td align="center">string</td><td align="center">省</td></tr>
<tr><td align="center">city</td><td align="center">string</td><td align="center">市</td></tr>
<tr><td align="center">country</td><td align="center">string</td><td align="center">国家</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success","user_info":{"user_id":"B36DAECCCB8BAEDB73901211CA983DDD","nickname":"\u98ce\u4e91\u518d\u8d77","sex":"\u7537","headimgurl":"http://q.qlogo.cn/qqapp/1104748755/B36DAECCCB8BAEDB73901211CA983DDD/100","province":"\u5e7f\u4e1c","city":"\u6c55\u5934","country":"none"}}


## 18.从服务器上获取保存的QQ和wechat授权用户信息列表

### 请求方法

请求时使用`POST`方式请求`https://aaa.dasudian.net/oauth_users_info_list`，`domain`为要请求服务器的地址
注:`Content-Type`请设置为`Content-Type:application/json`

### 请求参数说明

请求参数统一使用`Json`格式，字段说明如下：
<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">uid</td><td align="center">string</td><td align="center">是</td><td align="center">即openid 	用户的唯一标识。</td></tr>
<tr><td align="center">type</td><td align="center">int</td><td align="center">是</td><td align="center"> 1 -> QQ 2 -> WeChat </td></tr>
<tr><td align="center">appid</td><td align="center">string</td><td align="center">是</td><td align="center">在大数点开发平台创建应用时由大数点提供的唯一Id</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">用户请求auc_app接口时返回</td></tr>
<tr><td align="center">start</td><td align="center">int</td><td align="center">是</td><td align="center">请求起始位置</td></tr>
<tr><td align="center">rows</td><td align="center">int</td><td align="center">是</td><td align="center">请求行数</td></tr>
</tbody>
</table>


### 请求实例

    curl https://aaa.dasudian.net/oauth_users_info_list -v -k -XPOST -H"Content-Type: application/json"  -d '{"uid":"B36DAECCCB8BAEDB73901211CA983DDD","type":1,"appid":"102_A_123","start":0,"rows":10,"token":"g2gCaAJoA2IAAAfgYQNhHGgDYQthLWEUbQAAAKbUGuHfs%2FaxwGSFdpqqNJo0ZUDrsjsZEVKyM1RIHnq4Wp5%2B2BFU6KhB2jxupmJcaUj03cs1dqeZ87XmbFjZvU9A3zblWncOe%2B5OkSZP58%2BnKSz9igQ0GURTqwLJ9l99vwB5WZ2sSGwrQZriSJ9Mq9bnDhUUHZ3LT45uCvUM%2FzgW9OZZAsp88xQfZ96vvUG%2FXV0mgJDZsIqMarVufoqqSSunO%2F43NM3f"}'

### 返回结果说明

返回结果也统一使用`Json`格式，`Content-Type`为`Content-Type:application/json`，字段说明如下：

<table  border="1" width="600px">
<tbody>
<tr style="background-color:#EDEDED"><td align="center">名称</td><td align="center">类型</td><td align="center">说明</td></tr>
<tr><td align="center">result</td><td align="center">string</td><td align="center">请求结果，success:成功 fail:失败</td></tr>
<tr><td align="center">user_id</td><td align="center">string</td><td align="center">即openid 	用户的唯一标识。</td></tr>
<tr><td align="center">nickname</td><td align="center">string</td><td align="center">用户昵称</td></tr>
<tr><td align="center">headimgurl</td><td align="center">string</td><td align="center">用户头像url</td></tr>
<tr><td align="center">province</td><td align="center">string</td><td align="center">省</td></tr>
<tr><td align="center">city</td><td align="center">string</td><td align="center">市</td></tr>
<tr><td align="center">country</td><td align="center">string</td><td align="center">国家</td></tr>
<tr><td align="center">total_num_</td><td align="center">int</td><td align="center">总条数</td></tr>
</tbody>
</table>

### 返回实例
    {"result":"success","users_info":[{"user_id":"B36DAECCCB8BAEDB73901211CA983DDD","nickname":"\u98ce\u4e91\u518d\u8d77","sex":"\u7537","headimgurl":"http://q.qlogo.cn/qqapp/1104748755/B36DAECCCB8BAEDB73901211CA983DDD/100","province":"\u5e7f\u4e1c","city":"\u6c55\u5934","country":"none"}],"total_num":1}
