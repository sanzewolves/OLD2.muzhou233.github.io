---
layout: post
title: 浅谈线段树
date: 2016-10-21
categories: blog
tags: [OI,转载]
description:
copyright: 本文转载自 http://blog.csdn.net/CoolKid_cwm/article/details/52137427
---

## 线段树的定义

百度百科定义如下：  

	线段树是一种二叉搜索树，与区间树相似，它将一个区间划分成一些单元区间，每个单元区间对应线段树中的一个叶结点。

由定义可知，线段树实质上是一种二叉搜索树，是一棵完全二叉树，它们的各个节点保存着一个线段的信息(这个信息可以是最值、区间和等多种信息)。  

## 线段树的基本内容

下图是一棵区间长度为 10 的线段树  

![](http://img.blog.csdn.net/20160806175008686)  

一般的，我们把线段树从上到下从左到右开始编号，例如：[1,10] 编号为 0，[1,5] 编号为 1，[6,10] 编号为 2，以此类推。其中每个非叶子节点都有左右两棵子树。  

### 线段树的存储

```c++  
//此存法为非指针版本
struct SEG{
    int l,r;//表示其所控制的区间(线段)
    int lch,rch;//表示它的左右儿子的节点编号
    int information;//表示存储的信息
    void clear(){//初始化
        l = r = 0;
        lch = rch = -1;//左右儿子为空
        information = INF;
    }
    void clear(int a,int b){//将其控制区间初始设为[a,b]
        clear();
        l = a;r = b;
    }
}Tree[MAXN*2];//MAXN为所需的最大值 可证明节点数最多为2倍区间长度
```

### 线段树的基本操作

注意：这里存储的 information 是区间最小值  

#### 点修改  

线段树在点修改时会把包含该点的区间修改，下面是一个修改节点 4 的示意图，红色节点表示该节点被修改。具体改法详见代码。  

![](http://img.blog.csdn.net/20160806175312261)  

```c++  
void change(int u,int p,int x){//u 代表当前所在节点编号，p 表示所要修改对应的线段，x 是表示线段 p 要修改为 x
    if(u==-1) return;//如果该节点不存在直接退出
    SEG &now=Tree[u];
    if(now.l>p||now.r<p) return;//如果p不在该区间内，则直接退出
    if(now.l==p&&now.r==p) now.min=x;//节点u为叶子节点，且节点u所管辖的线段正好是p，直接修改
    else{//此时满足 l <= p <= r
        change(now.lch,p,x);//在左半个区间查找并修改
        change(now.rch,p,x);//在右半个区间查找并修改
        //修改完后依据其子区间的修改进行相应的修改
        now.min=min(Tree[now.lch].min,Tree[now.rch].min);
    }
}
```  

其中单个点的修改时间是 O(logn)。  

#### 查询  

还以上图区间长度为 10 的线段树为例，若要查询区间 [4,9]，那么 min([4,9])=min( min([4,5]) , min([6,8]) , min([9]) )，它可以分成这三个区间求最小值。  
由此我们可以得出对于任意一个区间求最小值，其总可以分成线段树上的几个不同的节点求最小值（可证明分成的区间个数最多不超过 2*h 个，h 为线段树的深度），寻找的方法就是不断的细分区间直到找到一个区间被所查找的区间包括。具体实现见代码。  

代码：  

```c++  
int query(int u,int L,int R){//u 表示当前查询已经访问到节点 u，要查询的区间为 L,R
    SEG &now=Tree[u];
    if(now.l>R||now.r<L) return INF;//如果所查询的区间完全不在节点 u 所控制的区间范围内返回正无穷
    if(now.l>=L&&now.r<=R) return now.min;//u 所控制的区间是所要查询的区间的子区间，则返回该区间的最小值
    return min(query(now.lch,L,R),query(now.rch,L,R));//如果上述两种情况都不满足则继续细分区间直到满足上述情况为止
}
```  

同样的每次查询的时间为 O(logn)。  

#### 建树  

建树的过程是先预设好每个节点所管辖的线段，然后通过上面的 change 函数不断的加点，预设每个点的函数见下面的代码。  

预处理代码：  

```c++  
int tot=0;

int build(int L,int R){//需要建立一个区间为[L,R]的一棵线段树
    int p=tot++;//申请一个新的节点
    SEG &now=Tree[p];
    now.clear(L,R);//并将该节点的区间设为[L,R]
    if(L<R){//如果区间还可以细分
        int mid=(L+R)/2;//取其中点继续细分
        now.lch=build(L,mid);
        now.rch=build(mid+1,R);
        //并将其父节点的左右儿子设为其儿子的编号
    }
    return p;//返回该节点的编号
}
```  

对于每个节点 build 函数只访问了一次可以证明节点数最多为 2*线段长度，因此上述的 build 函数的时间复杂度为 O(n)。  

建树代码：  

```c++  
void Build(int n){
    build(1,n);//区间为[1,n]
    for(int i=1;i<=n;i++){
        int x;
        scanf("%d",&x);
        change(0,i,x);
    }//对于每个节点不断的加点并修改
}
```  

对于每个节点的修改时间复杂度为 O(logn)，因此总的建树的代码时间复杂度应为 O(nlogn)。  

4.线段树的区间修改  

对于线段树的区间修改，一种方法是按着点修改来这样可以在 O(nlogn) 的时间内完成，但是时间效率并不高。因此我们介绍一个叫 lazy_tag 的东西，通过对 lazy_tag 的修改来替代对区间的修改（注意当一个节点 lazy_tag 被修改后，它的影响范围不只是局限于该节点上，而是在对它本身为根的整棵子树都有影响）。当我们访问到一个节点时，如果其所存储的 lazy_tag 值不为空，那么就必须要把它所存储的信息传到其孩子上（也就是下面的 pushdown 函数），原因见上面括号里面的话。  

注意：lazy_tag 只是一个统称在不同的代码里面可能有不同的名字  

代码：  

```c++  
void pushdown(int u){//注意此处的delta就是代表上面所说的lazy_tag
    if(u==-1) return;//写上最好防止出现奇奇怪怪的错误QAQ
    SEG &now=Tree[u];
    if(now.delta){//如果lazy_tag不为空
        //注意此处全部用的是+=
        Tree[now.lch].delta+=now.delta;
        Tree[now.rch].delta+=now.delta;//修改lazy_tag
        Tree[now.lch].min+=now.delta;
        Tree[now.rch].min+=now.delta;//修改min
    }
    now.delta=0;//已经把lazy_tag传下去，因此将其设为0
}

void Add(int u,int L,int R,int delta){
    if(u==-1) return;//没错，这也是防止一些奇奇怪怪的错误的QAQ
    SEG &now=Tree[u];
    if(now.l>R||now.r<L) return;//完全不包含的情况
    if(now.l>=L&&now.r<=R){//完全包含的情况
        //注意此处也是+= 
        now.min+=delta;
        now.delta+=delta;
        //然而我第一遍写的时候顺手写了个等于然后就呵呵了QAQ
    }
    else{//部分包含的情况
        pushdown(u);//因为要递归调用它的子节点因此应该先把lazy_tag压下去
        Add(now.lch,L,R,delta);
        Add(now.rch,L,R,delta);
        now.min=min(Tree[now.lch].min,Tree[now.rch].min);//子节点修改完后修改本身的值
    }
}
//因为区间修改完之后其查询跟上面单点修改的查询会有一点不一样，故将查询再次写一遍
int query(int u,int L,int R){
    if(u==-1) return INF;
    SEG &now=Tree[u];
    if(now.l>R||now.r<L) return INF;
    if(now.l>=L&&now.r<=R) return now.min;
    else{
        pushdown(u);//注意其实就是这一点不一样，还是刚刚说的在递归调用前必须先把lazy_tag压到下面去，否则会出事的QAQ
        return min(query(now.lch,L,R),query(now.rch,L,R));
    }
}
```  

举个例子，还是上面的线段树，当把区间 [1,8] 同时加上 3 时，会跟上面查询时一样，细分区间，分为 [1,5]∪[6,8]，因此这两条线段对应的节点上的 lazy_tag 的值增加（注意是增加不是变为） 3，它所维护的信息也因此而改变（例如 min 或 max 直接增加 lazy_tag 即可，而 sum 要增加（R-L+1）*lazy_tag）。  

## 线段树的模板题

这里只提供两道:
一道是点修改 `忠诚`  
另一道是区间修改 `售票系统`  
这两道一只是检验最基本的线段树的正确性，本文并没有提供任何其他线段树的用法，只介绍了一些最基本的东西。  