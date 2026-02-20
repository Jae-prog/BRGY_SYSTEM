<?php
include "config.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$password = md5($data['password']);

$sql = "SELECT * FROM admins WHERE username=? AND password=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows > 0){
    $_SESSION['admin'] = $username;
    echo json_encode(["success"=>true]);
}else{
    echo json_encode(["success"=>false]);
}
?>
