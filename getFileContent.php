<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$fileName = isset($_GET["file"]) ? basename($_GET["file"]) : "";
$filePath = __DIR__ . "/uploads/" . $fileName;

if ($fileName === "" || !file_exists($filePath) || !is_file($filePath)) {
    http_response_code(404);
    echo "File not found";
    exit;
}

$contentType = mime_content_type($filePath);
if ($contentType) {
    header("Content-Type: " . $contentType);
}

header("Content-Length: " . filesize($filePath));
readfile($filePath);
?>
