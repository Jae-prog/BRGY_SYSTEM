<?php
include "config.php";
$data = json_decode(file_get_contents("php://input"), true);
$lname = $conn->real_escape_string($data['lname']);
$fname = $conn->real_escape_string($data['fname']);
$mname = $conn->real_escape_string($data['mname']);
$bd = $data['bd'];
$gender = $data['gender'];
$status = $data['status'];
$addr = $conn->real_escape_string($data['addr']);
$contact = $data['contact'];

$sql = "INSERT INTO residents (lname,fname,mname,bd,gender,status,addr,contact)
        VALUES ('$lname','$fname','$mname','$bd','$gender','$status','$addr','$contact')";
if ($conn->query($sql)) echo json_encode(['success'=>true]);
?>
