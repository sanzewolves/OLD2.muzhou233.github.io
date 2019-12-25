---
layout: post
title: 再谈预流推进 - 更快的前置重贴标签算法
date: 2016-10-24
categories: blog
tags: [OI]
description: 快速网络流算法：前置重贴标签
---

## 何为再谈？

几天前写了一篇博客：[浅谈预流推进网络流算法](/blog/2016/10/17/wangluoliu/)  
其中简单描写了推送-重贴标签算法, 但`算导`中还有一个后续章节写到了一个优化的算法, 即前置-重贴标签  
*另外, 之前那篇博客的内容有一些错误, 懒得再改了*  
*如果我的变量名很难看的话, 请原谅*

## 分析-准备

`前置-重贴标签`是对`推送-重贴标签`的优化, 那么他们一定是类似的, 或者说, 代码会变长`一丢丢`  

设想, `推送-重贴标签`慢到了哪里? (类比 spfa 的函数) 就是那个 while() 语句! 所以说我们需要针对 while() 语句进行优化  

在推送流量时, `推送`算法是遍历从当前节点发出的所有边并尝试推送流量到高度较低的邻节点, 但是细想可以发现: 还没有扫完所有边就已经推送完流量时, 我们可以保存下当前的边  

为什么? 我们把要讨论的节点称为当前节点, 假设上次调用出现了上述情况, 我们把上次处理当前节点之后储存的边叫做当前边, 证明:  

1. 前提条件: 根据预流推进的`特性`, 所有节点的高度值是不会下降的, 不再证明  
2. 再次处理当前节点, 一定是因为其他节点推送来了流量  
3. 假如是从当前边前面的边推送来的, 那条边对应的节点一定比当前节点高, 而且由于上次推送, 当前边之前的边已经不存在可推送流量(由于高度限制或边容量为零)  
4. 由上一条可知, 再次从头扫描到当前边花费的时间是无效的 不必要的, 所以我们记录当前边是有意义的  

知道了这一点, 就可以优化代码了, 再加上上一篇中提到的队列优化, 这种实现方式曾经由 Tarjan 与另一个人共同提出, 根据`算导-本章注记`所说, 这种实现的期望复杂度已经优化为`V^3`了, 跟我们要讨论的`前置-重贴标签`期望复杂度一样! 直接用呗:  


```c++  
//代码写跪, 留个坑
```  

## 我也不明白为什么的链表优化

可是心里虚, 还是默默尝试一下`前置`吧, `算导`说了, `前置`用了链表优化, 但是后面的证明太长, 本着汝佳的不求甚解精神, 我也不管为什么了, 虽然我不知道为什么这样会快, 但是我知道这样一定不会错, 为什么?  

- 我相信`算导`, 没了  

链表优化是什么呢?  
我们吧所有节点组织成链表, 起始时按拓扑序排列, 然后从表头开始处理:  

1. 对当前节点进行推送操作  
2. 如果已经扫过当前节点的所有边, 重置当前边(也就是循环扫描)  
3. 如果还有未推送流量, 提升当前节点高度, 并将当前节点移至链表头  
4. 如果没有执行 3 ,处理链表中的下一个节点  
5. 到达链表尾, 退出  

本质上就是更换了对节点的处理顺序, 貌似以这样的顺序处理会快一些  

## 在原来的基础上修改

链表优化要求使用`前向星`存储图, 如果你有其他方法的话, 也无所谓了  
先给出数据结构:  

```c++  
struct E{
	int to,cap,rev,nex;//分别是 边连接的点, 流量, 反向边, 下一条边
};
E G[M];//M 是最大边数, 你也可以写成 vector
int head[N],e[N],h[N];//N 是最大节点数
int top=0;

struct L{
	int pre,p,iter,nex;//分别是 上一个, 当前节点, 当前边, 下一个
};
L lis[N];
int lis_head=1;

bool vis[N];
```  

很明显, 队列优化与链表优化是二选一的, 所以我们去掉队列优化, 加入链表优化:  

```c++  
int max_f(int s,int t){
	memset(e,0,sizeof(e));
	memset(h,0,sizeof(h));
	memset(vis,0,sizeof(vis));
	h[s]=t;
	dfs(s,s,t);//计算拓扑序并加入链表中
	lis[--lis_head].pre=0;
	for(int i=head[s];~i;i=G[i].nex)
		G[G[i].rev].cap=e[G[i].to]=G[i].cap,G[i].cap=0;
	//前面的都是初始化
	for(int now=lis_head;now;){
		flow(lis[now].p,lis[now].iter);
		if(lis[now].iter==-1)lis[now].iter=head[lis[now].p];
		if(e[lis[now].p]){
			push_up(lis[now].p);
			if(lis_head==now)continue;
			lis[lis[now].nex].pre=lis[now].pre;
			lis[lis[now].pre].nex=lis[now].nex;
			lis[lis_head].pre=now;
			lis[now].nex=lis_head;
			lis_head=now;
			lis[now].pre=0;
		}else now=lis[now].nex;
	}
	return e[t];
}
```  

这里的 flow() 函数和 push_up() 函数与之前的类似, 代码如下:  

```c++  
void push_up(int p){
	h[p]=INF;
	for(int i=head[p];~i;i=G[i].nex)if(G[i].cap)
		h[p]=Min(h[p],h[G[i].to]);
	h[p]++;
}

void flow(int p,int &i){
	for(;~i&&e[p];i=G[i].nex)if(G[i].cap&&h[p]>h[G[i].to]){
		int f=Min(G[i].cap,e[p]);
		G[i].cap-=f;e[p]-=f;
		G[G[i].rev].cap+=f;e[G[i].to]+=f;
	}
}
```  

函数体很小吧, 还有一个同样很小的函数在这里:  

```c++  
void dfs(int p,int s,int t){
	vis[p]=1;
	for(int i=head[p];~i;i=G[i].nex)if(p<G[i].to&&!vis[G[i].to])dfs(G[i].to,s,t);
	if(p!=s&&p!=t)lis[lis_head++]=(L){lis_head+1,p,head[p],lis_head-1};//跳过源点和汇点, 加进去就需要在 max_f() 中加特判
}
```  

***

## 测试

下面是对这些代码的效率测试:  

### 1

题目名称 	[搭配飞行员](http://cogs.pro/cogs/problem/problem.php?pid=14)  
评测结果 	AAAAAAAAAA	代码语言 	C++  
运行时间 	0.008 s		内存使用 	0.48 MiB  
*这是一道二分图最大匹配, 数据范围 2<=n<=100*  

### 2

题目名称 	[洞穴探险](http://cogs.pro/cogs/problem/problem.php?pid=236)  
评测结果 	AAAAAAAAAAA	代码语言 	C++  
运行时间 	0.025 s		内存使用 	0.97 MiB  
*这是一道裸题, 数据范围 2<=N<=200*  

***

你能接受吗, 不能接受就去学`Dinic`去...  
