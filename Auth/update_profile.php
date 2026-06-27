<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database Connection
include_once 'db.php';

// Get POST data (supporting JSON and form-data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST;
}

$id = isset($data['id']) ? intval($data['id']) : 0;
$fullname = isset($data['fullname']) ? trim($data['fullname']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$currentPassword = isset($data['currentPassword']) ? $data['currentPassword'] : '';
$newPassword = isset($data['newPassword']) ? $data['newPassword'] : '';

// Validation
if ($id <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid User ID. Access Denied."]);
    exit;
}

if (empty($fullname) || empty($email)) {
    echo json_encode(["status" => "error", "message" => "Full Name and Email are required."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email format."]);
    exit;
}

// Check if email already exists for another user
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
$stmt->bind_param("si", $email, $id);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email is already in use by another user."]);
    $stmt->close();
    exit;
}
$stmt->close();

// Fetch current user details
$stmt = $conn->prepare("SELECT password, faculty, role, profile_picture FROM users WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($hashedPassword, $faculty, $role, $profile_picture);
$stmt->fetch();
$stmt->close();

// If changing password
$updatePasswordSql = "";
$passwordToBind = "";
$changingPassword = false;

if (!empty($newPassword)) {
    if (empty($currentPassword)) {
        echo json_encode(["status" => "error", "message" => "Current password is required to change password."]);
        exit;
    }

    if (!password_verify($currentPassword, $hashedPassword)) {
        echo json_encode(["status" => "error", "message" => "Incorrect current password."]);
        exit;
    }

    $newHashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
    $changingPassword = true;
}

// Perform update
if ($changingPassword) {
    $stmt = $conn->prepare("UPDATE users SET fullname = ?, email = ?, password = ? WHERE id = ?");
    $stmt->bind_param("sssi", $fullname, $email, $newHashedPassword, $id);
} else {
    $stmt = $conn->prepare("UPDATE users SET fullname = ?, email = ? WHERE id = ?");
    $stmt->bind_param("ssi", $fullname, $email, $id);
}

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Profile updated successfully!",
        "user" => [
            "id" => $id,
            "fullname" => $fullname,
            "email" => $email,
            "faculty" => $faculty,
            "role" => $role,
            "profile_picture" => $profile_picture
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Update failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
