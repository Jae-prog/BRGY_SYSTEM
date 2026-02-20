<?php
include "config.php";
$data = json_decode(file_get_contents("php://input"), true);
$title = $conn->real_escape_string($data['title']);
$content = $conn->real_escape_string($data['content']);

$sql = "INSERT INTO announcements (title, content) VALUES ('$title','$content')";
if ($conn->query($sql)) echo json_encode(['success'=>true]);
?>
