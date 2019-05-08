---
layout: post
title: "Play With Raspberry PI "
date: "2016-07-28 16:59:30"
---

### 硬件

- raspberrypi B (一代)
- 360无线wifi

### 问题，没有外接显示器，每次如何动态获得 IP 地址

### 思路

每次开机后自动运行一个脚本，查询本机的 IP ，然后使用邮件的方式，将本机的 IP 发送到指定的邮箱。

找了一圈的 Linux 下发送邮件的功能，最终锁定使用 NodeJs 写的 mailsendler ，



#### 第一步 nodejs 获取本机 IP 方法:  

```
var address,
    ifaces = require('os').networkInterfaces();
for (var dev in ifaces) {
    ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address: undefined);
}
```


### 使用 node 发送邮件

步骤如下:

```shell
$ mkdir sendPiIp
$ cd sendPiIp
$ npm init .
$ npm install -save nodemailer
$ touch index.js
```

index.js 的代码如下:

```JavaScript

var nodemailer = require('nodemailer');

var address,
    ifaces = require('os').networkInterfaces();
for (var dev in ifaces) {
    ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address: undefined);
}

var raspberryIP = address;

// Create a SMTP transporter object
var transporter = nodemailer.createTransport({

    host: 'smtp.163.com',
    port: 465,
    secure: true, // use SSL
    pool: true,
    service: '163',
    auth: {
        user: 'andyiac@163.com',
        pass: 'xxxxx'
    },
    logger: true, // log to console
    debug: true // include SMTP traffic in the logs
}, {
    // default message fields
    // sender info
    from: 'andyiac raspberry pi <andyiac@163.com>',
});


console.log('SMTP Configured');


// Mock message queue. In reality you would be fetching messages from some external queue
var messages = [{
    to: '"touser@xxxmail.com" <touser@xxxmail.com>',
    subject: 'Hi andyiac\'s raspberry ip is comming ', //
    text: 'raspberry pi ip',
    html: '<p>Hi andyiac: <br><br><br> your raspberry pi\'s ip address is <b> '+ raspberryIP +'</b>  your raspberry PI </p>'
}];

// send mail only if there are free connection slots available
transporter.on('idle', function () {
    // if transporter is idling, then fetch next message from the queue and send it
    while (transporter.isIdle() && messages.length) {
        transporter.sendMail(messages.shift(), function (error, info) {
            if (error) {
                console.log(error.message);
                return;
            }
            console.log('Server responded with "%s"', info.response);
        });
    }
});
```


#### 先在本地测试一下看是否能成功发送邮件

```
$ cd sendPiIp
$ node index.js
```

等灯登灯
看了下邮箱成功接收到邮件, 如下：

```
Hi andyiac:

your raspberry pi's ip address is 192.168.1.42

your raspberry PI
```


### 将发送服务添加到 PI 开机启动，这样只要插上电，一开机就会把自己的 IP 发给你

修改权限为可执行，复制到/etc/init.d，注册为开机启动

```shell
touch myIp.sh
chmod 755 myIp.sh、
sudo cp myIp.sh /etc/init.d
sudo update-rc.d myIp.sh defaults
```

myIp.sh 脚本内容如下:

```shell
#!/bin/bash

NODE=/home/pi/.nvm/versions/node/v6.3.1/bin/node

SERVER_JS_FILE=/home/pi/code/sendMyIp/index.js
USER=pi
OUT=/home/pi/nodejs_myip.log

case "$1" in

start)
echo "starting get your raspberry ip : $NODE $SERVER_JS_FILE"
sudo -u $USER $NODE $SERVER_JS_FILE > $OUT 2>$OUT &
;;

stop)
killall $NODE
;;

*)

echo "usage: $0 (start|stop)"

esac

exit 0
```

### 最后

记得升级一下 node 版本 我用的是 v6.3.1

打完收工，快去重启一下 PI 试一下吧
