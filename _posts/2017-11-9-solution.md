---
layout: post
title: 备战 NOIP2017 - zkw 线段树
date: 2017-11-9
categories: blog
tags: [OI]
---

本来不准备写备战 NOIP2017 系列了，无奈刷题刷爽了...  

## 线段树

维护区间修改查询的数据结构  

第一行包含两个整数 N、M，分别表示该数列数字的个数和操作的总个数  
第二行包含 N 个用空格分隔的整数，其中第 i 个数字表示数列第 i 项的初始值  
接下来 M 行每行包含 3 或 4 个整数，表示一个操作，具体如下： 
 
1. 格式：1 x y k 含义：将区间[x,y]内每个数加上 k  
2. 格式：2 x y 含义：输出区间[x,y]内每个数的和  

```cpp
#include<iostream>
#include<cstdio>
using std::cin;
using std::cout;

typedef long long ll;

const int N=100000+10;

struct P{
    int lc,rc;
    int l,r;
    ll sum,v;
};

P tree[N*2];
int tail=0;

int build_tree(int l,int r){
    P &now=tree[tail++];
    now.l=l;now.r=r;
    if(l+1<r){
        int mid=l+(r-l)/2;
        now.lc=build_tree(l,mid);
        now.rc=build_tree(mid,r);
    }
    return &now-tree;
}

void update(int p){
    P &now=tree[p];
    now.sum=now.v*(now.r-now.l);
    if(now.l+1<now.r)now.sum+=tree[now.lc].sum+tree[now.rc].sum;
}

void push_down(int p){
    P &now=tree[p];
    tree[now.lc].v+=now.v;
    tree[now.rc].v+=now.v;
    now.v=0;
    update(now.lc);
    update(now.rc);
}

void add(int l,int r,ll v,int p=0){
    P &now=tree[p];
    if(l==r)return;
    if(now.l>=r||now.r<=l)return;
    if(now.l>=l&&now.r<=r){
        now.v+=v;
    }else{
        push_down(p);
        add(l,r,v,now.lc);
        add(l,r,v,now.rc);
    }
    update(p);
}

ll query(int l,int r,int p=0){
    P &now=tree[p];
    if(l>=r)return 0;
    if(now.l>=r||now.r<=l)return 0;
    if(now.l>=l&&now.r<=r)return now.sum;
    push_down(p);
    ll ret=query(l,r,now.lc)+query(l,r,now.rc);
    update(p);
    return ret;
}

int main()
{
    std::ios::sync_with_stdio(false);
    int n,m;
    cin>>n>>m;
    build_tree(1,n+1);
    for(int i=1;i<=n;i++){
        ll buf;
        cin>>buf;//scanf("%d",&buf);
        add(i,i+1,buf);
    }
    for(int k=0;k<m;k++){
        int t,l,r;
        cin>>t>>l>>r;
        if(t==1){
            ll v;
            cin>>v;
            add(l,r+1,v);
        }else{
            cout<<query(l,r+1)<<'\n';
        }
        //print();
    }
    return 0;
}
```

[详解看这里](/blog/2016/10/21/segment_tree)  

## zkw 线段树

2013 年，《统计的力量》横空出世  
zkw 线段树看起来很像树状数组（不知为什么...  
zkw 线段树通过挖掘二叉树在数组中的特性，找到了一种可以快速定位叶子节点的方法，于是自顶向下的方法被抛弃，转而使用自底向上的方法  

### 改段求点

```cpp
#include<cstdio>

const int N=500000+10;

int tree[N*3];
int len=1;

void build(int n,int v=0){
    while(len<n+2)len<<=1;
    for(int i=len+1;i<=len+n;i++)scanf("%d",&tree[i]);
}

void add(int l,int r,int v){
    for(l+=len-1,r+=len+1;l^r^1;l>>=1,r>>=1){
        if(~l&1)tree[l+1]+=v;
        if(r&1)tree[r-1]+=v;
    }
}

int query(int n,int res=0){
    for(n+=len;n;n>>=1)res+=tree[n];
    return res;
}

int main()
{
    int n,m;
    scanf("%d%d",&n,&m);
    build(n);
    for(int i=0;i<m;i++){
        int t,x;
        scanf("%d%d",&t,&x);
        if(t==1){
            int y,v;
            scanf("%d%d",&y,&v);
            add(x,y,v);
        }else printf("%d\n",query(x));
    }
    return 0;
}
```

### 改点求段

```cpp
#include<cstdio>

const int N=500000+10;

int tree[N*3];
int len=1;

inline int Min(int a,int b){return a>b?b:a;}

void build(int n){
    while(len<n+2)len<<=1;
    for(int i=len+1;i<=len+n;i++)scanf("%d",&tree[i]);
    for(int i=len;i>0;i--)tree[i]=tree[i<<1]+tree[i<<1^1];
}

void add(int n,int v){
    tree[n+len]+=v;
    for(n+=len;n>1;n>>=1)
        tree[n>>1]=tree[n]+tree[n^1];
}

int query(int l,int r,int res=0){
    for(l+=len-1,r+=len+1;l^r^1;l>>=1,r>>=1){
        if(~l&1)res+=tree[l+1];
        if(r&1)res+=tree[r-1];
    }
    return res;
}

int main()
{
    int n,m;
    scanf("%d%d",&n,&m);
    build(n);
    for(int i=0;i<m;i++){
        int t,x,y;
        scanf("%d%d%d",&t,&x,&y);
        if(t==1)add(x,y);
        else printf("%d\n",query(x,y));
    }
    return 0;
}
```

### 改段求段

```cpp
#include<cstdio>
#include<iostream>
using namespace std;

const int N=100000+10;

typedef long long ll;

ll val[N*4],sum[N*4];
ll len[N*4];
ll length=1;

long long  read(){
    char ch=getchar();
    long long  a=0,f=1;
    while (ch<'0'||ch>'9') 
    {
        if (ch=='-') f=-1;
        ch=getchar();
    }
    while (ch>='0'&&ch<='9')
     {
     	a=a*10+ch-'0';
     	ch=getchar();
     }
     return a*f;
}

void build(int n){
    while(length<n+2)length<<=1;
    for(int i=length+1;i<=length+n;i++){
			val[i]=read();
			sum[i]=val[i];
		}
    for(int i=length;i>0;i--)sum[i]=sum[i<<1]+sum[i<<1^1];
    for(int i=length+length-2;i>length;i--)len[i]=1;
    for(int i=length-1;i>0;i--)len[i]=len[i<<1]+len[i<<1^1];
}

void add(ll l,ll r,ll v){
    for(l+=length-1,r+=length+1;l^r^1;l>>=1,r>>=1){
        if(~l&1){
            val[l+1]+=v;
            sum[l+1]+=v*len[l+1];
        }
        if(r&1){
            val[r-1]+=v;
            sum[r-1]+=v*len[r-1];
        }
        sum[l>>1]=sum[l]+sum[l^1]+val[l>>1]*len[l>>1];
        sum[r>>1]=sum[r]+sum[r^1]+val[r>>1]*len[r>>1];
    }
    while(l>1)sum[l>>1]=sum[l]+sum[l^1]+val[l>>1]*len[l>>1],l>>=1;
}

ll query(ll l,ll r){
    ll resl=0,resr=0;
    ll lenl=0,lenr=0;
    for(l+=length-1,r+=length+1;l^r^1;l>>=1,r>>=1){
        if(~l&1){
            resl+=sum[l+1];
            lenl+=len[l+1];
        }
        if(r&1){
            resr+=sum[r-1];
            lenr+=len[r-1];
        }
        resl+=lenl*val[l>>1];
        resr+=lenr*val[r>>1];
    }
    resl+=resr;
    lenl+=lenr;
    while(l>1)resl+=lenl*val[l>>1],l>>=1;
    return resl;
}

int main()
{
    int n,m;
    scanf("%d%d",&n,&m);
    build(n);
    for(int i=0;i<m;i++){
        int t=read(),x=read(),y=read();
        if(t==1){
            ll v;
            v=read();
            add(x,y,v);
        }else printf("%lld\n",query(x,y));
    }
    return 0;
}
```