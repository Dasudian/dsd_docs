---
title: "CloudFile API"
currentMenu: cf-api
parent1: dsd-cloudfile
---

# 大数点 cloud-file 使用指导

## 1. 上传
目前支持的上传方式为表单上传，开发者只要组装一个符合HTML文件上传表单规范（参见[RFC1867](http://www.ietf.org/rfc/rfc1867.txt)）的HTTP请求，并以POST方式向域名`upload.dasudian.com`发起这个请求，即可将指定文件上传到服务端。业务逻辑非常简单明了。
#### 上传方法
我们可以用如下的HTML表单来描述表单上传的基本用法：
    
```html
<form method="post" action="http://cf.dasudian.net/"
     enctype="multipart/form-data">
     <input name="token" type="hidden" value="<access_token>">
     <input name="<custom_name>" type="hidden" value="<custom_value>">
     <input name="timeout">
     <input name="privacy">
     <input name="file" type="file" />
</form>

```  
 HTML表单上传的几个关键参数说明如下：  
 
<table  border="1" width="600px">
<tbody>
<tr><td align="center">名称</td><td align="center">类型</td><td align="center">必填</td><td align="center">说明</td></tr>
<tr><td align="center">token</td><td align="center">string</td><td align="center">是</td><td align="center">必须是一个符合相应规格的上传凭证，</br>否则会返回401表示权限认证失败。(从auc_app获取)</td></tr>
<tr><td align="center">超时类型</td><td align="center">integer</td><td align="center">否</td><td align="center">1 deleted upon retrieved the first time, 0 store forever, integer > 0, seconds to be deleted  default 0</td></tr>
<tr><td align="center">加密</td><td align="center">integer</td><td align="center">否</td><td align="center">0 public;1 all apps belong to same customerid;2 all users with the same app; 3 specific user of specific app;  default 0</td></tr>
<tr><td align="center">file</td><td align="center">file</td><td align="center">是</td><td align="center">文件本身。</td></tr>
<tr><td align="center">custom_field_name</td><td align="center">string</td><td align="center">否</td><td align="center">自定义变量，不限个数，不作处理返回。</td></tr>
</tbody>
</table>
<br>
提交以上这个HTML表单而生成的HTTP请求内容大致如下所示：

    POST http://cf.dasudian.net/
    Content-Type: multipart/form-data; boundary=<Boundary>
    --<Boundary>
  
     Content-Disposition: form-data; name="token"
    <upload_token>
    --<Boundary>
  
    Content-Disposition: form-data; name="<custom_field_name>"
    <custom_value>
    --<Boundary>

    Content-Disposition: form-data; name="file"; filename="[文件名]"
    Content-Type: <MimeType>
    [文件内容]
    --<Boundary>--

返回的结果为json数据，内容大致如下：

    {
        "result":"success",
        "url":"http://download.dasudian.com:8000/123/123_A_123/12/93REMN5VFPLJSDcbKq/17.jpg?AWSAccessKeyId=T-FGB15VTLYJFCK1CUSY&Signature=Wx7f%2F%2Bw6OAoEXVLZ9ixg0E5E4XY%3D&Expires=0",
        "filename":"17.jpg",
        "filetype":"image/jpeg",
        "<custom_filed_name>":"<custom_value>"
    }

## 2. 下载
下载的方式相当简单利用上传时返回的链接，将token拼接在链接后便可下载。
### 下载方法

请求链接格式如下所示（与上传时的token获取方法一致）：

    http://download.dasudian.com:8000/123/123_A_123/12/93REMN5VFPLJSDcbKq/17.jpg?AWSAccessKeyId=T-FGB15VTLYJFCK1CUSY&Signature=Wx7f%2F%2Bw6OAoEXVLZ9ixg0E5E4XY%3D&Expires=0&token=g2gCaAJoA2IAAAffYQxhHmgDYRJhAWEVbQAAAGjUGuHfs%2FaxwGSFbZqrPq51M0jrxCcNOBHaNH5%2BVTnaAuoe2lRgwapX3DlvpWZabErw38o0f6SW%2BOj8bFnXkG5M3lCTATJKObAazHATsp7zO3%2FLpw83SRRRpgbQ9w1y2i4vT8utHmQtHQ%3D%3D
