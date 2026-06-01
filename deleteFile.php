<?php
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "data_record");

if (isset($_GET['id'], $_GET['fileName'])) {
    $id = intval($_GET['id']);
    $fileName = basename($_GET['fileName']);

    $filePath = "uploads/" . $fileName;

    if (file_exists($filePath)) unlink($filePath);

    $stmt = $conn->prepare("DELETE FROM files WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(["status" => "success"]);
}
?>