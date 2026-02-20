<?php
include "config.php";
$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id']);
$conn->query("UPDATE reports SET status='resolved' WHERE id=$id");
echo json_encode(['success'=>true]);
?>
