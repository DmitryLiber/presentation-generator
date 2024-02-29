<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  
  if($_GET["image"]){
    $imagePath = $_SERVER['DOCUMENT_ROOT']."/images/".$_GET["image"];
    $image = file_get_contents($imagePath);
    header('content-type: image/gif');
    echo $image;
  }
?>