<?php
// db.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pidify";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Self-healing database migration: Check if profile_picture column exists
$check = $conn->query("SHOW COLUMNS FROM users LIKE 'profile_picture'");
if ($check && $check->num_rows == 0) {
    $conn->query("ALTER TABLE users ADD COLUMN profile_picture VARCHAR(255) DEFAULT NULL");
}
?>
