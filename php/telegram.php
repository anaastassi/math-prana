<?php
$name = "a";
$phone = "a";
$fromForm = "a";

if(isset($_POST['name'])){
    $name = $_POST['name'];
}
if(isset($_POST['phone'])){
    $phone = $_POST['phone'];
}
if(isset($_POST['from'])){
    $fromForm = $_POST['from'];
}


$message = "имя:".$name."\r\nтел:".$phone."\r\n".$fromForm;

$token = "6567282932:AAGSW3J0_4k46nrbmd7bxBJH1cW13tyNhgg";

$ids = array(401515573, 492943537, 5973158539, 5642147696);

foreach ($ids as $id) {
    sendTo($id);
}

function sendTo($chatId)
{

    $getQuery = array(
        "chat_id" 	=> $chatId,
        "text"  	=> $GLOBALS[message],
        "parse_mode" => "html",
    );
    $ch = curl_init("https://api.telegram.org/bot". $GLOBALS[token] ."/sendMessage?" . http_build_query($getQuery));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, false);

    $resultQuery = curl_exec($ch);
    curl_close($ch);
}

$getQuery = array(
    "chat_id" 	=> 401515573,
    "text"  	=> $message,
    "parse_mode" => "html",
);
$ch = curl_init("https://api.telegram.org/bot". $token ."/sendMessage?" . http_build_query($getQuery));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);

$resultQuery = curl_exec($ch);
curl_close($ch);

echo $resultQuery;
