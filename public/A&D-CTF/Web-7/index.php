<?php  
error_reporting(0);  
//听说Dr.Liu高数挂科了，需要解题拿flag才能及格，你能不能帮一下他？ 
if(!isset($_GET['calc'])){  
    show_source(__FILE__);  
}else{  
    //例子 c=20-1  
    $content = $_GET['calc'];  
    if (strlen($content) >= 80) {  
        die("太长了不会算");  
    }  
    $black = [' ', '\t', '\r', '\n','\'', '"', '`', '\[', '\]'];  
    foreach ($black as $blackitem) {  
        if (preg_match('/' . $blackitem . '/m', $content)) {  
            die("这个字符好奇怪呀！");  
        }  
    }  
    //常用数学函数http://www.w3school.com.cn/php/php_ref_math.asp  
    $white = ['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan2', 'atan', 'atanh', 'base_convert', 'bindec', 'ceil', 'cos', 'cosh', 'decbin', 'dechex', 'decoct', 'deg2rad', 'exp', 'expm1', 'floor', 'fmod', 'getrandmax', 'hexdec', 'hypot', 'is_finite', 'is_infinite', 'is_nan', 'lcg_value', 'log10', 'log1p', 'log', 'max', 'min', 'mt_getrandmax', 'mt_rand', 'mt_srand', 'octdec', 'pi', 'pow', 'rad2deg', 'rand', 'round', 'sin', 'sinh', 'sqrt', 'srand', 'tan', 'tanh'];
    preg_match_all('/[a-zA-Z_\x7f-\xff][a-zA-Z_0-9\x7f-\xff]*/', $content, $used_funcs);  
    foreach ($used_funcs[0] as $func) {  
        if (!in_array($func, $white)) {  
            die("这个函数好奇怪呀！");  
        }  
    }  

    function get_flag(){ 
        require('flag.php'); 
        return $flag; 
    } 

    //帮你算出答案  
    eval('echo '.$content.';'); 

    if($max == "Math"){ 
        $content=get_flag(); 
        echo $content; 
        $max = null; 
    } 

} 
?>