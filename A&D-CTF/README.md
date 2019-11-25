# The 4th A&D-CTF · WriteUp

**Author**: MuZhou233  
**Email**: muzhou233@outlook.com  

---  

## Web

### 新手代码

[打开页面](Web-1)以后显示源代码，审阅代码可知 GET 参数 x 要求包含数字并且会替换全小写的`flag`而判断时不区分大小写，可知使用 ?x=0Flag 即可

### baopo

[打开页面](Web-2)以后显示账号密码的输入框，尝试输入后得知需要找到 admin 的密码，查看源代码得知密码是 587 开头的六位数字，从题目标题可以看出可以使用暴力枚举查找密码，于是编写[脚本](Web-2/baopo.js)得到密码为 587379，登陆后跳转到 [/qknxfvedoinadsfe.php 页面](Web-2/qknxfvedoinadsfe.html)，查看源代码发现js代码，复制下来执行报错并得到 flag。（不执行也看得出来，执行验证有没有坑）
```
undefined:1
flag{going_on_it}
    ^

SyntaxError: Unexpected token {
```

### 最强心算

[打开页面](Web-3)以后显示在3秒内提交计算结果，每次给出的算式都不同，显然需要使用脚本，编写[脚本](Web-3/solve.js)运行了几次都没有得到 flag，后来通过使用 WireShark 抓包得知缺少了 header，添加 header 之后运行成功得到 flag。

### EasySql

[打开页面](Web-4)以后显示源代码和 SQL 语句，可知是一个 GET 参数 SQL 注入，搜索了SQL密码绕过尝试一下都没有成功，一直不理解括号套单引号的含义，最后尝试使用通配符的时候得到了 flag
```
<hr>query : <strong>select username from huha_sql where passwd=(''*'') and username='Admin'</strong><hr><br>flag{Sql_injection_Is_s0_Fun}
```

### 怎么就泄露了源码？

[打开页面](Web-5)以后提示 GIT，于是搜索 GIT 仓库泄露相关知识得知访问 /.git 可以验证是否存在 GIT 仓库泄露，访问后直接显示了 .git 目录下的文件，于是通过使用 [GitHack](https://github.com/lijiejie/GitHack) 获得网站源代码，审阅代码和直接访问得知是一个摇奖得代币兑换 flag 的网站，api.php 中直接给出了 hack 点，搜索 php 弱类型漏洞之后得知构造一个全真的布尔数组即可使表达式返回值恒为 true，由于网站使用 SESSION 区分用户，编写脚本的方法比较麻烦，所以使用 BurpSuite 抓包并修改请求实现了摇奖全中，之后在浏览器上直接点击兑换 flag。

### function

[打开页面](Web-6)以后显示源代码，推测是通过 GET 执行一个函数并可以传入一个自定义参数，但是代码对常规函数名进行了过滤，多次尝试无果后搜索得到了类似题目的 WriteUp，得知使用`\`字符可以绕过正则，之后使用 create_function 实现执行自定义函数，发现本题中 flag 文件的位置稍有不同，通过简单的路径打印之后找到 flag。
```
?action=\create_function&arg=2;}var_dump(file('../flag'));/*
```

### Calculator

打开页面发现有点花哨，查看源代码发现表单提交地址 /calc.php 直接访问看到[源代码](Web-7)，分析代码可知虽然做了很多限制措施，但是利用 php 弱类型漏洞直接通过 GET 修改变量值即可得到 flag
```
?calc=$max=0
```

### EasyPhp

[打开页面](Web-8)以后显示源代码，猜测 hack 点是 unserialize 函数，搜索相关知识后得知是通过输入一个序列化的包含构造一个 huha 类的数组实现引用 flag.php 文件，但由于没有php环境又对序列组成不了解所以没有实施。

### login_as_admin

打开页面后要求输入用户名，随便输入一个之后发现刷新并不会丢失登录，查看 cookie 信息发现有两个存有长字符串的量，删除 cookie 后回到主页查看源代码发现提示 ?debug=1 输入后获得[源代码](Web-13/index.php)，审阅得知是基于客户端 cookie 的登录验证，只要自行构建一对用户为 admin 的 cookie 信息写入浏览器即可实现以 admin 用户登录，但由于没有php环境又找不到其他合适的工具所以没有实施。

### What's your name?

根据 hint 得知是与 Python Flask 相关的漏洞，搜索后尝试使用 {{7*7}} 发现返回了 49 确认漏洞存在，但由于时间关系没有来得及找到 flag。

## Misc

### Misc1

[下载文件](Misc-1)，使用 Stegsolve 查看发现隐藏有压缩文件，修改扩展名为 .rar 打开获得 flag

### Misc2

[下载文件](Misc-2)，使用 Stegsolve 查看发现隐藏有压缩文件，修改扩展名为 .rar 打开看到  

- misc2.rar  
    - hint.txt(有密码)  
    - flag.zip(无密码)  
        - flag.txt(有密码)  

hint文件有密码很奇怪，查看压缩包的 16 进制码发现 hint.txt 是假加密，修改后打开 hint.txt 内容为*4位纯密码*，直接使用暴力破解工具得知 flag.zip 密码得到 flag。

### Misc3

[下载文件](Misc-3)，使用 Stegsolve 查看发现隐藏有压缩文件，修改扩展名为 .7z 打开看到 KO.txt，里面一堆 Ook，搜索后得知是一种加密，转码得 flag

### Misc4

[下载文件](Misc-4)，rar 文件无法打开，查看 16 进制码并搜索发现是文件头有一位被修改，修改正确后打开压缩包出现 500.png，根据名称和图片内容推测图片高度被修改了，使用编辑器将 420 修改为 500 得到 flag