---
layout: post
title: 魔兽世界之一：备战-解题报告
date: 2016-10-15
categories: blog
tags: [OI]
description: 魔兽世界之一：备战[cxsjsx.openjudge.com]
---

## 魔兽世界之一：备战[cxsjsx.openjudge.com][1]

- 总时间限制: 1000ms
- 内存限制: 65536kB
  
## 描述

魔兽世界的西面是红魔军的司令部，东面是蓝魔军的司令部。两个司令部之间是依次排列的若干城市。
红司令部，City 1，City 2，……，City n，蓝司令部

两军的司令部都会制造武士。武士一共有 dragon 、ninja、iceman、lion、wolf 五种。每种武士都有编号、生命值、攻击力这三种属性。

双方的武士编号都是从 1 开始计算。红方制造出来的第 n 个武士，编号就是 n。同样，蓝方制造出来的第 n 个武士，编号也是 n。

武士在刚降生的时候有一个生命值。

在每个整点，双方的司令部中各有一个武士降生。

红方司令部按照 iceman、lion、wolf、ninja、dragon 的顺序循环制造武士。

蓝方司令部按照 lion、dragon、ninja、iceman、wolf 的顺序循环制造武士。

制造武士需要生命元。

制造一个初始生命值为 m 的武士，司令部中的生命元就要减少 m 个。

如果司令部中的生命元不足以制造某个按顺序应该制造的武士，那么司令部就试图制造下一个。如果所有武士都不能制造了，则司令部停止制造武士。

给定一个时间，和双方司令部的初始生命元数目，要求你将从 0 点 0 分开始到双方司令部停止制造武士为止的所有事件按顺序输出。
一共有两种事件，其对应的输出样例如下：

1) 武士降生
输出样例： 004 blue lion 5 born with strength 5,2 lion in red headquarter
表示在 4 点整，编号为 5 的蓝魔 lion 武士降生，它降生时生命值为 5，降生后蓝魔司令部里共有 2 个 lion 武士。（为简单起见，不考虑单词的复数形式）注意，每制造出一个新的武士，都要输出此时司令部里共有多少个该种武士。

2) 司令部停止制造武士
输出样例： 010 red headquarter stops making warriors
表示在 10 点整，红方司令部停止制造武士

输出事件时：

首先按时间顺序输出；

同一时间发生的事件，先输出红司令部的，再输出蓝司令部的。  

## 输入

第一行是一个整数，代表测试数据组数。

每组测试数据共两行。

第一行：一个整数 M。其含义为， 每个司令部一开始都有 M 个生命元( 1 <= M <= 10000)。

第二行：五个整数，依次是 dragon 、ninja、iceman、lion、wolf 的初始生命值。它们都大于 0 小于等于 10000。  

## 输出

对每组测试数据，要求输出从 0 时 0 分开始，到双方司令部都停止制造武士为止的所有事件。
对每组测试数据，首先输出 "Case:n"，n 是测试数据的编号，从 1 开始 。
接下来按恰当的顺序和格式输出所有事件。每个事件都以事件发生的时间开头，时间以小时为单位，有三位。  

### 样例输入

1
20
3 4 5 6 7

### 样例输出

Case:1  
000 red iceman 1 born with strength 5,1 iceman in red headquarter  
000 blue lion 1 born with strength 6,1 lion in blue headquarter  
001 red lion 2 born with strength 6,1 lion in red headquarter  
001 blue dragon 2 born with strength 3,1 dragon in blue headquarter  
002 red wolf 3 born with strength 7,1 wolf in red headquarter  
002 blue ninja 3 born with strength 4,1 ninja in blue headquarter  
003 red headquarter stops making warriors  
003 blue iceman 4 born with strength 5,1 iceman in blue headquarter  
004 blue headquarter stops making warriors  

## 题目分析

按照题目模拟操作，主要考察代码能力   

## 代码实现

作为竞赛选手，我打了一些不像工程不像竞赛的代码，之后还有两道扩展题需要做，希望我不会死
我的写代码过程：  

1. 按照题目随心写  
2. Compile 更正语法错误  
3. debug 把代码改正确  

然后我就第一次浅显地体会到了如何维持代码可扩展

---

```c++
#include<cstdio>
#include<cstring>
using std::strcpy;

const int M = 10000+10;
const char name_of_soldier[][7] = {"dragon", "ninja", "iceman", "lion", "wolf"};
int hp_of_soldier[6];
int time;

struct S{
char name[7];
int number,hp,rest;
S () {init();}
void init () {number = rest = 0;}
};

struct T{
char color[5];
int hp_of_headquarter;

S soldiers[6];
int number_of_new_soldier;
int next_soldier;
bool cant_make_soldier;

void init (bool red, int hp) {
	next_soldier = number_of_new_soldier = cant_make_soldier = 0;
	hp_of_headquarter = hp;
	if (red) {
		strcpy(color, "red");
		int buf[5] = {2, 3, 4, 1, 0};
		for (int i = 0; i < 5; i++) {
			soldiers[i].init();
			strcpy(soldiers[i].name, name_of_soldier[buf[i]]);
			soldiers[i].hp = hp_of_soldier[buf[i]];
		}
	} else {
		strcpy(color, "blue");
		int buf[5] = {3, 0, 1, 2, 4};
		for (int i = 0; i < 5; i++) {
			soldiers[i].init();
			strcpy(soldiers[i].name, name_of_soldier[buf[i]]);
			soldiers[i].hp = hp_of_soldier[buf[i]];
		}
	}
}

void put_stop_make_soldier () {
	printf("%03d %s headquarter stops making warriors\n",time,color);
}
void put_soldier_maked (const int x) {
	printf("%03d %s %s %d born with strength %d,", time, color, soldiers[x].name, number_of_new_soldier, soldiers[x].hp);
	printf("%d %s in %s headquarter\n", soldiers[x].rest, soldiers[x].name, color);
	//printf("%d\n",next_soldier);
}

void make_soldier () {
	bool maked = 0;
	if(cant_make_soldier)return;
	//printf("%d\n", next_soldier);
	if (soldiers[next_soldier].hp > hp_of_headquarter) {
		for (int i = 0; i < 5; i++, next_soldier++) {
			if (next_soldier>=5) next_soldier = 0;
			if (soldiers[next_soldier].hp <= hp_of_headquarter){
				maked = 1;
				break;
			}
		}
	} else maked = 1;
	if (maked) {
		hp_of_headquarter -= soldiers[next_soldier].hp;
		soldiers[next_soldier].number++;
		soldiers[next_soldier].rest++;
		number_of_new_soldier++;
		put_soldier_maked(next_soldier);
		next_soldier++;
		if (next_soldier>=5) next_soldier = 0;
	} else {
		cant_make_soldier = 1;
		put_stop_make_soldier();
	}
}
};
T red, blue;

int main()
{
#ifdef LOCAL
freopen("moshou1.in", "r", stdin);
freopen("moshou1.out", "w", stdout);
#endif
int t;
scanf("%d",&t);

for(int l = 1; l <= t; l++){
	int m;
	time = 0;

	for(int i = 0; i < 5; i++) scanf("%d", &hp_of_soldier[i]);
	
	red.init(1, m);
	blue.init(0, m);
	
	printf("Case:%d\n", l);
	
	for(;!(red.cant_make_soldier && blue.cant_make_soldier); time++){
		red.make_soldier();
		blue.make_soldier();
	}
}
return 0;
}
```
---
后面还要改一些内容来支持后两道题的扩展需求

[1]:http://cxsjsx.openjudge.cn/2015warpractice/A/



