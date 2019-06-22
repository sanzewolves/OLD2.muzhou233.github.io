---
layout: post
title: 浅谈预流推进网络流算法
date: 2016-10-17
categories: blog
tags: [OI]
description: 
---

## 算法简介

今天通过`算法导论`学习了推送-重贴标签算法, 感觉相对于增广路算法甚是好写, 于是直接瞎写代码并提交模板题, 却发现算法效率并不高, 还不知道是什么原因  
  
推送-重贴标签算法的思路是先推送尽可能多的流量到与源点相邻的节点, 每个节点可以储存无限多的流量;  
每个节点增加两个属性: 高度(源点初始高度为节点数量, 其他的为 0), 流量（节点可以储存流量，没有上限）;  
节点储存着流量的节点被叫做溢出节点, 对于每个节点:  
1. 当存在一个相邻节点低于当前节点且连接这两个点的边存在于残量网络中（即还可以流）时, 向那个节点流动  
2. 当无法流时, 尝试提升节点高度至比`最低的可以流至的相邻接点`高 １ 的位置  
3. １或２都无法执行或节点不再溢出时, 转移到下一个节点  

***  

## 然而代码效率并不高

经过模板题的测试, 速度并不很快, 即使理论界和 Dinic 算法一样: `O(N*N*E)`  

***  

## 自己做的优化

原始版本的推送-重贴标签算法使用了类似 Bellman-ford 的 while() 循环来寻找溢出节点, 所以我借鉴了对 Bellman-ford 的队列优化, 对这个算法进行队列优化, 代码如下:  

```c++  
//N 是点数量
queue<int>que;//队列优化
bool inque[N];//也是队列优化的内容，参见SPFA
int h[N];//高度数组
int e[N];//节点储存的流量

int Min(int x,int y){return x<y?x:y;}//辅助函数

bool push_up(int p){//提升节点高度
	int new_h=INF;//当前节点原来的高度
	for(int i=iter[p];i!=-1;i=G[i].nex)//枚举边
		if(G[i].v)new_h=Min(new_h, h[G[i].to]);//只计算边还存在流量的点
	new_h++;//比相邻节点的最低高度高 1
	if(new_h==h[p])return 0;//如果高度没有变化就表示无法提升节点高度
	h[p]=new_h;//
	return 1;//
}

void flow(int p){//
	for(int i=iter[p];i!=-1;i=G[i].nex)if(G[i].v&&h[p]>h[G[i].to]){//
		int f=Min(e[p], G[i].v);//
		e[p]-=f;G[i].v-=f;//
		e[G[i].to]+=f;G[G[i].rev].v+=f;//
		if(inque[G[i].to])continue;//
		que.push(G[i].to);//
		inque[G[i].to]=1;//
	}
}

void max_f(){//
	super_to=(n+m)*2+1;//
	h[0]=super_to;//
	for(int i=iter[0];i!=-1;i=G[i].nex){//
		e[G[i].to]=G[G[i].rev].v=G[i].v,G[i].v=0;//
		que.push(G[i].to);//
		inque[G[i].to]=1;//
	}
	while(!que.empty()){//
		int now=que.front();que.pop();//
		inque[now]=0;//
		if(now==0||now==super_to)continue;//
		flow(now);//
		while(e[now]&&push_up(now))flow(now);//
	}
}
```  

需要提的一点是，多推送出去的流量如果没有流入汇点，就一定会返回源点，否则就不符合\*\*\* , **你知道就行，反正这么写是对的**；  

## 图的存储方式

上面的代码使用了`前向星`方式储存图  

>什么？我不明白！  

好吧，这里是代码  

```c++
struct E{
	int to,v,nex,rev;//rev代表反向边，用于快速查询
	E(int a=-1,int b=-1,int c=-1,int d=-1){to=a;v=b;nex=c;rev=d;}
};
E G[M];//M是边数上限
int top=0;
int iter[N];

void add_edge(int fro,int to,int v){//顺带上加边
	G[top]=(E){to,v,iter[fro],top+1};
	iter[fro]=top++;
	G[top]=(E){fro,0,iter[to],top-1};//反向边
	iter[to]=top++;
}
```  

至于具体的效率问题，我还没有测试，你可以自己探索，这里是模板题样例:  
## [运输问题 1](http://cogs.pro/cogs/problem/problem.php?pid=11)  
★★☆   输入文件：maxflowa.in   输出文件：maxflowa.out   简单对比  
时间限制：1 s   内存限制：128 MB  

### 问题描述

一个工厂每天生产若干商品，需运输到销售部门进行销售。从产地到销地要经过某些城镇，有不同的路线可以行走，每条两城镇间的公路都有一定的流量限制。请你计算，在不考虑其它车辆使用公路的前提下，如何充分利用所有的公路，使产地运输到销地的商品最多，最多能运输多少商品。
### 输入格式

输入文件有若干行
第一行，一个整数 n，表示共有 n 个城市(2<=n<=100),产地是 1 号城市，销地是 n 号城市。
下面有 n 行，每行有 n 个数字。第 p 行第 q 列的数字表示城镇 p 与城镇 q 之间有无公路连接。数字为 0 表示无，大于 0 表示有公路，且该数字表示该公路流量。
### 输出格式  

输出文件有一行
第一行，1 个整数 max，表示最大流量为 max。

### 输入输出样例  

输入文件名： maxflowa.in
6
0 4 8 0 0 0
0 0 4 4 1 0
0 0 0 2 2 0
0 0 0 0 0 7
0 0 0 6 0 9
0 0 0 0 0 0
输出文件名：maxflowa.out
8 

***  

评测记录:  
评测结果 	AAAAAAAAEA　题目名称 	运输问题 1  
最终得分 	90 	是否通过 	未通过  
代码语言 	C++ 	运行时间 	0.085 s  内存使用 	0.47 MiB   
*Ｅ 是因为数组开小了，懒得改了*  
