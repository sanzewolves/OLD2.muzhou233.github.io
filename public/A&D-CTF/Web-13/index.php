<?php 
define("FLAG", "**************************************"); 
define("PRIVATE_KEY", "********************************"); 
define("METHOD", "aes-128-cbc"); 
error_reporting(0); 

function get_random_iv(){ 
    $random_iv = ""; 
    for($i=0; $i<16; $i++){ 
        $random_iv .= chr(rand(1, 255)); 
    } 
    return $random_iv; 
} 

function serialize_id($id){ 
    $info = array("id"=>$id); 
    $plain = serialize($info); 
    return $plain; 
} 

function unserialize_id($plain){ 
    $info = unserialize($plain) or die("<p>base64_decode('" . base64_encode($plain) . "') can't unserialize</p>"); 
    $id = $info["id"]; 
    return $id; 
} 

function aes_encrypt($plain, $iv){ 
    $cipher = openssl_encrypt($plain, METHOD, PRIVATE_KEY, OPENSSL_RAW_DATA, $iv); 
    return $cipher; 
} 

function aes_decrypt($cipher, $iv){ 
    if($plain = openssl_decrypt($cipher, METHOD, PRIVATE_KEY, OPENSSL_RAW_DATA, $iv)){ 
        return $plain; 
    }else{ 
        return FALSE; 
    } 
} 

function login(){ 
    $id = (string)$_POST["id"]; 
    if("admin"==$id){ 
        die("<h1><center>You are not admin</center></h1>"); 
    } 
    $iv = get_random_iv(); 
    $plain = serialize_id($id); 
    $cipher = aes_encrypt($plain, $iv); 
    setcookie("iv", base64_encode($iv)); 
    setcookie("cipher", base64_encode($cipher)); 
    echo "<h1><center>Hello " . $id . "</center></h1>"; 
} 

function show_homepage(){ 
    $iv = base64_decode($_COOKIE["iv"]); 
    $cipher = base64_decode($_COOKIE["cipher"]); 
    if($plain = aes_decrypt($cipher, $iv)){ 
        $id = unserialize_id($plain); 
        if("admin"==$id){ 
            echo FLAG; 
        }else{ 
            echo "<h1><center>Hello " . $id . "</center></h1>"; 
        } 
    }else{ 
        die("Error"); 
    } 
} 

function show_login(){ 
    echo ' 
    <br><br><br><br><br> 
    <center> 
    <form action="" method="post"> 
        <p>Input id to login</p> 
        <input name="id" type="text" /> 
        <input name="submit" type="submit" value="Login" /> 
    <!-- ?debug=1 --> 
    </form> 
    </center> 
    '; 
} 

function main(){ 
    if(isset($_GET["debug"]) && 1 == $_GET["debug"]){ 
        highlight_file("cbc.php"); 
    }else{ 
        if(isset($_POST["id"])){ 
            login(); 
        }else{ 
            if(isset($_COOKIE["iv"])&&isset($_COOKIE["cipher"])){ 
                show_homepage(); 
            }else{ 
                show_login(); 
            } 
        } 
    } 
} 

main(); 
?> 