<?php
include "config.php";
$data = json_decode(file_get_contents("php://input"), true);
$name = $conn->real_escape_string($data['name']);
$type = $data['type'];
$purpose = $conn->real_escape_string($data['purpose']);
$addr = $conn->real_escape_string($data['addr']);
$control = $data['control'];

$sql = "INSERT INTO service_requests (name,type,purpose,addr,control_no) 
        VALUES ('$name','$type','$purpose','$addr','$control')";
$conn->query($sql);
echo json_encode(['success'=>true]);
?>
