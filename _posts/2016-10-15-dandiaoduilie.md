---
layout: post
title: 单调队列实现与例题
date: 2016-10-15
categories: blog
tags: [OI]
description: 单调队列就是一个符合单调性质的队列
---

## 单调队列
就是一个符合单调性质的队列，它同时具有单调的性质以及队列的性质。他在编程中使用频率不高，但却占有至关重要的地位。它的作用很简单，就是为了维护一组单调数据，让我们在运行的过程中能够快速寻求前 k 个或后 k 个中最大或最小的值。  

单调队列的核心就是队列中的元素保持递增或递减  

**强行证明正确性:**  

### 对于最大数的操作

假设在数组 a 中存在某个数 x , 它在以它为中心, 长度为 2*k-1 的区间中是最大的, 也就是说, 往前 k-1 个数, 往后 k-1 个数, 都小于或等于 x;  
例如: 2 3 4 5 2 3 4 (k=4)  

#### 先讨论 2*k-1 区间中没有等于 x 的数的情况

当 push(x) 时  

- 若队列中存在比 x 大的数, 那么它在数组中的位置距离 x 一定大于 k (由假设可知), 所以它会从队首出队  
- 这时队列中存在的数都小于 x , 执行 push(x) 就表示长度为 k 的区间已经覆盖了 x , 在 x 出队前, 它一定是所求的值(由假设可知), 所以队列中的数会全部从队尾出队  
- 执行之后 队列中就只剩 x 一个元素  

#### 然后是 2*k-1 区间中 x 前面存在一个等于 x 的数 y 的情况

当 push(x) 时  

- 如果队列中 y 出队, 并将 x 入队, 由于 x 与 y 的值相等, 得到的结果与更新 y 对应的时间戳为 x 的时间戳等价, 所以可以将其出队(事实上不出队也不会对正确性有影响)  

#### 2*k-1 区间中 x 后面存在一个等于 x 的数 y 的情况

与上一种情况类似  

### 对于其他数

*写不下去了*  

***

裸题欣赏:  

## [COGS495 窗口](http://cogs.pro/cogs/problem/problem.php?pid=495)

★☆   输入文件：window.in   输出文件：window.out   简单对比  

时间限制：2 s   内存限制：256 MB  


### 问题描述


给你一个长度为 N 的数组，一个长为 K 的滑动的窗体从最左移至最右端，你只能见到窗口的 K 个数，每次窗体向右移动一位，如下表：  

|Window position	|Min value 	|Max value|  
|:----------------------|:--------|:------|  
|[1 3 -1] -3 5 3 6 7 	|-1 	|3	|  
|1 [3 -1 -3] 5 3 6 7 	|-3 	|3	|  
|1 3 [-1 -3 5]3 6 7 	|-3 	|5	|  
|1 3 -1 [-3 5 3] 6 7 	|-3 	|5	|  
|1 3 -1 -3 [5 3 6] 7 	|3 	|6	|  
|1 3 -1 -3 5 [3 6 7 ] 	|3 	|7	|  
  
  
你的任务是找出窗口在各位置时的 max value, min value．  


### 输入格式

第一行 n，k，第二行为长度为 n 的数组  

### 输出格式

第一行每个位置的 min value, 第二行每个位置的 max value  

### 样例

#### 输入
8 3  
1 3 -1 -3 5 3 6 7  

#### 输出
-1 -3 -3 -3 3 3  
 3  3  5  5  6 7  


### 数据范围

20％：n≤500；  
50％：n≤100000；  
100％：n≤1000000；   

***

两个单调队列,一个计算最大,一个计算最小  

***

### 代码实现

```cpp
#include <cstdio> 

const int N = 1000000+10; 

struct P{
	int x, t;//x 是值, t 是时间戳 
}; 
P Max_que[N], Min_que[N]; 
int Max_head = 0, Max_tail = 0, Min_head = 0, Min_tail = 0; 
int a[N]; 
int n, k; 

inline void Max_push(int x, int t){
	while(Max_head > Max_tail && Max_que[Max_tail].t < t-k+1)Max_tail++;//已经不包含在长为 k 的块的数出队
	while(Max_head > Max_tail && Max_que[Max_head-1].x < x)Max_head--;//比将要入队的书小的数出队
	Max_que[Max_head++] = (P){x, t}; 
}

inline void Min_push(int x, int t){
	while(Min_head > Min_tail && Min_que[Min_tail].t < t-k+1)Min_tail++; 
	while(Min_head > Min_tail && Min_que[Min_head-1].x > /*只有这里和上面不一样*/ x)Min_head--; 
	Min_que[Min_head++] = (P){x, t}; 
}

inline int getint(int ret = 0, char c = getchar(), bool neg = 0){//快速读入, 参数是为了压行
	while(c < '0' || c > '9')c = getchar(),if(c == '-')neg = true; 
	while(c >= '0'&&c <= '9')ret = ret*10+c-'0', c = getchar(); 
	return neg ? -ret : ret; 
}

inline void putint(int x){//快速输出
	int i = 1; char put[15]
	if(x < 0)x = -x,putchar('-');//处理负数 
	if(x == 0)putchar('0'); 
	while(x) put[i++] = x%10+'0', x/ = 10; 
	i--; while(i > 0)putchar(put[i--]); 
}

int main()
{
	freopen("window.in","r",stdin); 
	freopen("window.out","w",stdout); 

	scanf("%d%d", &n, &k); 
	for(int i = 0; i < n; i++)a[i] = getint(); 

	for(int i = 0; i < k-1; i++)Min_push(a[i], i);//把前面的先加入队列,注意边界是 i < k-1
	for(int i = k-1; i < n; i++){//每次加入都输出一次
		Min_push(a[i], i); 
		putint(Min_que[Min_tail].x); 
		putchar(' '); 
	}
	putchar('\n'); 
	//重复上面的操作, 差别不大
	for(int i = 0; i < k-1; i++)Max_push(a[i], i); 
	for(int i = k-1; i < n; i++){
		Max_push(a[i], i); 
		putint(Max_que[Max_tail].x); 
		putchar(' '); 
	}
	return 0; 
}
```


