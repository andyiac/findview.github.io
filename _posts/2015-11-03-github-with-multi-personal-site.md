---
layout: post
title: "GitHub 托管多个站"
date: "2015-11-03"
---

GitHub可以免费托管静态网页，并且为每个账户提供一个username.github.io的域名，在这个域名下正好可以写个博客。

另外GitHub中的repository 也可以建立gh-pages分支，GitHub会默认发布此分支的静态网页在`http://username.github.io/projectname` 下，据此我们可以发布N个站了。


## 安装 jekyll

首先请确认有ruby环境，如何安装ruby就不在此赘述了

更新淘宝镜像：

```shell
$ gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
$ gem sources -l
```

可参照官网 : [jekyllrb.com/docs/quickstart/](http://jekyllrb.com/docs/quickstart)

```shell
~ $ gem install jekyll
~ $ jekyll new myblog
~ $ cd myblog
~/myblog $ jekyll serve
# ==>> now browse to http://localhost:4000
```

若在Mac环境下可能会有提示安装一些module官网并没有写清楚

```shell
$ gem install jekyll // 安装jekyll
$ gem install kramdown // markdown语言解析
$ gem install pygments.rb // 代码高亮
$ gem install liquid
```

按照提示没有哪个 module 就安装哪个直接`gem install` 就可以，安装`pygments`模块需要单独注意，它是

```shell
~ $ gem install pygments.rb      
```


## 使用GitHub托管多个网站

每个GitHub账号只能配置一个 `username.github.io` 域名，同时可通过CNAME 记录解析到 `username.github.io` GitHub会自动解析发布此目录下的 Jekyll 项目。


另外GitHub中的repository 也可以建立gh-pages分支，GitHub会默认发布此分支的静态网页在`http://username.github.io/projectname` 下，据此我们就可以发布N个站了。

不过问题来了，要想为心的站配置独立的域名怎么办呢

首先适用 `dig`工具查看自己的域名信息，如：

	~ $ dig andyiac.github.io

	; <<>> DiG 9.8.3-P1 <<>> andyiac.github.io
	;; global options: +cmd
	;; Got answer:
	;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 58992
	;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 4, ADDITIONAL: 0

	;; QUESTION SECTION:
	;andyiac.github.io.		IN	A

	;; ANSWER SECTION:
	andyiac.github.io.	3600	IN	CNAME	github.map.fastly.net.
	github.map.fastly.net.	600	IN	A	185.31.18.133

	;; AUTHORITY SECTION:
	fastly.net.		82664	IN	NS	ns3.p04.dynect.net.
	fastly.net.		82664	IN	NS	ns1.p04.dynect.net.
	fastly.net.		82664	IN	NS	ns4.p04.dynect.net.
	fastly.net.		82664	IN	NS	ns2.p04.dynect.net.

	;; Query time: 109 msec
	;; SERVER: 124.207.160.110#53(124.207.160.110)
	;; WHEN: Sat Nov 21 12:06:04 2015
	;; MSG SIZE  rcvd: 169


可以看到 `andyiac.github.io` 最终被A纪录解析到 `185.31.18.133`

基于以上我们搭建的新站：

- 在GiHub上新建一个Repo，名称随意不如`newblog`
- clone 到本地 并且新建 `gh-pages`分支（GitHub 会发布此分支到Jekyll内容）
- 添加CNAME 文件到根目录
- 配置域名使用A纪录直接解析到 `185.31.18.133`

如果你也使用的是阿里云的域名服务的话，一分钟后网站即可生效。

以下的两个网站即是基于此搭建完成的。

- [www.androiddevlibs.com](http://www.androiddevlibs.com)
- [www.androidopensourceproject.com](http://www.androidopensourceproject.com)


### 一些简洁的主题

- [http://jekyllthemes.org/themes/the-plain/](http://jekyllthemes.org/themes/the-plain/)
- [http://scribble.muan.co/](http://scribble.muan.co/) GitHub设计师muan的作品够简洁
- [https://github.com/mattvh/jekyllthemes](https://github.com/mattvh/jekyllthemes)
- [shout website theme](https://github.com/erming/shout-website) 这个主题也够简洁是我的风格

### Others
- [http://jekyllcn.com/](http://jekyllcn.com/) Jekyll中文翻译
- [http://jekyllrb.com/](http://jekyllrb.com/) Jekyll 官网
