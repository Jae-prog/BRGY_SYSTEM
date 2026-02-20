<?php
include "config.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "INSERT INTO reports (address,message) VALUES (?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss",$data['address'],$data['message']);

if($stmt->execute()){
    echo json_encode(["status"=>"success"]);
}else{
    echo json_encode(["status"=>"error"]);
}
?>
