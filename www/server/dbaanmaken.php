<?php
$servername = "localhost";
$username = "i264371_s4";
$password = "schrift";
$dbname = "i264371_app";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE TABLE wak (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
fase INT(3) NOT NULL,
gevoel INT(3) NOT NULL,
reg_date TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "database is aangemaakt";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>
