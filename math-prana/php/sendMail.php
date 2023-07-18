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

    $to = 'leoshowdp@gmail.com';
    $subject = "Заявка c сайта";
    $headers = 'From: Leo web';

    mail($to, $subject, $message, $headers);


    echo "fire ".$name." ".$phone." ".$fromForm;
?>