<?php 
error_reporting(0); 
require "flag.php"; 

if(!$_GET['x']){ 
    highlight_file(__FILE__); 
    exit(); 
} 

if(is_array($_GET['x'])){ 
    die("请不要使用数组，请再试试。"); 
} 

if(!preg_match("/\d+/",$_GET['x'])){ 
    die("我只想要数字，请再试试。"); 
} 

$x=str_replace("flag","_",$_GET['x']); 
if(preg_match("/flag/i",$x)){ 
    echo $flag; 
} 

else{ 
    die("NO FLAG...."); 
} 
?>