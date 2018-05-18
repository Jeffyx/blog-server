# 运行环境

```javascript
/*
NodeJS v8.0+
npm & cnpm & yarn
Postgresql 9.5+
Pm2 //生产环境守护进程
Nginx & Apache //生产环境代理请求
*/
```

# 启动脚本
```javascript

npm i //安装依赖
//*修改config 下的dbConfig.js 文件连接数据库
npm run init_db //初始化数据库表
npm run dev //启动项目
// 'http://localhost:3000'
```

# Nginx 配置
```javascript

// $ vim /etc/nginx/nginx.conf
/*
  http {
    server {
      listen 80;
      server_name yourdomin.com;
      location / {
        proxy_pass http:127.0.0.1:3000;
      }
    }
    //https
    server {
      listen 443;
      server_name yourdomin.com;
      ssl on;
      ssl_certificate fullchain.cer; //ssl证书fullchain.cer的路径
      ssl_certificate_key yourdomin.key; //key的路径
      location / {
        proxy_pass http://127.0.0.1:3000;
      }
    }
  }
*/

```
# 目录结构

```javascript
/*
  config
  --dbConfig.js  //数据连接配置
  --logConfig  //log记录配置
  --responseCode //自定义的错误代码
  contoroller //代码逻辑在这里
  --article.js //.....
  db //数据库方法封装
  --index.js
  --init //初始化数据库表
  ----index.js
  ----dbCreate.js //创建表语句
  logs //log目录
  --error
  --response
  router //路由目录
  --index.js
  --v1 //api版本
  sentence //分离sql语句目录
  --article.js //....
  utils  //功能函数方法目录
  app.js  //入口文件
  .vscode  //vscode本地调试配置
*/
```

# 接口文档

###	 状态码参照

```javascript
{ code:200, msg:"ok" } 

{ code: 201, msg: "参数错误" };
      
{ code: 202, msg: "token信息失效" };

{ code: 203, msg: "密码错误" };

{ code: 204, msg: "用户名不存在" };

{ code: 205, msg: "用户名已存在" };

{ code: 500, msg: "服务器出错" };
```



### 说明

```javascript
参数中带有 * 号的为必须项参数，增删改请求需要带上 token 并且token需要放在请求头header中。
```



### 用户 User

- 登录

  ```javascript
  地址："/user/login"
  类型: post
  说明：密码MD5加密后上传

  请求参数：
  {
    user_name*:"用户名",
    password*:"密码"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情",
    token:"登录身份令牌，需要存起来后面有些借口需要验证token的有效性",
    data:[
      {
        id:"用户id",
        user_name:"用户名",
        create_time:"创建时间",
        phone: "手机",
        address: "地址",
        head: "头像地址",
        email: "邮箱",
        nick: "昵称",
        lv: 3 "等级"
      }
    ]
  }

  响应示例：

  {
    "code": 200,
    "msg": "登录成功",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNTI0MjA1MzEzLCJleHAiOjE1MjQzMTMzMTN9.08-XLCB4Ic_bCvzNCvG8qDdZtLIOiW1DeozlQpf63Qs",
    "data": [
        {
            "id": "fd0fd023-c739-4df1-a7a3-b8195d4c93ff",
            "user_name": "jeffy",
            "create_time": "1524205287882",
            "phone": null,
            "address": null,
            "head": null,
            "email": null,
            "nick": null,
            "lv": 3
        }
      ]
   }
  ```


- 用户注册

  ```javascript
  地址："/user"
  类型: post
  说明：密码MD5加密后上传

  请求参数：
  {
    user_name*:"用户名",
    password*:"密码"
  }
  响应参数
  {
    code："状态码",
    msg："状态详情",
    token:"登录身份令牌，需要存起来后面有些借口需要验证token的有效性",
    data:[
      {
        id:"用户id",
        user_name:"用户名",
        create_time:"创建时间",
        phone: "手机",
        address: "地址",
        head: "头像地址",
        email: "邮箱",
        nick: "昵称",
        lv: 3 "等级"
      }
    ]
  }
  ```



- 修改用户信息

  ```JavaScript
  地址："/user"
  类型: put
  说明：密码MD5加密后上传,用于用户登陆后个人中心修改详细信息,*号为必需项

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    id*:"用户id"
    phone:"电话号码", 
    address:"地址", 
    head:"用户头像，图片地址", 
    email:"邮箱", 
    nick:"用户昵称"
  }
  相应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  ```
- 修改密码

  ```javascript
  地址："/user/pwd"
  类型: post
  说明：密码MD5加密后上传

  请求参数：
  {
    user_name*:"用户名",
    oldpwd*:"原密码",
    newpwd*:"新密码"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  
  ```


### 用户信息

- 获取用户信息

  ````javascript
  地址："/getinfo"
  类型: post
  说明：单独获取用户信息

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    user_name*:"用户名"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  ````

  ​

###  分类 Category

- 添加分类

  ```javascript
  地址："/category"
  类型: post
  说明：添加分类信息 文章分类 别名必须为英文

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    name*:"分类名称",
    alias*:"分类别名，英文"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }

  ```

- 获取分类信息

  ```JavaScript
  地址："/category"
  类型: get
  说明：添加分类信息 文章分类 别名必须为英文

  请求参数：无
   
  响应参数：
  {
    code："状态码",
    msg："状态详情",
    data:[
        {
          id:"分类id",
          category:"分类名",
          alias:"分类别名，英文"
        }
     ]
  }
  响应示例：
  {
    "id": "761f74bf-df52-48f1-8ff1-e21090ca8043",
    "category": "分享",
    "alias": "share"
  }
  ```

- 修改分类名称

  ```javascript
  地址："/category"
  类型: put
  说明：修改分类信息 文章分类 别名必须为英文

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    id*:"分类id",
    name*:"分类名称",
    alias*:"分类别名，英文"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  ```

- 删除分类

  ```javascript
  地址："/category"
  类型: delete
  说明：删除分类信 删除分类会连同该分类下的所有文章 一起删除，需要警告确认

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    id*:"分类id",
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  ```


### 文章 Article

- 添加文章

  ```JavaScript
  地址："/article"
  类型: post
  说明：添加文章

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    title*:"文章标题",
    article*:"文章内容",
    category_id*:"分类id",
    author*:"作者，用户名",
    abstract*:"摘要"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  ```

- 获取文章列表

  ```JavaScript
  地址："/article/list"
  类型: get
  说明：获取多个文章

  请求参数：
  {
    category_id:"分类id，为空则,默认返回所有分类下的文章",
    total:"一次行返回的文章数目，默认为10",
    page:"返回列表的页码默认为第一页"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情",
    data:[
       {
     	   id:"文章id",
         title:"标题",
         abstract:"摘要内容",
         category:"分类名",
         categoty_id:"分类id",
         author:"作者",
         create_time:"创建的时间",
         modify_time:"修改的时间"，
         m_count:'评论总数字'
       }
     ]
  }

      响应示例：
      {
          "code": 200,
          "msg": "成功",
          "data": [
              {
                  "id": "2189a619-1b09-4f9d-b521-19465a8d3c84",
                  "title": "Hello World",
                  "abstract": "this is my one article",
                  "category": "分享",
                  "category_id": "13d16d0c-f71d-4257-95e7-55e8864b99ba",
                  "create_time": "1524208426134",
                  "modify_time": null,
                  "author": "jeffy",
                  "m_count" 0
              },
              {
                  "id": "2189a619-1b09-4f9d-b521-19465a8d3c84",
                  "title": "Hello World",
                  "abstract": "this is my one article",
                  "category": "分享",
                  "category_id": "13d16d0c-f71d-4257-95e7-55e8864b99ba",
                  "create_time": "1524208426134",
                  "modify_time": null,
                  "author": "jeffy",
                  "m_count": 1
              }
          ]
      }
  ```

- 获取文章详情（一个文章）

  ```JavaScript
  地址："/article"
  类型: get
  说明：获取文章详情

  请求参数：
  {
    id*:"文章的id"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情",
    data:{
       article:[ //文章详情
          {
          id:"文章id",
          title:"标题",
          article:"文章内容",
          abstract:"摘要内容"
          category:"分类名",
          categoty_id:"分类id",
          author:"作者",
          create_time:"创建的时间，时间戳",
          modify_time:"修改的时间，时间戳"
        }
       ],
       comment:[ //该文章下的所有评论
         {
           id:'comment id',
           comment:'评论内容',
           article_id:'文章id',
           parent_id:'回复评论的id，为空则代表一级评论，parent_id对应回复的评论id'，
           user_name:'当前评论的用户名',
           create_time:'评论创建的时间',
           client:'评论时使用的客户端',
           address:'评论的ip地址'
         }
       ]
     }
    }

      响应示例：
      {
          "code": 200,
          "msg": "成功",
          "data": {
            article:[
              {
                  "id": "2189a619-1b09-4f9d-b521-19465a8d3c84",
                  "title": "Hello World",
                  "article": "this is my one article",
                  "category": "分享",
                  "category_id": "13d16d0c-f71d-4257-95e7-55e8864b99ba",
                  "create_time": "1524208426134",
                  "modify_time": null,
                  "author": "jeffy"，
                  "abstract":"akjaghsd"
              }
            ],
          comment:[
                {
                id:'aklshdhaui79798',
                comment:'hahahaha',
                article_id:'097ajksddhkjahj',
                parent_id:'8a7a67dskjhsaldk'，
                user_name:'jeffy',
                create_time:'2018-01-01',
                client:'Chrome',
                address:'127.0.0.1'
              }
            ]
          }
      }

  ```

- 修改文章

  ```JavaScript
  地址："/article"
  类型: put
  说明：修改文章

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    id*:"文章id",
    title:"标题",
    article:"文章内容",
    category_id:"分类id",
    author:"作者",
    abstract:"摘要"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  ```

- 删除文章（单个）

  ```JavaScript
  地址："/article"
  类型: delete
  说明：获取文章详情

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    id*:"文章的id"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  ```

### 评论 Comment

- 获取评论内容

  ```javascript
  地址："/comment"
  类型: get
  说明：获取评论内容

  请求参数：
  {
    article_id*:"当前文章的id"
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
    data: [
        {
           id:'comment id',
           comment:'评论内容',
           article_id:'文章id',
           parent_id:'回复评论的id，为空则代表一级评论，parent_id对应回复的评论id'，
           user_name:'当前评论的用户名',
           create_time:'评论创建的时间',
           client:'评论时使用的客户端',
           address:'评论的ip地址'
         }
    ]
  }
  响应示例：
  {
      code:200,
      msg:'ok',
      data:[
              {
                id:'aklshdhaui79798',
                comment:'hahahaha',
                article_id:'097ajksddhkjahj',
                parent_id:'8a7a67dskjhsaldk'，
                user_name:'jeffy',
                create_time:'2018-01-01',
                client:'Chrome',
                address:'127.0.0.1'
             }
          ]
  }
  ```

- 添加一条评论

  ```javascript
  地址："/comment"
  类型: post
  说明：获取评论内容

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    article_id*:"当前文章的id",
    user_id*:'当前评论用户的用户id',
    comment*:'评论内容',
    parent_id:'为空则为一级评论，如果有认为是回复，parent_id是回复的评论id'
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  ```

- 删除一条评论

  ```javascript
  地址："/comment"
  类型: delete
  说明：获取评论内容

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    id*:'当前评论的id'
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  ```
### 相册 Photo
- 添加相册
  ```javascript
  地址：'/photo'
  类型：post
  说明：src为一个数组

  请求参数：
  token:"用户登录时的token，需要放在请求头haeder中传递"
  {
    src:'用户上传的图片地址集合Array',
    remark:'相册说明或备注',
    title:'标题',
    user_id:'用户id'
  }
  响应参数：
  {
    code："状态码",
    msg："状态详情"
  }
  ```
- 获取相册列表&详情&用户分下的列表
  ```javascript
  地址：'/photo'
   类型：get
   说明：id和user_id都为空获取全部相册，只传id获取相册详情，只传user_id获取该用户的相册
 
   请求参数：
   token:"用户登录时的token，需要放在请求头haeder中传递"
   {
     id:'相册id',
     user_id:'用户id'
   }
   响应参数：
   {
     code："状态码",
     msg："状态详情",
     data:[
       {
         id:'相册id',
         src:'照片地址列表',
         remark:'备注',
         title:'标题',
         user_id:'用户id',
         create_time:'创建时间',
         author:'作者名'
       }
     ]
   }
  ```
- 删除相册
  ```javascript
   地址：'/photo'
   类型：delete
   说明： 
 
   请求参数：
   token:"用户登录时的token，需要放在请求头haeder中传递"
   {
     id:'相册id',
   }
   响应参数：
   {
     code："状态码",
     msg："状态详情",
   }
  ```