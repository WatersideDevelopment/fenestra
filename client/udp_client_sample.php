<?php
$server   = '127.0.0.1';
$port = 1337;
$message     = '{"event":"login","payload":{"e_id":123345,"user_key":"d5d21dec1fe0349b1d7f6a49a7fce3ca","session_key":"0ffq64j1dn71a2tkp606rs37e6"}}';

if(!($sock = socket_create(AF_INET, SOCK_DGRAM, 0)))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);
     
    die("Couldn't create socket: [$errorcode] $errormsg \n");
}

echo "Socket created \n";

if( !socket_sendto($sock, $message, strlen($message) , 0x0 , $server , $port))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);
         
    die("Could not send data: [$errorcode] $errormsg \n");
} 

socket_close($sock);
echo "Done!";
