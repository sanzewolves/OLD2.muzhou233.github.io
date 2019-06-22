---
layout: post
title: Ubuntu 使用记录-美化篇
date: 2016-10-15
categories: blog
tags: [LINUX,UBUNTU]
description: 
timedepend: true
---

此应用集意在记录我这段时间多次重复安装配置 ubuntu 的一点经验  

**注:**  
**本人使用的环境为 ubuntu12.04LTS 桌面环境为默认的 unity,虽然版本较老 但比较稳定**  
**本文中使用的 apt-fast 命令在我的另一篇博客中提到,如果没有安装请改为 apt-get**  

- Compiz  
- Ubuntu-tweak   

## Compize

**ubuntu 特效神器 但是容易导致系统不稳定**  

### 安装方法

Step 1:安装 N 卡驱动工具  

	sudo apt-fast install nvidia-331  

*这个东西其实没有太大的作用，驱动问题这里不在讨论，系统也会自带很多*  

Step 2:安装 Compiz  

	sudo apt-fast install compiz-plugins  
	sudo apt-fast install compizconfig-settings-manager  

Step 3：打开 compiz config-settings-manager(CCSM),就可以开始折腾了,**请自行探索,这样才有意思**  

### 折腾死之后的复活

**使用过程中不要习惯性的忽视 compiz 给出的警告,如果桌面环境死掉了,请这样做:**  

Step 1:进入命令行模式  

	ctrl+alt+f1  

Step 2:删除 compiz 的配置目录  

	sudo rm -rf  .config/compiz*  .gconf/apps/compiz*  compiz*  

Step 3:关闭进程  

	killall gnome-session  

Step 4:重启  

	sudo reboot  

- **讲道理**,你应该可以进入桌面环境了  
- **不讲道理**,自行探索  

[更多介绍](http://www.cnblogs.com/csulennon/p/4452302.html)  

***

## Ubuntu-tweak

**有很多实用工具,但是据说已经停止更新了,不过没关系,还是可以下载使用的**  

### 安装方法

Step 1:添加 PPA 源  

	sudo apt-add-repository ppa:tualatrix/ppa  

*添加过程中需要输入一次 [ENTER] 来确认*  

Step 2:更新源信息  

*这是添加任何源之后必做的事情*  

	sudo apt-fast update  

Step 3:下载 Ubuntu tweak	 

	sudo apt-fast install Ubuntu-tweak  

**ubuntu-tweak 安装好之后会添加到系统设置菜单,不需要到处寻找**  

### 主题推荐

Numix 确实是一款漂亮的主题。它有着扁平和弧形图标，并且完美的集成进 Unity 桌面环境中  

    sudo add-apt-repository ppa:numix/ppa  
    sudo apt-get update  
    sudo apt-get install numix-gtk-theme numix-icon-theme numix-icon-theme-circle numix-wallpaper-saucy  

***

注:这两款工具安装之后最好注销重登陆,调整 compiz 的时候有可能重载用户界面,如果出现 BUG,请尝试注销或重启  
