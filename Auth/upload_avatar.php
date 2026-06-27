<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once 'db.php';

$userId = isset($_POST['userId']) ? intval($_POST['userId']) : 0;
if ($userId <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid User ID."]);
    exit;
}

if (!isset($_FILES['avatar'])) {
    echo json_encode(["status" => "error", "message" => "No file uploaded."]);
    exit;
}

$file = $_FILES['avatar'];
$targetDir = "../uploads/";

if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
if (!in_array(strtolower($ext), $allowed)) {
    echo json_encode(["status" => "error", "message" => "Only JPG, PNG, GIF, and WEBP files are allowed."]);
    exit;
}

// Fetch old avatar to delete it later
$stmt = $conn->prepare("SELECT profile_picture FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($oldAvatarUrl);
$stmt->fetch();
$stmt->close();

$fileName = "avatar_" . $userId . "_" . time() . "." . $ext;
$targetFile = $targetDir . $fileName;

if (move_uploaded_file($file['tmp_name'], $targetFile)) {
    $url = "http://localhost/pidify/pidify/uploads/" . $fileName;

    // Update DB
    $stmt = $conn->prepare("UPDATE users SET profile_picture = ? WHERE id = ?");
    $stmt->bind_param("si", $url, $userId);
    
    if ($stmt->execute()) {
        // Delete old avatar if it was a local file
        if (!empty($oldAvatarUrl) && strpos($oldAvatarUrl, "http://localhost/pidify/pidify/uploads/avatar_") !== false) {
            $oldFileName = basename($oldAvatarUrl);
            $oldFilePath = $targetDir . $oldFileName;
            if (file_exists($oldFilePath)) {
                unlink($oldFilePath);
            }
        }

        echo json_encode([
            "status" => "success",
            "message" => "Avatar uploaded successfully!",
            "profile_picture" => $url
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update database: " . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Failed to move uploaded file."]);
}

$conn->close();
?>
