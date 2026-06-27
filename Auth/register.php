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

$fullname = isset($data['fullname']) ? trim($data['fullname']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? $data['password'] : '';
$faculty = isset($data['faculty']) ? trim($data['faculty']) : '';
$role = isset($data['role']) ? trim($data['role']) : 'student';
$passKey = isset($data['passKey']) ? trim($data['passKey']) : '';

// Validation
if (empty($fullname) || empty($email) || empty($password) || empty($faculty)) {
    echo json_encode(["status" => "error", "message" => "All fields (Full Name, Email, Password, Faculty) are required."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email format."]);
    exit;
}

// Student Official validation
$OFFICIAL_SECRET = "FPAS2026";
if ($role === "official" && $passKey !== $OFFICIAL_SECRET) {
    echo json_encode(["status" => "error", "message" => "Invalid Official Passkey. Access Denied."]);
    exit;
}

// Check if email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email is already registered."]);
    $stmt->close();
    exit;
}
$stmt->close();

// Hash password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insert user
$stmt = $conn->prepare("INSERT INTO users (fullname, email, password, faculty, role) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "SQL preparation failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("sssss", $fullname, $email, $hashedPassword, $faculty, $role);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Registration successful!",
        "user" => [
            "fullname" => $fullname,
            "email" => $email,
            "faculty" => $faculty,
            "role" => $role
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Registration failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
