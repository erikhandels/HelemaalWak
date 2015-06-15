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

//vars reset
$bericht = "geen bericht";

//--------------totaal aantal snoozes
$sql = "SELECT id, fase, gevoel FROM wak";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $i = 0;

    while($row = $result->fetch_assoc()) {
        $i++;
    }
    //echo "<br>totaal snoozes = ".$i."<br>";
    $totaalsnooze = $i;
}
else {
  //echo "<br>aantal snoozes = 0<br>";
  $totaalsnooze = 0;
}

//----------------aantal snooze bij goed
$sql = "SELECT id, fase, gevoel FROM wak WHERE gevoel='3'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $i = 0;

    while($row = $result->fetch_assoc()) {
        $i++;
    }
    //echo "<br>goed = ".$i."<br>";
    $goed = $i;
}
else {
  //echo "<br>goed = 0<br>";
  $goed = 0;
}

//--------------------aantal snooze bij matig
$sql = "SELECT id, fase, gevoel FROM wak WHERE gevoel='2'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $i = 0;

    while($row = $result->fetch_assoc()) {
        $i++;
    }
    //echo "<br>matig = ".$i."<br>";
    $matig = $i;
}
else {
  //echo "<br>matig = 0<br>";
  $matig = 0;
}

//-----------------------aantal snooze bij slecht
$sql = "SELECT id, fase, gevoel FROM wak WHERE gevoel='1'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $i = 0;

    while($row = $result->fetch_assoc()) {
        $i++;
    }
    //echo "<br>slecht = ".$i."<br>";
    $slecht = $i;
}
else {
  //echo "<br>slecht = 0<br>";
  $slecht = 0;
}









//----------------------------goed wakker worden
$sql = "SELECT id, fase, gevoel FROM wak WHERE gevoel='3'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $i = 0;
  $c = 0;

    while($row = $result->fetch_assoc()) {
        $c = ($c + $row["fase"]);
        $i++;
    }
    //echo "aantalsnoozes bij goed gevoel = ".$i."<br>";
    //echo "totaalfases = ".$c."<br>";
    $gemgev = $c / $i;
    //echo "de fase waarbij jij je goed voelt = ".round($gemgev);
    $fasegoedvoel = round($gemgev);
}
else {

//-----------------------------matig wakker worden
    $sql = "SELECT id, fase, gevoel FROM wak WHERE gevoel='2'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      $bericht = "je bent nog niet blij wakker geworden, wel matig";
      $i = 0;
      $c = 0;

        while($row = $result->fetch_assoc()) {
            $c = ($c + $row["fase"]);
            $i++;
        }
        //echo "aantalsnoozes bij matig gevoel = ".$i."<br>";
        //echo "totaalfases = ".$c."<br>";
        $gemgev = $c / $i;
        //echo "de fase waarbij jij je goed voelt = ".round($gemgev);
        $fasegoedvoel = round($gemgev);
    }
    else {
//------------------slecht wakker worden
        $sql = "SELECT id, fase, gevoel FROM wak WHERE gevoel='1'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          $bericht = "je bent nog niet blij of matig wakker geworden";
          $i = 0;
          $c = 0;

            while($row = $result->fetch_assoc()) {
                $c = ($c + $row["fase"]);
                $i++;
            }
            //echo "aantalsnoozes bij slecht gevoel = ".$i."<br>";
            //echo "totaalfases = ".$c."<br>";
            $gemgev = $c / $i;
            //echo "de fase waarbij jij je goed voelt = ".round($gemgev);
            $fasegoedvoel = round($gemgev);
        }
        else {
          $bericht = "je hebt nog geen gevoel ingevoerd";
        }
    }
}


//----------------------array voor uitlezen
$arr = array(
  'totaalsnooze'=>$totaalsnooze,
  'goed'=>$goed,
  'matig'=>$matig,
  'slecht'=>$slecht,
  'fasegoedvoel'=>$fasegoedvoel,
  'bericht'=>$bericht
);
echo json_encode($arr);


$conn->close();
?>
