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




$i = 0;
foreach($_GET as $key => $value) {
  $str[$i] = $value;
  $i++;
}

$sql = "INSERT INTO wak (fase, gevoel)
VALUES ('$str[0]', '$str[1]' )";

//voor enkele
if ($conn->query($sql) === TRUE) {
    echo "cijfers opgeslagen";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
