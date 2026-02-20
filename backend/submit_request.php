<?php
include "config.php";

$data = json_decode(file_get_contents("php://input"), true);
$control = "BRGY-".rand(100000,999999);

$sql = "INSERT INTO service_requests (lname,fname,mname,service_type,purpose,address,control_no) VALUES (?,?,?,?,?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssssss",
    $data['lname'],
    $data['fname'],
    $data['mname'],
    $data['service_type'],
    $data['purpose'],
    $data['address'],
    $control
);

if($stmt->execute()){
    echo json_encode(["status"=>"success","control"=>$control]);
}else{
    echo json_encode(["status"=>"error"]);
}
?>
