<?php 
include "config.php"; 
class huha{ 
    public $file; 
    public $method; 
    public $args; 


    function __construct($method, $args) { 
        $this->method = $method; 
        $this->args = $args; 
    //flag is in flag.php 
        $this->file = 'fool.php'; 
    } 

    function source(){ 
            highlight_file(__FILE__); 
    } 

    function login(){ 
        define('IN_FLAG', TRUE); 
        if(!empty($this->file)) { 

            include $this->file; 
        } 
    } 

    function __destruct(){ 
        if (in_array($this->method, array("login", "source"))) { 
            @call_user_func_array(array($this, $this->method), $this->args); 
        }  
    } 
} 

if(isset($_GET["data"])) { 
    if (substr($_GET['data'], 0, 2) !== 'O:') { 
            @unserialize($_GET["data"]); 
        } 
} 

else { 
    new huha("source", array()); 
} 

?> 