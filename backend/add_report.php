<?php
include "config.php";
$addr = $_POST['addr'];
$msg = $_POST['msg'];
$imgPath = "";

if(isset($_FILES['img']) && $_FILES['img']['error']==0){
    $targetDir = "../uploads/";
    if(!file_exists($targetDir)) mkdir($targetDir,0777,true);
    $imgPath = "uploads/".time()."_".$_FILES['img']['name'];
    move_uploaded_file($_FILES['img']['tmp_name'], "../".$imgPath);
}

$sql = "INSERT INTO reports (addr,msg,img) VALUES ('$addr','$msg','$imgPath')";
$conn->query($sql);
echo json_encode(['success'=>true]);
?>

