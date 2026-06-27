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

$conn = new mysqli("localhost", "root", "", "data_record");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Get POST data (supporting JSON and form-data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST;
}

$email = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? $data['password'] : '';
$userType = isset($data['userType']) ? trim($data['userType']) : 'student';
$adminKey = isset($data['adminKey']) ? trim($data['adminKey']) : '';

// Validation
if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Email and Password are required."]);
    exit;
}

// Admin Secret validation
$ADMIN_SECRET = "Samytech99";
if ($userType === "admin" && $adminKey !== $ADMIN_SECRET) {
    echo json_encode(["status" => "error", "message" => "Invalid Admin Key. Access Denied."]);
    exit;
}

// Check user in database
$stmt = $conn->prepare("SELECT id, fullname, password, faculty, role FROM users WHERE email = ?");
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "SQL preparation failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Invalid email or password."]);
    $stmt->close();
    exit;
}

$stmt->bind_result($id, $fullname, $hashedPassword, $faculty, $role);
$stmt->fetch();

// Verify password
if (!password_verify($password, $hashedPassword)) {
    echo json_encode(["status" => "error", "message" => "Invalid email or password."]);
    $stmt->close();
    exit;
}

// Override role to admin if logging in with valid adminKey
if ($userType === "admin") {
    $role = "admin";
}

echo json_encode([
    "status" => "success",
    "message" => "Login successful!",
    "user" => [
        "id" => $id,
        "fullname" => $fullname,
        "email" => $email,
        "faculty" => $faculty,
        "role" => $role
    ]
]);

$stmt->close();
$conn->close();
?>
