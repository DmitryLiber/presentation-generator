<?
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header('Content-Type: application/json; charset=utf-8');

  $LOGIN = '123';
  $PASS = '456';
  $ACCESS_TOKEN = 'VwBE-6tDc-sEY1-F0V2-zTnf-kKin';

  $responses = [
    "status" => 401,
    "msg" => "Access denied"
  ];

  $sendResponses = function($responses)  {
    echo json_encode($responses);
  };

  // authorization
  if(!empty($_GET['login'])){
    $error = 0;
    if(stripslashes(htmlspecialchars($_GET['login'])) !== $LOGIN) $error++;
    if(stripslashes(htmlspecialchars($_GET['password'])) !== $PASS) $error++;

    if($error === 0){
      $responses["status"] = 201;
      $responses["msg"] = $ACCESS_TOKEN;
      return $sendResponses($responses);
    }else{
      $responses["msg"] = 'Не верный логин или пароль';
      return $sendResponses($responses);
    }
  }
  
  // is auth
  if($_GET['access_token'] !== $ACCESS_TOKEN) {
    return $sendResponses($responses);
  }

  function sortImages($images){
    $fp = fopen('images.txt', 'w+');	
    fwrite($fp, $images);
    fclose($fp);
  }

  $responses["status"] = 201;
  $responses["msg"] = '';

  if(!empty($_GET['images']) && $_GET['images'] === 'all') {
    $responses["msg"] = file_get_contents('images.txt', true);
  }

  if(!empty($_GET['sortImages'])) {
    sortImages($_GET['sortImages']);
  }

  if(!empty($_GET['imageDelete'])) {

    if(file_exists($_SERVER['DOCUMENT_ROOT']."/images/".$_GET['imageDelete'])){
      unlink($_SERVER['DOCUMENT_ROOT']."/images/".$_GET['imageDelete']);
    }

    $oldImages = json_decode(file_get_contents('images.txt', true));
    $indexImage = array_search($_GET['imageDelete'], $oldImages);
    unset($oldImages[$indexImage]);

    sortImages(json_encode(array_values($oldImages)));

    $responses["msg"] = 'Файл удален';
  }

  if(!empty($_FILES['images'])) {

    function loadImg($t, $size){
      // file
      $uploadedFile = $t['tmp_name'];
      
      // format
      $format = mb_strtolower(substr(strrchr($t['name'], '.'), 1));
    
      // check format
      $formats = ["jpg", "jpeg", 'webp'];
      
      if(in_array($format ,$formats)){
        
        // Img size
        list($width,$height) = getimagesize($uploadedFile);
    
        // Resize
        $newWidth = $size;
        $newHeight =($height*$newWidth)/$width;
        
        $name = RAND(000000000,999999999);
        $filename = $_SERVER['DOCUMENT_ROOT']."/images/".$name.".".$format;
        
        // Options tmp
        if($format !== 'webp'){
          $src = imagecreatefromjpeg($uploadedFile);	
        }else{
          $src = imagecreatefromwebp($uploadedFile);	
        }
        
        $tmp = imageCreateTrueColor($newWidth,$newHeight);
        imageCopyResampled($tmp,$src,0,0,0,0,$newWidth,$newHeight,$width,$height);
        imageJpeg($tmp,$filename,90);
        imagedestroy($tmp);
        imagedestroy($src);
        
        return $name.".".$format;
      }else{
        return "error";
      }
    }

    $imagesNames = [];

    foreach($_FILES['images']["name"] as $key => $value){
      $imagesNames[] = loadImg(array(
        'tmp_name' => $_FILES['images']["tmp_name"][$key],
        'name' => $_FILES['images']["name"][$key]
      ), 1920);
    }

    $oldImages = json_decode(file_get_contents('images.txt', true));
    sortImages(json_encode(array_merge($imagesNames, $oldImages)));
    
    $responses["msg"] = json_encode($imagesNames);
  }

  return $sendResponses($responses);
  ?>