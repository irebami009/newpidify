<?php
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "data_record");

// 🔥 Get level and course type from URL
$level = isset($_GET['level']) ? $_GET['level'] : "";
$courseType = isset($_GET['type']) ? $_GET['type'] : "";

// 🔥 If both level and course type are provided, filter by both
if ($level !== "" && $courseType !== "") {
    $stmt = $conn->prepare("SELECT * FROM files WHERE level = ? AND course_type = ? ORDER BY id DESC");
    $stmt->bind_param("ss", $level, $courseType);
    $stmt->execute();
    $result = $stmt->get_result();
} elseif ($level !== "") {
    // fallback: filter by level only
    $stmt = $conn->prepare("SELECT * FROM files WHERE level = ? ORDER BY id DESC");
    $stmt->bind_param("s", $level);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    // fallback (optional)
    $result = $conn->query("SELECT * FROM files ORDER BY id DESC");
}

$files = [];
while ($row = $result->fetch_assoc()) {
    $files[] = $row;
}

echo json_encode($files);
?>