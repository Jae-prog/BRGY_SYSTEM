<?php
include "config.php";
$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id']);
$conn->query("DELETE FROM residents WHERE id=$id");
echo json_encode(['success'=>true]);
?>
