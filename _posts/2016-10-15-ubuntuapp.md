---
layout: post
title: Ubuntu 使用记录 - 常用应用
date: 2016-10-15
categories: blog
tags: [LINUX]
description: 
timedepend: true
---

此应用集意在记录我这段时间多次重复安装配置 ubuntu 的一点经验
**注:**
**本人使用的环境为 ubuntu12.04LTS 桌面环境为默认的 unity,虽然版本较老 但比较稳定**
**本文中使用的 apt-fast 命令在我的另一篇博客中提到,如果没有安装请改为 apt-get**

- Firefox
- Thunderbird
- QQ
- Sogou-input
- Lantern

## Firefox

系统自带,但是要单独开一篇

## Thunderbird

系统自带,兼容主流电子邮件服务商

## QQ

**这里讨论基于 wine 的 QQ**

Step 1:下载安装 wine

	sudo apt-fast install wine

Step 2:下载 QQ 国际版(前两个过程耗时较长,可以与 Step 1 同时下载)

	百度网盘: http://pan.baidu.com/s/1hr5Z4I4

*这个资源是 优麒麟 提供的,可以放心下载,你也可以查看[原地址](http://www.ubuntukylin.com/application/show.php?lang=cn&id=279)*

Step 3:解压压缩包并安装
 
	如果无法解压 zip 文档 请安装 rar
	sudo apt-fast install rar

***

	sudo dpkg -i ttf-wqy-microhei_0.2.0-beta-2_all.deb
	sudo dpkg -i fonts-wqy-microhei_0.2.0-beta-2_all.deb
	sudo dpkg -i wine-qqintl_0.1.3-2_i386.deb

**三个安装包存在依赖关系,如果安装时出现错误,请尝试:**

	sudo apt-get upgrade -f

## Sogou-input

**搜狗官方提供下载及说明文档,比较良心,不像某讯**

[点击打开官方网址](http://pinyin.sogou.com/linux/?r=pinyin)

*需要先安装 fcitx,但是有官方教程,在此不再赘述*

## Lantern

[官方](https://GetLantern.org/)提供 linux 版本维护,但是有 GFW 的照顾,你还是去 [github](https://github.com/getlantern/lantern-binaries)比较好

在列表中寻找 deb 包,下载安装即可
