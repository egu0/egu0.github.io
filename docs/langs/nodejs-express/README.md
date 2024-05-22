---
sidebarDepth: 2
sidebar: auto
---



# Express 入门

## 了解和安装

```sh
npm install express
```

## 基础程序

```js
// 1. 引入 express
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3. 创建路由
app.get('/hello', (req, res) => {
    res.end('hello express');
})

// 4. 监听端口
app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

## 路由

### 路由-基础

何为路由？路由确定了应用程序**如何响应**客户端对特定端点的**请求**

如何使用？

一个路由的组成包括**请求方法**、**路径**和**回调函数**。express 中提供了一系列方法，可以很方便的使用路由，格式如下：

```
app.METHOD(PATH, CALLBACK)
```

示例程序

```js
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.end('hello express');
})

// 首页
app.get('/', (req, res) => {
    res.end('index page');
})

// 接收 post 请求
app.post('/login', (req, res) => {
    res.end('login page');
})

// 允许所有的请求方法
app.all('/test', (req, res) => {
    res.end('test page');
})

// 找不到端点的请求由此路由处理
app.all('*', (req, res) => {
    res.end('404 page');
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

```html
<body>
    <form action="http://localhost:3000/login" method="post">
        <input type="submit" value="提交"/>
    </form>
</body>
```

### 路由-查询参数

```js
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    const infoStr = `method: ${req.method}\n
        url: ${req.url}\n
        httpVersion: ${req.httpVersion}\n
        headers: ${JSON.stringify(req.headers)}\n
        path: ${req.path}\n
        query: ${JSON.stringify(req.query)}\n
        ip: ${req.ip}\n
        host: ${req.host}\n
        protocol: ${req.protocol}\n
        secure: ${req.secure}\n`;

    /*
    req.path: 请求路径，即 uri，不带查询参数
    req.query: 查询参数
     */

    res.end(infoStr);
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

### 路由-路由参数

RESTful 风格下的路由常使用带有路由参数的路由，比如 `PUT /goods/2`

示例：使用路由参数、获取路由参数

```js
const express = require('express');

const app = express();

app.get('/book/:id.html', (req, res) => {
    res.end(`
    <h1>Book No.${req.params.id}</h1>
    <p>...</p>
    `);
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

其他格式

```
'/abc?d' -> c 出现0次或1次，即匹配 /abd 和 /abcd
'/mn+pq' -> n 出现1次或多次，比如 /mnpq, /mnnpq ...
'/ab*yz' -> * 表示空或任意长度的串，比如 /abyz, /abxxxyz ...
'/x(cd)?y' -> 将 cd 看作整体，出现0次或1次，比如 /xcdy 和 /xy
```

正则表达式

```
/a/ -> 路径中包含 a 的，比如 /java
/.*fly$/ -> 以 fly 结尾的
----
app.get(/.*fly$/, (req, res) => {
    res.send(req.url);
})
```

### 路由-小练习

```js
const express = require('express');
const singers = require('./singers.json')

const app = express();

app.get('/singer/:id.html', (req, res) => {
    // 搜索 id 对应的歌手
    const singer = singers.find(item => item.id == req.params.id);

    // 如果没有找到对应的歌手，返回 404
    if (!singer) {
        res.status(404).end('Not Found');
        return;
    }

    // 返回对应的歌手信息
    res.end(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>${singer.name}</h1>
        <p>${singer.desc}</p>
    </body>
    </html>`);
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

## 响应设置-1

express 框架封装了一些 API 来给客户端响应数据，并且兼容原生 HTTP 模块的响应设置。

```js
app.get('/hello', (req, res) => {
    // 1. http 原生设置
    // res.statusCode = 404
    // res.statusMessage = 'Not Found'
    // res.setHeader('X-Powered-By', 'Express')
    // res.write('hello express, ')
    // res.end('end express')

    // 2. express 设置
    // res.status(404)
    // res.setHeader('X-Powered-By', 'Express')
    // res.set('X-Test', '123')
    // res.send('404 Not Found');

    // 3. express 链式写法
    res
        .status(404)
        .set('X-Powered-By', 'Express')
        .set('X-Test', '123')
        .send('404 Not Found');
})
```

## 响应设置-2

- `res.redirect()` 重定向
- `res.download()` 通过响应对象传输文件，响应体包含`Content-Disposition: attachment;`，往往会触发浏览器的“另存为”对话框
- `res.json(obj)` 返回 `application/json` 类型的响应体
- `res.sendFile()` 会根据文件类型设置`Content-Type`，比如 json 文件为`application/json`、图片为 `image/png`。发送的 html 文件可以显示在浏览器中

```js
app.get('/hello', (req, res) => {
    // 1.重定向，默认状态码为 302
    // res.redirect('http://www.taobao.com')

    // 2.通过响应对象传输文件
    // res.download('./singers.json', 'singers.json', (err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    // })

    // 3.响应JSON
    // res.json({
    //     name: '小明',
    //     age: 18
    // })

    // 4.响应文件
    res.sendFile(__dirname + '/singers.json', (err) => {
        if (err) {
            console.log(err);
        }
    })
})
```

## 中间件

**中间件本质是一个回调函数**，它可以像**路由回调**一样访问请求对象和响应对象。

> 路由回调：创建路由是传递的参数，比如 `app.get('/', routeCallback)`

中间件的作用：使用函数**封装公共操作**，减少代码冗余。

中间件的类型：

- 全局中间件：面向所有路由规则，比如解析所有请求的真实 ip 并记录日志
- 局部中间件：面向指定的路由规则，比如对需要鉴权的请求指定局部中间件
- 错误处理中间件
- 内置中间件，比如 `express.static()`
- 第三方中间件，比如 `cookie-parser`

### 中间件-全局

```js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

//声明中间件函数
function logMiddleware(req, res, next) {
    // 记录请求日志
    let { url, ip } = req;
    fs.appendFileSync(path.resolve(__dirname, './access.log'),
        `${new Date().toLocaleString()} ${ip} ${url}\n`);
    // 调用 next() 继续执行下一个中间件
    next();
}
// 为 app 添加全局中间件
app.use(logMiddleware);

app.get('/home', (req, res) => {
    res.send('home page');
})
app.get('/admin', (req, res) => {
    res.send('admin page');
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

### 中间件-局部

```js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// 检查请求参数是否符合要求。模拟鉴权
function checkMiddleware(req, res, next) {
    if (res.query?.code == '123') {
        next();
    } else {
        res.status(401).end('error');
    }
}

app.get('/home', (req, res) => {
    res.send('home page');
})

// 在路由中使用局部中间件
app.get('/admin', checkMiddleware, (req, res) => {
    res.send('admin page');
})
app.get('/setting', checkMiddleware, (req, res) => {
    res.send('setting page');
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

应用多个中间件：中间件是一个特殊的回调函数，它包括 next 参数，用以判断是否向下执行；而最后一个回调函数没有这个参数因为它已经处于最后一个位置，其后没有更多的用户代码需要执行

```js
function middleware1(req, res, next) { console.log('middleware1')
    next();
}
function middleware2(req, res, next) {
    console.log('middleware2')
    next();
}
const fun = (req, res) => {
    res.send('home page');
}
app.get('/home', middleware1, middleware2, (req, res) => {
    res.send('home page');
})
app.get('/abc1', [middleware1, middleware2, fun])
app.get('/abc2', [middleware1, middleware2], fun)
```

### 中间件-异常

```js
app.use('/home', homeRouter)
app.use('/login', loginRouter)

//放在最后。用于处理 404
app.use((req, res) => {
    res.status(404).send('not found')
})
```

### 中间件-内置

`express.static(dir)`会返回一个用于处理静态资源访问的中间件对象，属于**内置中间件**

```js
const express = require('express');

const app = express();

// 指定静态文件目录。会自动为响应体添加对应的 Content-Type
app.use(express.static(__dirname + '/public_static'));

app.get('/hello', (req, res) => {
    res.end('hello express');
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

注意：**如果定义的路由规则和文件名同名，会优先选择前者**。例如如果 `/public_static` 中包含 `index.html` 这个文件，那么访问 `localhost:3000` 时会访问到静态目录的 `index.html`。如果此时也定义了 `/` 这个路由规则，那么会优先使用路由规则中定义的回调函数。

## 请求体解析

```
npm i body-parser
```

```js
const express = require('express');

const bodyParser = require('body-parser');
// 解析请求体为 json 的中间件。可自行验证
// const jsonParser = bodyParser.json();

// 解析 urlencoded bodies 的中间件，比如表单：username=%E9%98%BF%E6%96%AF%E9%A1%BF%E4%B8%AA&password=123
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

const app = express();

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/11_login.html');
})

// urlencodedParser: 处理完后会在 req 中添加一个 body 属性
app.post('/login', urlencodedParser, (req, res) => {
    console.log(req.body);
    res.end('login success');
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

提交 post 请求的 html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h3>登录</h3>
    <form action="http://localhost:3000/login" method="post">
        用户名:<input type="text" name="username" /><br />
        密码:<input type="password" name="password" /><br />
        <input type="submit" value="提交" />
    </form>
</body>
</html>
```

## 防盗链

关键：**Referer 请求头**

[Referer 请求头](https://www.ruanyifeng.com/blog/2019/06/http-referer.html)主要在以下三种场景中被添加到请求中：

- 用户点击网页上的链接：当用户点击一个网页上的链接时，浏览器会在发出的请求中添加 Referer 字段，该字段的值为包含该链接的页面的 URL。
- 用户提交表单：当用户提交一个表单时，浏览器会在发出的请求中添加 Referer 字段，该字段的值为包含该表单的页面的 URL。
- 网页加载静态资源：当一个网页加载静态资源（如图片、脚本、样式等）时，浏览器会在发出的请求中添加 Referer 字段，该字段的值为加载该资源的页面的 URL。

防盗链实现思路：根据 referer 请求头确定请求是从哪个网站发出来的，如果不在白名单内则禁止访问

示例：自定义全局中间件，过滤掉 `referer` 请求头不符合要求的请求

```js

const express = require('express');

const app = express();

app.use((req, res, next) => {
    // 获取 referer(浏览器上的来源地址)
    const referer = req.get('referer')
    if (referer) {
        let url = new URL(referer);
        let origin = url.hostname
        const allow_origins = ['127.0.0.1']
        if (allow_origins.includes(origin)) {
            console.log(`允许来自 ${origin} 的访问`)
            next()
        } else {
            console.log(`不允许来自 ${origin} 的访问`)
            res.status(403).end('forbidden');
        }
    } else {
        next()
    }
})

app.use(express.static(__dirname + '/public_static'));

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

## 路由模块化

路由模块化：将路由分类，将同类路由放在一个模块中

比如1、创建路由模块 `homeRouter.js`

```js
const express = require('express');

//创建路由
const router = express.Router();

router.get('/home', (req, res) => {
    res.end('home page');
})

module.exports = router
```

`adminRouter.js`

```js
const express = require('express');

const router = express.Router();

router.get('/admin', (req, res) => {
    res.end('admin page');
})

module.exports = router
```

2、把他们应用到 app 中

```js
const express = require('express');

//引入多个 router 模块
const homeRouter = require('./routes/homeRouter')
const adminRouter = require('./routes/adminRouter')

const app = express();

//应用路由模块
app.use(homeRouter)
app.use(adminRouter)

app.get('/hello', (req, res) => {
    res.end('hello express');
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

## 模板引擎

模板引擎是**分离用户界面和业务数据**的一种通用的技术，随着前后端分离的流行，这种技术不如之前那么流行了，但并未完全消失

### EJS入门

EJS：Embedded JavaScript templating.

[EJS -- Embedded JavaScript templates](https://ejs.co/)

```
npm i ejs
```

基础示例

```js
const ejs = require('ejs')

let name = '王大锤'

// 创建模板（ejs 模板语法）
let template = '我爱你 <%= name %>'

// 使用 ejs 渲染模板
const res = ejs.render(template, { name })

console.log(res)
```

**进一步：读取外部 html 模板文件进行渲染**

`14_template_engine.js`

```js
const ejs = require('ejs')
const fs = require('fs')

let name = '王大锤'
let weather = '今天是晴天！'

let template = fs.readFileSync('./14_template.html').toString()

const res = ejs.render(template, { name, weather: weather })

console.log(res)
```

`14_template.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>您好，<%= name %>！</h2>
    <p>
        <%= weather %>
    </p>
</body>
</html>
```

注意：需要在命令行中进入 `14_template_engine.js` 所在目录，然后执行 `node 14_template_engine.js`

**列表渲染**

```js
const ejs = require('ejs')

let ppls = ['孙悟空', '猪八戒', '唐僧']

let template = `<ul>
    <% ppls.forEach((item) => { %>
        <li><%= item %></li>
    <% }) %>
</ul>
`

const res = ejs.render(template, { ppls })

console.log(res)
```

**条件渲染**

```js
const ejs = require('ejs')

let hasLogin = false

let template = `
<% if(hasLogin) { %>
    <h1>欢迎回来</h1>
<% } else { %>
    <h1>请先登录</h1>
<% } %>
`

const res = ejs.render(template, { hasLogin })

console.log(res)
```

### 整合EJS

在 Express 应用中使用 ejs 模板引擎

```js
const express = require('express');
const path = require('path');

const app = express();

//1.设置模板引擎
app.set('view engine', 'ejs');
//2.设置模板目录
app.set('views', path.resolve(__dirname, './17_views'));

app.get('/home', (req, res) => {
    //3.渲染模板
    res.render('home', { title: '测试' })
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

`17_views/home.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>
        <%= title %>
    </h2>
</body>
</html>
```

## 应用生成器

https://expressjs.com/en/starter/generator.html

```
npm install -g express-generator

#创建项目
express -e 18_by_generator
#-e: 支持 ejs
#18_by_generator: 目录名

cd 18_by_generator
npm install
npm start
```

熟悉初始项目

```
.
├── app.js
├── bin
│   └── www
├── node_modules
│   ├── accepts
│   ├── array-flatten
│   ├── ...
├── package.json
├── package-lock.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.ejs
    └── index.ejs
```

## 文件上传

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <!-- enctype="multipart/form-data": 上传文件时表单的必要属性 -->
    <form action="/profile" method="post" enctype="multipart/form-data">
        用户名：<input type="text" name="username"> <br>
        头像：<input type="file" name="avatar" /> <br>
        <input type="submit" value="提交" /> <br>
    </form>

</body>
</html>
```

接收文件。使用 formidable 模块

```
npm i formidable
```

```js
const express = require('express');
const path = require('path');
const formidable = require('formidable');

const app = express();

app.use(express.static(__dirname + '/public_static'));

app.get('/profile', (req, res) => {
    res.sendFile(path.resolve(__dirname, './19_page.html'));
})

app.post('/profile', (req, res) => {
    // 创建 form 对象
    const form = formidable({
        multiples: true,
        // 指定上传文件保存位置
        uploadDir: path.resolve(__dirname, './public_static/upload'),
        // 保存文件扩展名
        keepExtensions: true
    });
    // 解析表单
    form.parse(req, (err, fields, files) => {
        if (err) {
            return;
        }
        // 获取所上传文件的相对的访问路径
        let imageUrl = '/upload/' + files.avatar.newFilename;
        console.log(imageUrl);

        res.json({ fields, files });
    })
})

app.listen(3000, () => {
    console.log('express server running at http://127.0.0.1:3000');
})
```

## 案例实战

其他依赖

- [lowdb@1.0.0 - npm (npmjs.com)](https://www.npmjs.com/package/lowdb/v/1.0.0)：基于 json 的数据库的封装 api
- [shortid](https://www.npmjs.com/package/shortid)：用于生成 id

```
npm i lowdb@1.0.0 shortid
```

项目位置：`NodeJS/04Express/20_project_account`

[代码 checkpoint](https://gitee.com/egu0/front-end-note/tree/e409ae242f36bcbd07f8215fb5e3c78b6802a307/NodeJS/04Express/20_project_account)

## Cookie 入门

`res.cookie(key, value)`：创建 cookie，关闭浏览器时 cookie 会被删除

```js
app.get('/set-cookie', (req, res) => {
    // 设置cookie，关闭浏览器后 cookie 会丢失
    res.cookie('name', 'eugeneguo')
    res.end('cookie has been set!')
})

app.get('/', (req, res) => {
    res.send('home page')
})
```

首次访问，响应头中包含：

![image-20240308155546432](./README.assets/image-20240308155546432.png)

再次访问时，请求头中会出现 Cookie 一项，包含一个键值对

![image-20240308160204494](./README.assets/image-20240308160204494.png)

重启浏览器，访问 http://localhost:3000/，发现请求头未携带 Cookie

---

**创建带有时效的 cookie**：`res.cookie()`

```js
app.get('/set-cookie', (req, res) => {
    // 为 cookie 设置时效
    res.cookie('name', 'eugeneguo', {
        maxAge: 30 * 1000, // 30s
    })

    res.end('cookie has been set!')
})
```

验证步骤：

1. 访问 http://localhost:3000/set-cookie 获取 cookie
2. 访问 http://localhost:3000/ 验证 cookie 被添加到请求头中
3. 重启浏览器，过 30 秒后再次执行步骤 2，验证 cookie 是否在请求头中

---

**删除 cookie**

```js
app.get('/del-cookie', (req, res) => {
    res.clearCookie('name')
    res.end('cookie has been deleted!')
})
```

![image-20240308161042726](./README.assets/image-20240308161042726.png)

---

**读取 cookie**

```
npm i cookie-parser
```

```js
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

//应用解析 cookie 的中间件
app.use(cookieParser())

app.get('/set-cookie', (req, res) => {
    res.cookie('name', 'eugeneguo', {
        maxAge: 60 * 2 * 1000, // 2min
    })
    res.end('cookie has been set!')
})

app.get('/get-cookie', (req, res) => {
    // 获取 cookie 对象
    res.send(req.cookies)
})

app.listen(3000, () => {
    console.log('express server running at http://localhost:3000');
})
```

## Session 入门

Session 是基于 Cookie 实现的。当服务器需要记录用户的状态时，就会创建一个 Session，并生成一个唯一的 Session ID，这个 ID 会通过 Cookie 发送给客户端。之后，客户端每次向服务器发送请求时，都会携带这个 Session ID，服务器就可以通过这个 ID 找到对应的 Session，从而知道是哪个用户发出的请求。

```
npm i express-session
```

```js
const express = require('express')
const session = require('express-session')

const app = express()
app.use(session({
    name: 'session_id',//cookie的名字
    secret: 'keyboard cat',//密钥
    saveUninitialized: false,//未携带 cookie 时不创建 session
    resave: true,//自动延长 session 过期时间
    cookie: {
        maxAge: 30 * 24,
        httpOnly: true//前端无法通过 JS (document.cookie)读取该属性
    }
}))

app.get('/login', (req, res) => {
    if (req.query.username === 'admin' && req.query.password === 'admin') {
        req.session.username = req.query.username
        req.session.id = '10001'
        res.send('login success')
    } else {
        res.send('login failed')
    }
})

app.listen(3000, () => {
    console.log('express server running at http://localhost:3000');
})
```

访问 http://localhost:3000/login?username=admin&password=admin，在响应头中有一项为：

```
Set-Cookie: session_id=s%3AFmxmVwjrBMG_nikS06RVZs3YoueopbNG.qDeVAyojj3PeTEc5%2F9oSKVvFpLsItoQ5ihUNeyM1U3k; Path=/; Expires=Fri, 08 Mar 2024 08:41:43 GMT; HttpOnly
```

**session 访问及销毁**

```js
//购物车。查看是否存在 session 判断是否登录
app.get('/cart', (req, res) => {
    // 中间件会自动根据 cookie 解析出 session 对象，
    // 并将 session 对象挂载到 req 对象上，所以可以直接使用
    if (req.session.username) {
        res.send(`欢迎您，${req.session.username}！`)
    } else {
        res.send('请先登录！')
    }
})

// 退出，销毁 session
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('logout success')
    })
})
```

**区别**

- 存储位置：Cookie 数据存放在客户端（浏览器），而 Session 数据存放在服务器。
- 数据类型：Cookie 只支持存储字符串数据，而 Session 可以存储任意数据。
- 安全性：Cookie 存储在客户端，数据可被用户和其他网站访问，因此安全性较低；而 Session 数据存储在服务器端，对客户端不可见，因此相对较安全。
- 生命周期：Cookie 可以通过设置过期时间来指定存储的时间，可以是短期的或长期的；而 Session 默认情况下会持续到用户关闭浏览器或会话超时。
- 数据容量：Cookie 的容量较小，一般不超过 4KB；而 Session 可以存储更多的数据。
- 传输方式：Cookie 通过 HTTP 协议自动发送给服务器，每次请求都会携带 Cookie 数据；而 Session 可以通过 Cookie 或 URL 重写的方式传递 Session ID。

## CSRF 防御

全称：跨站请求伪造

原理：

1. 用户打开浏览器，访问受信任网站 A，输入用户名和密码请求登录网站 A；
2. 在用户信息通过验证后，网站 A 产生 Cookie 信息并返回给浏览器，此时用户登录网站 A 成功，可以正常发送请求到网站 A；
3. 用户未退出网站 A 之前，在同一浏览器中，打开一个 TAB 页访问网站 B；
4. 网站 B 接收到用户请求后，返回一些**恶意代码**，并发出一个请求要求访问第三方站点 A；
5. 浏览器在接收到这些攻击性代码后，根据网站 B 的请求，在用户不知情的情况下携带 Cookie 信息，向网站 A 发出请求。网站 A 并不知道该请求其实是由 B 发起的，所以会根据用户 C 的 Cookie 信息以 C 的权限处理该请求，导致来自网站 B 的恶意代码被执行。

```
对于开发者来说，防御 CSRF 攻击主要有以下几种策略123：

验证 HTTP Referer 字段：根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。在通常情况下，访问一个安全受限页面的请求来自于同一个网站。因此，要防御 CSRF 攻击，只需要对于每一个转账请求验证其 Referer 值，如果是以自己网站开头的域名，则说明该请求是来自自己网站的请求，是合法的。如果 Referer 是其他网站的话，则有可能是黑客的 CSRF 攻击，拒绝该请求。

在请求地址中添加 token 并验证：CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

在 HTTP 头中自定义属性并验证：除了在请求地址中添加 token，还可以在 HTTP 头中自定义属性并进行验证。这种方法同样是在请求中添加了黑客无法伪造的信息，增加了攻击的难度。
```

## 会话控制

**token 是啥**？token 是服务端生成并返回给客户端的一串加密字符串，token 中保存着用户信息

**token 有啥作用**？实现会话控制，即在 S 端识别用户身份，主要用于移动端 APP

**工作流程**

- 用户登录：用户通过用户名和密码登录。服务器验证用户的用户名和密码
- 生成 Token：一旦验证成功，服务器会生成一个 Token。这个 Token 是一个包含用户信息的加密字符串。
- 返回 Token：服务器将生成的 Token 返回给客户端。
- 存储 Token：客户端收到 Token 后，会将其存储在本地，例如在 Cookie 或 Local Storage 中。
- 发送请求：当客户端向服务器发送请求时，会在请求中包含这个 Token。例如，可以将 Token 放在 HTTP 请求头的 Authorization 字段中。
- 验证 Token：服务器收到请求后，会取出 Token 并进行验证。如果 Token 有效，服务器会处理请求并返回响应。如果 Token 无效或过期，服务器会拒绝请求。
- 更新 Token：为了安全性，Token 通常有一个过期时间。当 Token 过期时，客户端需要重新登录以获取新的 Token。也可以通过刷新 Token 的方式来避免用户频繁登录。

**token 特点**

- **无状态性**：Token 本身包含了所有需要的信息，服务器不需要保存 Token 的**状态**。这使得服务器可以更好地扩展。
- **支持跨域访问**：Token 可以在任何地方传输，例如在 HTTP 请求头中，或者在 URL 的查询参数中。这使得 Token 可以在各种环境中使用，包括跨域请求。
- **安全性**：Token 是服务器生成的一串加密字符串，只有服务器能够解密。这使得 Token 在传输过程中即使被截获，也无法被其他人使用。
- **可控性**：服务器可以控制 Token 的生命周期，包括它的生成、更新和销毁。这使得服务器可以更好地管理用户的会话。
- **自包含性**：Token 通常包含了用户的一些基本信息，如用户 ID，角色等。服务器可以通过解密 Token 来获取这些信息，无需查询数据库。

## jwt 了解

Json Web Token，是目前最流行的跨域认证解决方案，可用于基于 token 的身份验证；JWT 使 token 的生成与校验更规范。

```
npm i jsonwebtoken
```

示例

```js

const jwt = require('jsonwebtoken');

// sign(用户信息对象，密钥，配置对象)
let token = jwt.sign({
    username: 'egu0',
}, 'keyboard cat', {
    expiresIn: 60 // 过期时间，单位为秒
})

console.log(token)

//----------------------------

let t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVndTAiLCJpYXQiOjE3MDk4OTAzMDQsImV4cCI6MTcwOTg5MDM2NH0.EcKDlVKsAhJZ2FOJ4zGS-yOOq2zreF2kWWNPUfhFxzE'

//校验已知的 token
jwt.verify(t, 'keyboard cat', (err, data) => {
    if (err) {
        console.log(err.message)
        // jwt expired: 超时
        // invalid signature: 无效的签名
    } else {
        console.log(data)
    }
})
```

## 案例完善

- 添加登录功能：登录成功后以 set-cookie 的方式返回 jwt
- **校验 token**：在后台校验 token
- 封装校验中间件：校验 token，获取用户信息并将其放入 req 中，可以在路由回调函数中直接使用
- 修改 api，支持多用户

[项目 checkpoint](https://gitee.com/egu0/front-end-note/tree/681a31aed93d74cb0d87d935072b2c3d23825ce1/NodeJS/04Express/20_project_account)

[课程](https://www.bilibili.com/video/BV1gM411W7ex/)















