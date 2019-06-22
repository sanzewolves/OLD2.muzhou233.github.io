---
layout: post
title: 备战 NOIP2017 - 论差分的好
date: 2017-11-8
categories: blog
tags: [OI]
---

本来不准备写备战 NOIP2017 系列了，无奈刷题刷爽了...  

## 题目引入

清北学堂 2017.10.1 国庆 D1T1 最大子串权值

### 题目描述

何大爷对字符串十分有研究，于是天天出字符串题虐杀 zhx。 何大爷今天为
字符串定义了新的权值计算方法。一个字符串由小写字母组成，字符串的权值
被定义为其中出现次数最多的字符的次数减去出现次数最少的字符的次数。（注
意，在讨论出现最少的字符的时候，该字符必须至少出现一次）现在何大爷给
你一个字符串，何大爷想知道这个字符串的所有子串中权值最大的权值是多
少？  

### 输入格式

第一行一个整数 n，代表字符串的长度  
接下来一行 n 个小写字母，代表该字符串  

### 输出格式

一行一个整数代表答案

### 样例输入

	10
	aabbaaabab

### 样例输出

	3

### 数据范围与规定

对于 30% 的数据， 1 ≤ n≤ 100  
对于 60% 的数据， 1 ≤ n ≤ 1000  
对于 100% 的数据， 1 ≤ n ≤ 10^6  

相对于现在还有两天考试的时间来说，这道题有点老，不过，无所谓啊，标程不够优美我有什么办法  

正解 O(n)（废话）  

## 看看大家的做法

### 太长不看请直接跳到下一部分

### 第一位

[来自这里](http://www.cnblogs.com/z360/p/7638881.html)

我们选定一段区间 l~r，我们假设出现次数最多的字母为 x 最少的为 y，我们用一个数组 sum 统计一个字母到当前位置出现的次数，那么最多字母与最小字母的差值即为 sum[x][r]-sum[x][l-1]-(sum[y][r]-sum[y][l-1])=sum[x][r]-sum[y][r]-sum[x][l-1]+sum[y][l-1]=sum[x][r]-sum[y][r]-(sum[x][l-1]-sum[y][l-1]) 我们可以发现前面的部分跟后面的部分是一样的，并且我们 sum 数组的 l-1 一定是在 r 之前，也就是说我们的 l-1 可以再 r 之前就被处理出来。那么现在我们需要知道的就只有 x 和 y 到底是谁了，我们枚举每一个点，然后在枚举另一个字母，处理出最大的 sum[x][r]-sum[y][r]，这个 r 就是我们要枚举的位置，x 为这个位置上的字母，y 为枚举的另一个字母，我们更新最大值，这样的话我们枚举出来的字母有两种情况，要么 x 比 y 多，要么 y 比 x 多，我们取一个最大值来更新答案，我们这里的 sum[x][l-1]-sum[y][l-1] 是前面处理出来的，每次在枚举到的位置去一最小值储存一下，我们还要统计是在什么时候更新的这个最小值，当这个位置跟我们枚举的另一个字母的位置相同我们还要减去 1，为重叠的那个字母  

```cpp
#include<cstdio>
#include<cstring>
#include<cstdlib>
#include<iostream>
#include<algorithm>
#define N 30
using namespace std;
char ch[1000001];
int n,now,ans,sum[N],pos[N][N],last[N],minn[N][N];
int read()
{
    int x=0,f=1; char ch=getchar();
    while(ch<'0'||ch>'9'){if(ch=='-')f=-1; ch=getchar();}
    while(ch>='0'&&ch<='9') x=x*10+ch-'0',ch=getchar();
    return x*f;
}
int main()
{
    n=read();
    cin>>ch+1;
    for(int i=1;i<=n;i++)
    {
        now=ch[i]-'a';
        last[now]=i;
        sum[now]++;
        for(int j=0;j<26;j++)
         if(now!=j&&sum[j])
          ans=max(ans,max(sum[now]-sum[j]-minn[now][j]-(last[j]==pos[now][j]),
                        sum[j]-sum[now]-minn[j][now]-(last[j]==pos[j][now])));
        for(int j=0;j<26;j++)
        {
            if(sum[now]-sum[j]<minn[now][j]) minn[now][j]=sum[now]-sum[j],pos[now][j]=i;
            if(sum[j]-sum[now]<minn[j][now]) minn[j][now]=sum[j]-sum[now],pos[j][now]=i;
        }
    }
    printf("%d",ans);
    return 0;
}
```

### 第二位

[来自这里](https://www.cnblogs.com/lovewhy/p/7643948.html)

不过，luogu 神机...  
1000ms 时限 TLE 仨点  
3000ms 时限 AC  
我不就改了改时限嘛，最高的点跑了不到 500ms，然后就 TLE 了？  

```cpp
/*
sum[r][a]-sum[r][b]-sum[l-1][a]-sum[l-1][b]
用minv[a][b]代替sum[l-1][a]-sum[l-1][b]

sum[a][b]表示1~a中字母b出现的次数
minv[a][b]表示a与b个数的差的最小值 
p[a][b]表示minv[a][b]出现的位置 
*/
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cstring>
#include<cmath>
using namespace std;

int n,ans,minv[26][26],p[26][26],sum[26],last[26];
char s[1000005];

int main()
{
    scanf("%d",&n);
    scanf("%s",s+1);
    for(int i=1;i<=n;i++)
    {
        int c=s[i]-'a';
        last[c]=i;
        sum[c]++;
        for(int j=0;j<26;j++)
        {
            if(c!=j&&sum[j])    //自己不能与自己比较，而且j必须出现过 
            {
                ans=max(ans,sum[c]-sum[j]-minv[c][j]-(last[j]==p[c][j]));    //last[j]==p[c][j]：如果j最后一次出现是在minv[c][j]最小的时候，那么要将这个j算上，因为如果不算这个j那么j就没出现过了 
                ans=max(ans,sum[j]-sum[c]-minv[j][c]-(last[j]==p[j][c]));    //同理 
            }
        }
        for(int j=0;j<26;j++)
        {
            if(sum[c]-sum[j]<minv[c][j]) minv[c][j]=sum[c]-sum[j],p[c][j]=i;    //更新差的最小值和出现位置 
            if(sum[j]-sum[c]<minv[j][c]) minv[j][c]=sum[j]-sum[c],p[j][c]=i;
        }
    }
    printf("%d",ans);
    return 0;
}
```

### 第三位

[来自这里](http://blog.csdn.net/qq_36312502/article/details/78356468)

考场上的我用的尺取法，移动条件是 ans 值是否被更新  
显然这样只考虑了局部最优，却并不是全局最优，很容易就可以找到反例  

正解是动态规划？  

> mins[i][j] 当前字符 i 与 j 出现次数的最小差值；  
> pos[i][j] 最小差值的位置;  
> sum[i] 当前字符 i 出现的次数;  
> pre[i] 当前字符 i 最后出现的位置;   

思想挺巧妙的，反正我是想不到<-_<-；

感谢 summer 学姐的精彩讲解 qwq；

总结：
1.考场上想不出正解就打暴力，不要对自己的正解过于自信，除非可以完美地证明其正确性；  
2.分段暴力；

```cpp
#include<iostream>
#include<cstdio>
#include<cstring>
#include<algorithm>
using namespace std;

const int MAXN=30;
int mins[MAXN][MAXN],pos[MAXN][MAXN],sum[MAXN],pre[MAXN];
int n,ans;
char s[1000002];
void solve()
{
    scanf("%d%s",&n,s+1);
    for(int i=1;i<=n;i++)
    {
        int c=s[i]-'a'+1;
        sum[c]++,pre[c]=i;
        for(int j=1;j<=26;j++)
        {
            int cnt1=0,cnt2=0;
            if(j==c || !sum[j]) continue;
            if(pre[j]==pos[c][j]) cnt1++;//题目中明确说，要求字符j至少出现一次，如果j最后出现的位置为pos，我们减去后，j出现的次数就变成了0，所以需要把j至少算上一次,即差值需要减1；
            if(pre[j]==pos[j][c]) cnt2++;
            ans=max(ans,max(sum[c]-sum[j]-cnt1-mins[c][j],sum[j]-sum[c]-cnt2-mins[j][c]));
        }
        for(int j=1;j<=26;j++)
        {
            if(sum[c]-sum[j]<mins[c][j]) //更新mins
                mins[c][j]=sum[c]-sum[j],pos[c][j]=i;
            if(sum[j]-sum[c]<mins[j][c])
                mins[j][c]=sum[j]-sum[c],pos[j][c]=i;
        }
    }
    cout<<ans;
    return;
}

int main()
{
    solve();
    return 0;
}
```

## 看看我的做法

标程？？？正解 DP？？？好像是吧  

先看看我的 AC 代码怎么样？

```cpp
#include<cstdio>
#include<cstring>

const int N=1000000+10;

char s[N];
bool havea[130];
int a[130],b[130];

inline int Max(int a,int b){return a>b?a:b;}

int main()
{
	int n,m=0;
	scanf("%d%s",&n,s);
	for(int i=0;i<n;i++){
		havea[s[i]]=1;
		m++;
	}
	int res=0;
	for(int i='a';i<='z';i++)if(havea[i]){
		memset(b,0,sizeof(b));
		memset(a,0,sizeof(a));
		for(int j=0;j<n;j++){

			if(b[s[j]])res=Max(res,a[0]+a[s[j]]-b[s[j]]);//一个统计操作

			if(s[j]==i)a[0]++;
			else b[s[j]]++;
			
			if(b[s[j]])res=Max(res,a[0]+a[s[j]]-b[s[j]]);//另一个相同的统计操作
			
			if(b[s[j]]>a[0]+a[s[j]]){
				a[s[j]]=-a[0];
				b[s[j]]=0;
			}
		}
		
		for(int j='a';j<='z';j++)//另一个不太相同的统计操作
			if(b[j])res=Max(res,a[0]+a[j]-b[j]);
	}
	printf("%d\n",res);
	return 0;
}
```

### 说白了就是两种不同的做法而已

说实话标程怎么写的本蒟蒻真不知道，但是与标程不同让我感觉十分不安...  

本蒟蒻只知道标程是从 n^2 暴力优化来的，我的做法是从只有两种字母推广来的  

**这跟差分有什么关系？？？**  

到现在还没有提到差分的事，现在仍然不准备提差分的事  

### 怎么推广？先看看特殊情况

首先考虑：如果只有两种字母

> aabbaaabab

看数据范围，估计正解 O(n)，所以我们从最左端开始扫描，假设`a`是结果中出现次数最多的字母。会出现如下几种情况：

	1.     aaa
	2. aabbaaa
	3.     aaaba
	4. aabbaaaba

第一种不符合题意，没关系，我们暂且不讨论那个限制条件  
第二种、第三种情况都是在第一种的基础上“多余”出来了一部分，于是我们可以认为，一段 a 和 b 的数量一样的字符串可有可无  

有没有无所谓吗？

还记得那个限制条件吗？

> 在讨论出现最少的字符的时候，该字符必须至少出现一次

所以说，那些所谓多余的部分就是用来满足这个限制条件的嘛！

哪些部分是我们不需要的呢？很容易就可以想到

	1.      aaa
	2. aabbbaaa
	3.      aaaba

第二种不可取，因为前面多出来的部分中 b 的数量比 a 多  

所以我们使用两个变量，一个是扫描到现在 a 的数量，一个是扫描到现在 b 的数量，当 b 的数量大于 a 的数量时清空两个变量，即将前面那一段序列舍去  

### 开始推广

我们改出来一个包含 a、b、c 三种字符的字符串：  

> aabcaaabab

假设结果中出现次数最多的是 a，出现次数最少的是 b，那么字符 c 的位置与数量不会影响到最终结果  
是吗？

> a  a  b  c  a  a  a  b  a  b  
> acacbcccacacacbcacb  

是的，因为出现次数最多的最少的字符都已经被指定了  

继续推广，所有的字母都出现也没关系  

欸？这怎么用？

	O((26*n)^2)？？？！！！

让我们仔细想想，怎么可能得出那种慢速算法~  

推广之前的效率是多少来着？

	O(26*n)

推广之后效率一定下降吗？
从左往右扫描的时候，对于当前的字母，有两种情况：

1. 被指定是出现次数最多的字母
2. 其他字母

那我们就指定那个所谓的`其他字母`是出现次数最小的字母  
出现次数最多的字母已经被指定，用一个数组存储不同的`其它字母`与这个字母的扫描状态，因为前面已经证明不同的`其他字母`之间不会相互影响，所以我们在每次向前移动后仍然在处理出现次数最多的字母与出现次数最少的字母的关系  

**推广完成**  

### 差分的用处

问题来了，推广前我们会经常清空记录出现次数最多的字母出现次数的变量，但推广后我们不能随便清空这个变量，否则，WA 是显而易见的  
所以差分就派上用场了，我们用一个变量 a 记录出现次数最多的字母的出现次数，不清空，对于每个其他字母，分别使用一个变量记录 在舍去前面的序列时，a 需要被减去多少  

再来看看我的代码核心部分  

```cpp
for(int i='a';i<='z';i++){
	
	memset(b,0,sizeof(b));
	memset(a,0,sizeof(a));
	
	for(int j=0;j<n;j++){

		if(s[j]==i)a[0]++;
		else b[s[j]]++;		

		if(b[s[j]]>a[0]+a[s[j]]){
			a[s[j]]=-a[0];
			b[s[j]]=0;
		}
	}
}
```

这样就很明白了，连解释都用不着了  
这样写比较慢，因为有些字母根本没出现，所以加一个优化  

```cpp
for(int i=0;i<n;i++){
	havea[s[i]]=1;
	m++;
}

for(int i='a';i<='z';i++)if(havea[i]){
	memset(b,0,sizeof(b));
	memset(a,0,sizeof(a));

	for(int j=0;j<n;j++){

		if(s[j]==i)a[0]++;
		else b[s[j]]++;

		if(b[s[j]]>a[0]+a[s[j]]){
			a[s[j]]=-a[0];
			b[s[j]]=0;
		}
	}
}
```

统计一下，输出一下  

```cpp
int main()
{
	int n,m=0;
	scanf("%d%s",&n,s);
	for(int i=0;i<n;i++){
		havea[s[i]]=1;
		m++;
	}
	int res=0;
	for(int i='a';i<='z';i++)if(havea[i]){
		memset(b,0,sizeof(b));
		memset(a,0,sizeof(a));
		for(int j=0;j<n;j++){

			if(b[s[j]])res=Max(res,a[0]+a[s[j]]-b[s[j]]);//一个统计操作

			if(s[j]==i)a[0]++;
			else b[s[j]]++;
			
			if(b[s[j]])res=Max(res,a[0]+a[s[j]]-b[s[j]]);//另一个相同的统计操作
			
			if(b[s[j]]>a[0]+a[s[j]]){
				a[s[j]]=-a[0];
				b[s[j]]=0;
			}
		}
		
		for(int j='a';j<='z';j++)//另一个不太相同的统计操作
			if(b[j])res=Max(res,a[0]+a[j]-b[j]);
	}
	printf("%d\n",res);
	return 0;
}
```

H<sub>3</sub>CCH<sub>3</sub>

## 写在最后

差分是个好东西，zkw 用差分，vhd 用差分，这道题也能用差分（逃~  