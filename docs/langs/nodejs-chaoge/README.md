---
sidebarDepth: 2
sidebar: auto
---

# NodeJS 入门

[教程](https://www.bilibili.com/video/BV1bs411E7pD/)

## 简单了解

- [Introduction](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [NodeJS vs JavaScript](https://www.geeksforgeeks.org/difference-between-node-js-and-javascript/)

## 模块化

Node 中，一个 JS 文件

- 是一个模块
- 其中的 JS 代码独立运行在一个函数中，而不是全局作用域。所以其中的变量和函数在另一个模块中无法访问

**一：使用 exports 关键字向外部暴露属性或方法**

```js
var x = 'mmmmm1';

function f() {
    console.log('f');
}

exports.f = f;//暴露函数
exports.a = 'engureguo';//暴露属性
exports.x = x;
```

**二、使用 require 关键字引入外部模块**

```js
var m1 = require('./01.m.js');

console.log(m1);
//{ f: [Function: f], a: 'engureguo', x: 'mmmmm1' }
```

`require(path)` 指定路径引入外部模块

- 参数 path 可以是相对路径或绝对路径
- 返回值是一个对象，这个对象代表的是引入的模块

除此之外，也可以通过指定**模块标识**引入 Node JS 内置模块，比如 `require('http')`

---

模块分类：**核心模块**和**文件模块**

**一、核心模块：服务器级别的API，被封装到包中**

- `fs`             文件系统工具包
- `http`           服务器工具包
- `path`       处理路径相关
- `os`                      查看CPU、内存、用户等信息
- ...

核心模块的引入

- nodejs 引擎提供的模块
- 核心模块标识，就是模块的名字

```js
var fs = require('fs');
```

**二、文件模块**

- 相对路径，**以 .  或 .. 开头**
- 绝对路径

### 全局对象 global

全局对象 `global` 的作用：保存全局的属性和方法

示例

```js
//a.js
a = 0;
var b = 1;
console.log(global.a);//0
console.log(global.b);//undefined
```

---

验证：一个 JS 文件独立**运行在一个函数中**，而不是全局作用域，别的模块无法访问

```js
//b.js
console.log(arguments);//函数入参
console.log(arguments.callee.toString());//查看当前执行的函数对象
```

输出：

```json
[Arguments] {
  '0': {},
  '1': [Function: require] {
    resolve: [Function: resolve] { paths: [Function: paths] },
    main: Module {
      id: '.',
      path: '/Users/.../node-demo/02',
      exports: {},
      filename: '/Users/.../node-demo/02/b.js',
      loaded: false,
      children: [],
      paths: [Array]
    },
    extensions: [Object: null prototype] {
      '.js': [Function (anonymous)],
      '.json': [Function (anonymous)],
      '.node': [Function (anonymous)]
    },
    cache: [Object: null prototype] {
      '/Users/.../node-demo/02/b.js': [Module]
    }
  },
  '2': Module {
    id: '.',
    path: '/Users/.../node-demo/02',
    exports: {},
    filename: '/Users/.../node-demo/02/b.js',
    loaded: false,
    children: [],
    paths: [
      '/Users/.../node-demo/02/node_modules',
      '/Users/.../node-demo/node_modules',
      '/Users/.../node_modules',
      '/Users/engure/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  },
  '3': '/Users/.../node-demo/02/b.js',
  '4': '/Users/.../node-demo/02'
}
function (exports, require, module, __filename, __dirname) {
console.log(arguments)
console.log(arguments.callee.toString())
}
```

原理：当 node 执行模块中的代码时会将 js 中的代码放入一个函数内，这个函数的参数列表为

```js
function (exports, require, module, __filename, __dirname) {
  // js 文件（模块）
}
```

实际上，js 文件（模块）中的代码都是包装在一个函数中执行的，并且在函数执行时传递进了五个实参（可以通过 `global.arguments` 查看）

| 参数         | 含义                                                         | 索引 |
| ------------ | ------------------------------------------------------------ | ---- |
| `exports`    | 该对象用来将变量或函数暴露到外部                             | 0    |
| `require`    | 函数，用来引入外部的模块                                     | 1    |
| `module`     | 代表**当前模块本身**。其中`module.exports = exports`，二者指向同一个对象，所以也可以 `module.exports` 导出 | 2    |
| `__filename` | 模块绝对路径                                                 | 3    |
| `__dirname`  | 模块所在文件夹                                               | 4    |

### module.exports 与 exports

`module.exports` 具有 `exports` 单独导出属性或方法的功能，比如

```js
var x = 'mmmmm1';
function f() {
    console.log('f');
}

module.exports.f = f;
module.exports.a = 'engureguo';
exports.x = x;
```

除此之外，`module.exports` 也可以导出一个对象：

```js
module.exports = {
  name: 'engure',
  age: 22,
 say: function() {}
}
```

> 注意：不能使用 `exports = {}` 导出对象，因为 `exports` 相当于一个引用变量，仅仅记录了指向了 `module.exports` 的对象地址 ，修改 `exports` 并不能起到效果。步骤：
>
> 1. `module.exports <-- Object()`
> 2. `exports <-- module.exports`
>
> 所以修改 `exports` 指向的对象并不影响 `module.exports` 指向的对象

总结：

- 通过 `exports` 只能使用 `.`  的方式向外部暴露对象
- 通过 `module.exports` 既可以通过 `.` 的方式，有可以通过直接赋值 `{}`

## 包（模块）

### 包介绍

Node.js 中的包，也称为模块，是 Node.js 生态系统的基础部分。

Node.js 包默认采用 CommonJS 模块化规范，它旨在解决 JavaScript 作用域的问题，使每个包都在自己的命名空间内执行。

每个 Node.js 包都包含一个 package.json 文件，其中包含了包的元数据，如名称、版本、依赖列表等信息。

### NPM 包管理器

NPM，即 Node 包管理器（Node Package Manager），帮助 Node 完成了第三方模块的发布、安装和依赖等工作。换句话说，Node 借助 NPM 与第三方模块之间形成了很好的生态系统。

常用命令

- `npm -v`
- `npm version`
- `npm search 包名`
- `npm install 包名`（install 可以简写为 `i`）
- `npm init`
- `npm remove 包名` （remove 可以简写为 `r`）
- `npm install 包名 --save`（安装包并安装到依赖中，`--save` 可简写为 `-S`）安装的同时将包设置在 `dependencies` 中，记录依赖包和他的版本，push到git上时不传 `node_modules/` 中的内容
- `npm install`  安装依赖，自动根据版本下载包
- `npm install -g  包名`     全局安装，一般都是一些工具

---

示例：在一个指定的目录下使用一个 npm 上的包，比如 math

1. 初始化包 `npm init`   （一路回车，**包名不允许大写**）

2. 安装 math 包 `npm install math` 此时 math 被安装到 `node_modules` 中

3. 创建 index.js，引用并使用，运行 `node index.js`

```js
var math = require('math');
console.log(math.add(100, 200));
```

### CNPM

淘宝镜像

```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

cnpm 命令和 npm 命令使用方法一样，比如

```
cnpm i express -S
```

通过 cnpm 下载下来的 `node_modules` 内部分目录结构：

 <img src="https://s2.loli.net/2024/02/25/Q13O8IaCulc2ADY.png" alt="image-20210828230742292" style="zoom:80%;" />

看到下载的文件保存方式和原来的 npm 保存方式不一样：使用快捷方式指向包的方式，避免两者的冲突

问题：node 搜索包的流程是什么样的？

答：node 使用模块名字来引入模块时，首先在当前目录的 node_modules 下寻找，如果找不到会去上一级继续找，如果没有则继续向上找，一直找到根目录，如果找不到则报错

## buffer 缓冲区

[buffer](http://nodejs.cn/api/buffer.html) 缓冲区，用于表示固定长度的字节序列

和数组很像，操作方法也相似；与数组不同的是，它能够存储**二进制数据**

不需要引入，**Node自带，直接用**

```js
var str = 'Hello Engure!';

//将一个字符串保存到buffer中，
var buf = Buffer.from(str);

console.log(buf);
//<Buffer 48 65 6c 6c 6f 20 45 6e 67 75 72 65 21>
//范围 00~ff, 0000-0000 ~ 1111-1111，以字节为单位

```

Buffer 对象占用的内存：buffer 长度数个字节

一个汉字占用 3 个字节

```js
//<Buffer e7 9b 96 e7 89 b9>
console.log(Buffer.from('盖特'));
```

**一、Buffer 简单使用**

所有构造方法都已经废弃了

通过 **Buffer.alloc(size)** 分配内存，内存一旦分配 Buffer 对象的长度固定不变。

```js
//数组越界赋值时自动分配空间
var arr = [1,2,3];
arr[5] = 5;
console.log(arr);
//[ 1, 2, 3, <2 empty items>, 5 ]
```

赋值和取值

```js
var buf = Buffer.alloc(10);
buf[0] = 88;
buf[1] = 255;//ff
buf[2] = 0xaa;
buf[3] = 450;//超过255会取低8位

//查看内容
buf[2]    //默认10进制
buf[2].toString(16);  //16进制内容
buf[2].toString(2);   //2进制

//循环
for (var i=0;i<buf.length;i++) {
    console.log(buf[i].toString(16));
}
```

`Buffer.allocUnsafe(size)` 区别于 `alloc()`，申请的内存是不干净的

```js
console.log(Buffer.alloc(10));//<Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(Buffer.allocUnsafe(10));//<Buffer 00 00 00 00 00 00 00 00 d8 7d>
```

比较

| 申请函数          | 特点                                                 |
| ----------------- | ---------------------------------------------------- |
| alloc(size)       | 获取的buffer内容都是清理干净的；效率较低             |
| allocUnsafe(size) | 可能包含内存中的“敏感数据”，是不安全的；但是效率更高 |

`buffer.toString()`

将 buffer 转化为字符串，可以查看其中的内容

```js
console.log(buf.toString());//转为字符串类型
```

## fs 文件系统

表示文件系统 File System，用来操作文件，比如读写、创建和删除文件。

nodejs 通过 fs 模块来来和文件系统进行交互。该模块提供了一些标准文件访问 API 来打开、读取、写入文件。

 导入（fs 是核心模块，无需下载即可引入）

```js
const fs = require('http')
```

**两种操作形式**：fs 模块中所有操作都支持同步和异步两种方式。

- 同步：会阻塞系统执行，也就是直到操作完毕时程序才会继续向下执行
- 异步：不会阻塞系统的执行，操作完成时会通过**回调函数**返回结果

几个例子

| 同步 API                    | 异步 API                        |
| --------------------------- | ------------------------------- |
| `fs.access(path)`           | `fs.accessSync(path)`           |
| `fs.appendFile(path, data)` | `fs.appendFileSync(path, data)` |
| `fs.close(fd)`              | `fs.closeSync(fd)`              |
| `fs.copyFile(src, dest)`    | `fs.copyFileSync(src, dest)`    |

### **同步文件写入**

1、打开文件

`fs.openSync(path,  flags   [,   mode])`

- path
- flags      打开类型，只读 `r`、 `w`
- mode    设置文件权限，一般不传，多用于 linux

2、写入文件

`fs.writeSync(fd,   string   [,  position  [, encoding] ])`

- fd    文件标识
- string     写入内容
- position   写入的起始位置
- encoding    写入编码，默认 UTF-8

3、关闭文件描述 ⭐

`fs.closeSync(fd)`

注意：同步文件写入从上到下执行，需要处理异常

### **异步文件写入**

**1、打开文件**

`fs.open(path,  flags  [, mode],  callback)`

参数和同步的差不多，多了一个 `callback`

⭐异步函数没有返回值，返回值都是通过回调函数参数返回的

⭐回调函数参数：

1. err 错误对象，如果没有错误则为null
2. fd   文件的描述符

```js
fs.open('data.txt', 'r', function (err, fd) {
    if (err != null) {//出错
        console.log(err);
    } else {
        console.log(fd);
    }
})
```

**2、写入文件**

`fs.write(fd， string [, position [, encoding]], callback)`

```js
var fs = require('fs');

fs.open('data.txt', 'w', function (err, fd) {
    if (err != null) {//出错
        console.log(err);
    } else {
        fs.write(fd, 'HELLO啊小晶子!', function (err) {
            if (err == null) {
                console.log('写入成功~~');
            }
            
        })
    }
});
```

**3、关闭文件**

`fs.close(fd, callback)`

回调只有一个 err 参数

```js
var fs = require('fs');

fs.open('data.txt', 'w', function (err, fd) {
    if (err != null) {//出错
        console.log(err);
    } else {
        fs.write(fd, 'HELLO啊小晶子!', function (err) {
            if (err == null) {
                console.log('写入成功~~');
            }

            //写入完成，关闭fd
            fs.close(fd, function (err) {
                if (!err) {
                    console.log("文件已经关闭~~");
                }
            })
        })
    }
});
```

同步：符合人类思维，较为简单

异步：不会阻塞程序的执行，性能更好，较为复杂，有一定难度

### 简单文件写入

封装

```
fs.writeFile(file, data[, options], callback)
fs.writeFileSync(file, data[, options])
```

- file     路径，绝对路径或者相对路径
- data    需要写入的数据
- **options 对象**
  - encoding    编码方式
  - mode   文件权限
  - flag    文件操作类型，默认 w

异步

```js
var fs = require('fs');
fs.writeFile('f3.txt', '简单文件写入~~', function (err) {
    if (!err) {
        console.log('写入成功~~~');
    }
});
```

options 对象

```js
var fs = require('fs');
fs.writeFile('f3.txt', '简单文件写入~~', {flag:"a"}, function (err) {
    if (!err) {
        console.log('写入成功~~~');
    }
});
```

文件操作类型

 <img src="https://s2.loli.net/2024/02/25/4la1jxdzApUSJtr.png" alt="image-20210829005054011" style="zoom:80%;" />

常用：`r`、`w`、`a`

### 流式文件写入

**1、写入文件**

`fs.createWriteStream(path  [, options])`

用来创建一个可写流

- path    文件路径
- options             配置的参数，是一个对象

```js
var fs = require('fs');

var ws = fs.createWriteStream('f5.txt');

ws.write('1.node.js\n');
ws.write('2.npm\n');
ws.write('3.cnpm\n');
```

> 事件绑定

> 触发多次：使用 `on(事件字符串，回调函数)`
>
> 触发一次：使用 `once(事件字符串，回调函数)`

```js
var fs = require('fs');

var ws = fs.createWriteStream('f5.txt');

//事件触发一次，使用once绑定
ws.once('open', function () {
    console.log("打开流~~");
});
ws.once('close', function () {
    console.log("关闭流~~");
});

//可以多次写入
ws.write('1.node.js\n');
ws.write('2.npm\n');
ws.write('3.cnpm\n');

//关闭流，注意而不是 ws.close()
ws.end()
```

流适用于写大文件

### **简单文件读取**

**几种文件读取**

1. 同步文件读取
2. 异步文件读取
3. 简单文件读取
4. 流式文件读取

---

``fs.readFile(path[, options], callback)``

- callback    回调函数，参数：
  - err      错误
  - data    读取的内容，是一个Buffer（考虑到二进制文件的读取）

`fs.readFileSync(path[, options])`

```js
var fs = require("fs");

fs.readFile('data.txt', function (err, data) {
    if (!err) {
        console.log(data);//二进制数据
    }
});
```

将读取内容写入到另一文件：

```js
var fs = require("fs");

fs.readFile('data.txt', function (err, data) {
    if (!err) {
        //console.log(data.toString());
        //将读取的文件写入另一个文件
        fs.writeFile("data2.txt", data, function (err) {
            if (!err) {
                console.log("文件写入成功~~");
            }
        });
    }

});
```

### 流式文件读取

适用于大文件读取，可以分多次将文件读取到内存中

`fs.createReadStream(path[, options])`

读取可读流中的数据，需要为流绑定一个关闭一个 data 事件，事件绑定完成后会自动读取数据

读取完之后，自动关闭流

```js
var fs = require("fs");

var path = "C:\\Users\\HiWin10\\Music\\白羊.mp3";

var rs = fs.createReadStream(path);

rs.once('open', function () {
    console.log("打开流~~");
});

rs.once('close', function () {
    console.log("关闭流~~");
});

//绑定data事件，当打开流时会自动读取（分多次），读完后会触发close事件关闭流
rs.on('data', function (data) {
    console.log(data.length, data)
});
```

```
打开流~~
65536 <Buffer 49 44 33 03 00 00 00 00 00 23 54 53 53 45 00 00 00 0f 00 00 00 4c 61 76 66 35 37 2e 37 31 2e 31 30 30 00 00 00 00 00 00 00 00 00 00 00 ff fb 90 00 00 ... 65486 more bytes>
65536 <Buffer 87 43 e4 d1 f8 0a d7 90 d3 01 6b b6 9a 6d e3 3d 3f 34 8a 47 25 3c 15 a2 b8 87 a6 b4 18 ee 3c d6 7f ff b6 b5 00 00 00 2e 59 6b 64 00 63 e7 60 26 a0 02 ... 65486 more bytes>

...

65536 <Buffer bf fd 5f bb f2 35 02 05 e3 8c ef 6d ff 7e aa 07 10 bf c2 84 8d 30 54 81 81 dc eb d0 b5 81 40 cb d3 e8 22 da 46 7a 48 52 b2 14 b0 cc 14 e8 45 a7 47 a9 ... 65486 more bytes>
65536 <Buffer 5b 22 1a 22 6f ae 45 7e a2 4d a0 20 c5 09 37 9c 79 55 da 4a 62 a9 bc 06 a3 4b 89 92 04 01 d1 52 6d cd fa 7a 2c cf 28 e6 ab 98 1b e2 2e a4 db 92 bd 9d ... 65486 more bytes>
65536 <Buffer 33 dc e5 00 01 82 12 51 25 03 1c 0d 8d bc c2 32 a2 4c d8 04 92 f8 98 37 fe 67 85 71 8a 83 2b 1c b3 49 ba 61 92 b1 fd ca a1 c5 25 ea ff fb 92 64 c2 80 ... 65486 more bytes>
8904 <Buffer 76 f3 f7 7f d3 7e ac c5 75 33 e8 17 38 c9 08 33 d1 db 37 78 40 20 12 62 a0 1d 83 20 25 61 86 5e fa b4 d0 fe 76 ea b5 2e 86 2b 0f 7a df 36 cd d3 de f5 ... 8854 more bytes>
关闭流~~
```

### 将读取的文件写入文件

```js
var fs = require("fs");

var path = "C:\\Users\\HiWin10\\Music\\白羊.mp3";

var rs = fs.createReadStream(path);

var ws = fs.createWriteStream('by.mp3')

//////////////

rs.once('open', function () {
    console.log("读流打开~~");
});

rs.once('close', function () {
    console.log("读流关闭~~");
    //读流关闭时，要顺带关闭写流
    ws.end()
});

ws.once('open', function () {
    console.log("写流打开~");
});

ws.once('close', function () {
    console.log("写流关闭~");
});

////////////////////

//读流自动读取数据，写入写流，完事后读流自动关闭，顺带关闭写流
rs.on('data', function (data) {
    ws.write(data)
});
```

```
读流打开~~
写流打开~
读流关闭~~
写流关闭~
```

### 使用 pipe() 读写文件

使用 `pipe()` **自动**将读流与写流相关联，完成后**自动关闭**两者

```js
var fs = require("fs");

var path = "C:\\Users\\HiWin10\\Music\\白羊.mp3";

var rs = fs.createReadStream(path);

var ws = fs.createWriteStream('by2.mp3')

//////////////

rs.once('open', function () {
    console.log("读流打开~~");
});

rs.once('close', function () {
    console.log("读流关闭~~");
});

ws.once('open', function () {
    console.log("写流打开~");
});

ws.once('close', function () {
    console.log("写流关闭~");
});

////////////////////

rs.pipe(ws);
```

不加监听事件

```js
var fs = require("fs");
var path = "C:\\Users\\HiWin10\\Music\\白羊.mp3";

var rs = fs.createReadStream(path);//读流

var ws = fs.createWriteStream('by2.mp3');//写流

rs.pipe(ws);

```

### 其他内容

**1、文件是否存在**

`fs.existsSync(path)` 同步方法（异步方法复杂，已经废弃，不推荐）

**2、获取文件信息**

`fs.stat(path, callback)`

`fs.statSync(path)`

```js
fs.stat("by.mp3", function () {
    console.log(arguments);
    /*
        [Arguments] {
            '0': null,
            '1': Stats {
                dev: 3430564453,
                mode: 33206,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                ino: 13229323905605598,
                size: 2695880,
                blocks: 5272,
                atimeMs: 1630205411961.7207,
                mtimeMs: 1630205383196.9993,
                ctimeMs: 1630205397322.6138,
                birthtimeMs: 1630205383184.0247,
                atime: 2021-08-29T02:50:11.962Z,
                mtime: 2021-08-29T02:49:43.197Z,
                ctime: 2021-08-29T02:49:57.323Z,
                birthtime: 2021-08-29T02:49:43.184Z
                }
        }
     */
});
```

可以推断

```js
fs.stat('by.mp3', function (err, stat) {
    if (!err) {
        console.log(stat);
    }
});
```

`fs.Stats` 类，[参考](http://nodejs.cn/api/fs.html#fs_class_fs_stats)

- `stats.isDirectory()`
- `stats.isFile()`
- `stats.isSocket()`
- `stats.size`
- `stats.mtimeMs`  最后一次修改时间
- `stats.birthtimeMs` 创建时间

**3、删除文件**

`fs.unlink(path, callback)`

`fs.unlinkSync(path)`

删除文件与磁盘的连接

**4、目录读取**

`fs.readdir(path [, options], callback)`

`fs.readSync(path [, options])`

```js
fs.readdir('.', function (err, files) {
    if (!err) {
        console.log(files);//数组
    }
});
```

**5、文件截断**

`fs.truncate(path, len, callback)`

`fs.truncate(path, len)`

- len     截断 >= len 字节的内容

**6、创建目录**

`fs.mkdir(path [, mode], callback)`

`fs.mkdirSync(path [, mode])`

**7、删除目录**

`fs.rmdirSync(path)`

`fs.rmdir(path, callback)`

**8、文件重命名**

`fs.rename(oldPath,  newPath,  callback)`

`fs.rename(oldPath, newPath)`

```js
fs.rename('by.mp3', 'by1.mp3', function (err) {
    if (!err){
        console.log("修改成功！");
    }
});
```

不同目录下，文件移动功能

```js
//不同目录下，类似文件移动功能
fs.rename('by.mp3', 'F:/by1.mp3', function (err) {
    if (!err){
        console.log("修改成功！");
    }
});
```

**9、文件的监视**

`fs.watchFile(filename [, options],  listener)`

```js
fs.watchFile('f5.txt', function (cur, pre) {
    //console.log(arguments);
    //cur 当前的Stats
    //pre 之前的Stats
    console.log(pre.size, '->', cur.size);
});
```

<img src="https://s2.loli.net/2024/02/25/lB6h35O4RJHy7wF.png" alt="image-20210829113234439" style="zoom:80%;" />

设置 `options.interval` 属性，配置轮询频率

```js
fs.watchFile('f5.txt', {interval: 100}, function (cur, pre) {
    console.log(pre.size, '->', cur.size);
});
```

注意：如果设置的太小很消耗性能

## http

```js
var http = require('http');

var server = http.createServer();

//注册request请求事件
server.on('request', function () {
    console.log(arguments)
});

//启动服务器，需要绑定端口号
server.listen(80, function () {
    console.log("server starting...");
});
```

请求处理

```js
//注册request请求事件，回调函数需要接受两个参数
//  Request对象，获取客户端的一些信息，比如URL
//  Responce对象，用来给用户发送响应消息
server.on('request', function (req, resp) {
    console.log('请求路径 = ' + req.url);


    //write可以多次，必须以end结束，告诉给客户端写入已经结束了
    resp.write('<h1>hello node.js.</h1>');
    resp.end();
});
```

`req.url`

都是以 `/` 开头，是用户请求的路径

可以根据请求路径 `req.url` 响应不同的内容

```js
server.on('request', function (req, resp) {
    console.log('请求路径 = ' + req.url);

    //区别对待不同的请求
    if (req.url == '/' || req.url == '/index.html' || req.url == '/index') {
        //主页
        resp.write('<h1>index</h1>');
    } else if (req.url == '/hello') {
        //hello页
        resp.write('<h2>hello bro!</h2>');
    } else {
        //404
        resp.write('<h1>page not found</h1>');
    }
    
    resp.end();
});
```

**Response 中的 Content-Type**

指定内容类型，浏览器会依照此不同类型进行不同的处理

```js
server.on('request', function (req, resp) {
    //告诉对方我发送的数据类型是什么
    resp.setHeader('Content-Type', 'text/plain; charset=utf-8');
    resp.end("hello 小郭")
});
```

<img src="https://s2.loli.net/2024/02/25/LvoI8W4kni5HyNP.png" alt="image-20210829122440003" style="zoom:80%;" />

> `Content-Type` 类型是`text/html` 时会解析相应的 html 元素；`text/plain` 表示纯文本类型，不会解析 html 元素
> <br/>
> <br/>
> <br/>
> <img src="https://s2.loli.net/2024/02/25/4DgFYUlKohdECTk.png" alt="image-20210829123133459" style="zoom:80%;" />

发送网页

```js
server.on('request', function (req, resp) {

    if (req.url == '/') {
        //发送html文件
        fs.readFile("index.html", function (err, data) {
            if (err) {
                resp.setHeader('Content-Type', 'text/plain; charset=utf-8');
                resp.end("文件不存在，请重试")
            } else {
                resp.setHeader('Content-Type', 'text/html; charset=utf-8');
                resp.end(data)//参数可以是字符串也可以是Buffer，这里data是Buffer类型
            }
        });

    }
});
```

发送图片

```js
server.on('request', function (req, resp) {

    if (req.url == '/') {
        //告诉对方我发送的数据类型是什么
        resp.setHeader('Content-Type', 'text/html; charset=utf-8');
        resp.write("hello 小郭<hr/>")
        resp.write("<image src='/img' />");
        resp.end()

    } else if (req.url == '/img') {
        //发送图片
        resp.setHeader('Content-Type', 'image/jpeg;');//二进制文件（图片、音频）不需要指定编码

        var rs = fs.createReadStream('5.jpg');
        rs.once('close', function () {
            resp.end()//真正关闭resp写入
        });
        rs.on('data', function (data) {
            resp.write(data)
        });

        //resp.end()异步操作，出错！Error [ERR_STREAM_WRITE_AFTER_END]: write after end
    }
});
```

<img src="https://s2.loli.net/2024/02/25/E85iwS3o1LnIQH6.png" alt="image-20210829125444176" style="zoom:80%;" />

> 踩坑记录：[node http fs.createReadStrem 发送文件 Error ERR_STREAM_WRITE_AFTER_END\]: write after end_Engure-CSDN博客](https://blog.csdn.net/qq_43341057/article/details/119979359)

不同类型的 `Content-Type`:


 | 类型        | Content-Type              |
 | ----------- | ------------------------- |
 | 纯文本 .txt | text/plain; charset=utf-8 |
 | html, htm   | text/plain; charset=utf-8 |
 | .xml        | text/xml                  |
 | .jpg        | image/jpeg                |
 | .png        | image/png                 |
 | .gif        | image/gif                 |
 | json格式    | application/json          |
 | .pdf        | application/pdf           |
 | .word       | application/msword        |

[link](https://www.runoob.com/http/http-content-type.html)

**编码设置**：

- 对于二进制数据，不需要设置 charset
- 对于文本类型数据 `text/*` ，需要设置 charset

## Express

[link](/langs/nodejs-express/)
