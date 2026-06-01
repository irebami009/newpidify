<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$conn = new mysqli("localhost", "root", "", "data_record");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed: " . $conn->connect_error]);
    exit;
}

$targetDir = "uploads/";

// Create folder if not exist
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (isset($_FILES['file'])) {

    // 🔥 Get level and course type from frontend
    $level = isset($_POST['level']) ? $_POST['level'] : "unknown";
    $courseType = isset($_POST['type']) ? $_POST['type'] : "unknown";

    $fileName = time() . "_" . basename($_FILES["file"]["name"]);
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {

        $url = "http://localhost/pidify/pidify/uploads/" . $fileName;

        // 🔥 Save to DB with level and course type
        $stmt = $conn->prepare("INSERT INTO files (name, type, url, level, course_type) VALUES (?, ?, ?, ?, ?)");
        if (!$stmt) {
            echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
            exit;
        }
        $stmt->bind_param("sssss", $fileName, $_FILES['file']['type'], $url, $level, $courseType);
        if (!$stmt->execute()) {
            echo json_encode(["status" => "error", "message" => "Execute failed: " . $stmt->error]);
            exit;
        }

        echo json_encode([
            "status" => "success",
            "url" => $url,
            "level" => $level,
            "course_type" => $courseType
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Move uploaded file failed"]);
    }
} else {
    echo json_encode(["status" => "no_file_received"]);
}
?>