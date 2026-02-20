<?php
session_start();

$host = "localhost";
$db   = "brgy_system";
$user = "root";
$pass = ""; // default XAMPP password is empty

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
