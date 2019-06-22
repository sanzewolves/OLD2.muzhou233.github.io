---
layout: post
title: Ubuntu 下神奇的多线程 apt-get
date: 2016-10-15
categories: blog
tags: [LINUX,UBUNTU,转载]
description: 
timedepend: true
copyright: 原文链接 http://tieba.baidu.com/p/2733068976
---

- 用过 ubuntu 的都（应该）知道 apt-fast 简直就是神器  
- 但是这个神奇似乎一直游离于 Debian 的软件库外  
- 官方 PPA 源也不提供对 Debain 的支持  

**难道我们就这样放弃么？**  
**当然是不可能的！！！！**  

我们自己动手丰衣足食  

***

**为了便于操作我们还是在 root 下进行吧**  

## Step.1 安装 axel

	$ sudo apt-get install axel

## Step.2 下载脚本 apt-fast.sh

	下载地址 http://www.mattparnell.com/linux/apt-fast/apt-fast.sh

## Step.3 安装 apt-fast

	sudo mv /root/apt-fast.sh /usr/bin/apt-fast
	sudo chmod +x /usr/bin/apt-fast

***

现在你已经可以使用 apt-fast 替代 apt-get 了  
试一下  

	apt-fast update
	apt-fast upgrade
	apt-fast install XXXXX  

**为什么只有 4 线程？ 说好的 10 线程呢？**  

## Step.4 魔改 axel 设置脚本！

	sudo gedit /etc/axelrc

**我用的文本编辑器是 vim，你们请自行将"gedit"替换为你喜欢的编辑器**  

找到  

	num_connections = 4

默认的 4 线程就是不爽  
直接修改这个值  
例如：十线程  

	num_connections = 10

保存退出  

***

再试试  

	apt-fast install XXXXX  

**妥妥的 10 线程有木有！有木有！**  

**什么？想看看同时撸 100 下的样子？**  
好吧 换成**num_connections = 100**就行  


>但是小撸怡情，大撸伤身，强撸灰飞烟灭  
>要是你的本本撸坏了可别找我！  

在亲自使用的过程中发现,apt-fast 工作时会先完成下载,再询问是否安装,所以要谨慎地 [ENTER],如果出现问题 还需要返回 apt-get 处理错误	 
