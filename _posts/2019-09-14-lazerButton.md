---
layout: post
title: 仿osu!lazer风格的点击效果
date: 2019-09-14
lastDate: 2019-09-14
categories: blog
tags: [OSU!]
description:
---

最近突发奇想在博客上增加了一个模仿osu!lazer的node点击效果，由于技术不精，花费了一天的时间。

## 素材

首先我翻遍了Github上面的源码还是没有找到lazer的node素材，后来在[osu官网](https://osu.ppy.sh)上找到了我想要的那张图片，经过处理显示出来了所有的三角，放在下面

![](/img/button/button0.svg)

### 人工切图

仔细观察了lazer的点击效果之后我发现这张素材图片应该是切成小块用比较接近lazer的效果，而这个图片又是SVG格式的，所以连PS都用不上了，直接文本编辑器，因为太懒就只切了六张

|![](/img/button/button1.svg) | ![](/img/button/button2.svg) | ![](/img/button/button3.svg)
|---|---|---|
|![](/img/button/button4.svg) | ![](/img/button/button5.svg) | ![](/img/button/button6.svg)

## 实现

之前调校随机颜色的node的点击和三角散开的效果都不是很理想，最终决定不做圆形node了只保留三角形散开的效果，随机颜色还得用css3的新属性，总之就先这么凑活用吧