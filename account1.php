<?php
// Database connection (update with your own credentials)
$host = 'localhost'; // Your database host
$db = 'your_database'; // Your database name
$user = 'your_username'; // Your database username
$pass = 'your_password'; // Your database password

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize error variables
$loginError = '';
$registerError = '';
$successMessage = '';

// Handle form submissions
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Login validation
    if (isset($_POST['login'])) {
        $username = trim($_POST['username-1']);
        $password = trim($_POST['pswd-1']);

        if (empty($username) || empty($password)) {
            $loginError = "Username and password cannot be empty.";
        } else {
            // Query to check if the username exists
            $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                // User exists, now verify the password
                $stmt->bind_result($hashedPassword);
                $stmt->fetch();

                if (password_verify($password, $hashedPassword)) {
                    $successMessage = "Login successful!"; // Placeholder for successful login
                    // Start session and store user information as needed
                } else {
                    $loginError = "Invalid username or password.";
                }
            } else {
                $loginError = "Invalid username or password.";
            }
            $stmt->close();
        }
    }

    // Registration validation
    if (isset($_POST['register'])) {
        $username = trim($_POST['username']);
        $email = trim($_POST['email']);
        $password = trim($_POST['pswd']);

        // Validate empty fields
        if (empty($username) || empty($email) || empty($password)) {
            $registerError = "All fields must be filled out.";
        } else {
            // Validate email format
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $registerError = "Please enter a valid email address.";
            } elseif (strlen($password) < 6) {
                $registerError = "Password must be at least 6 characters long.";
            } else {
                // Hash the password and insert user into the database
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
                $stmt->bind_param("sss", $username, $email, $hashedPassword);
                
                if ($stmt->execute()) {
                    $successMessage = "Registration successful!";
                } else {
                    $registerError = "Registration failed. Please try again.";
                }
                $stmt->close();
            }
        }
    }
}

// Close the database connection
$conn->close();
?>