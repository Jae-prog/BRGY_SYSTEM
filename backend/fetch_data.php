<?php
include "config.php";

$data = [];

// Residents
$residents = [];
$res = $conn->query("SELECT * FROM residents ORDER BY id DESC");
while($r=$res->fetch_assoc()) $residents[]=$r;

// Announcements
$announcements = [];
$res = $conn->query("SELECT * FROM announcements ORDER BY created_at DESC");
while($r=$res->fetch_assoc()) $announcements[]=$r;

// Service Requests
$serviceRequests = [];
$res = $conn->query("SELECT * FROM service_requests WHERE status='pending' ORDER BY id DESC");
while($r=$res->fetch_assoc()) $serviceRequests[]=$r;

$approvedRequests = [];
$res = $conn->query("SELECT * FROM service_requests WHERE status='Approved' ORDER BY id DESC");
while($r=$res->fetch_assoc()) $approvedRequests[]=$r;

// Reports
$reports = [];
$res = $conn->query("SELECT * FROM reports ORDER BY id DESC");
while($r=$res->fetch_assoc()) $reports[]=$r;

echo json_encode([
    "residents"=>$residents,
    "announcements"=>$announcements,
    "serviceRequests"=>$serviceRequests,
    "approvedRequests"=>$approvedRequests,
    "reports"=>$reports
]);
?>
