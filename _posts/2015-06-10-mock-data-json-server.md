---
layout: post
title: "用 JSON Server 做 Data Mock"
date: "2015-06-10 22:13"
---


## 情景

在团队协同开发时大家经常时先写文档，把接口和对应的json数据都规定在文档里

然后项目组的前后端分别依据此文档来写程序。

然而，前端的同学没有后端同学接口返回数据之前，一般会等后端开发的同学把接口调试好才能联调。
等待的过程可能会导致前后端开发不同步。

JSON Server 来了
等灯登灯。。。

JSON Server 很优雅的解决了这个问题

## 优雅的JSON Server
 
JSON Server 是 Node.js写的一个第三方库，可快速生成 REST API fake json 数据，安装使用非常方便。

通过JSON Server 前端开发同学不用等后端同学的接口，自己随手找个服务器，写一个json文件几条命令就可生成服务端接口，服务端同学接口开发完成之后，前端同学把客户端服务地址一更换即可时间无缝对接。

## 快速使用

首先要确认安装Node.js，如何安装就不在此赘述了

安装 JSON Server

```
$ npm install -g json-server
```

编辑json文件，如编辑 db.json文件添加以下内容：

```
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

开启服务

```
$ json-server --watch db.json
```


访问 [http://localhost:3000/posts/1](), 返回如下

```
{ "id": 1, "title": "json-server", "author": "typicode" }
```

json-server 默认使用3000端口，你也可以更改端口

```
$ json-server -p 20001 -w db.json
```

注： 如果放在服务器上不要忘记开防火墙否则不能访问


---

同时JSON Server 支持REST 其他方法,

更多请查看考GitHub[https://github.com/typicode/json-server](https://github.com/typicode/json-server)


转载请注明出处 

