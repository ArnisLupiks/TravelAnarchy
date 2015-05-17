<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE");
try{
    require_once ("php_includes/db_conn.php");
    // Connecting to mysql database
    $mysqli = $db_conn;

    // Check for database connection error
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    } // The mysql database connection script

    //declare
    $data = json_decode(file_get_contents("php://input"));
    $usrid = $mysqli->real_escape_string($data->uid);
    $heading = $mysqli->real_escape_string($data->heading);
    $content = $mysqli->real_escape_string($data->content);
    $latitude = $mysqli->real_escape_string($data->latitude);
    $longitude = $mysqli->real_escape_string($data->longitude);
    $pict = $mysqli->real_escape_string($data->pict);

    //$location = mysql_real_escape_string($data->location);
    $date = $mysqli->real_escape_string($data->date);
    //execute
  if($usrid != null){
        echo $usrid;
        $query="INSERT INTO posts (uid,postHeading,postContent,latitude,longitude,pict,date) VALUES ('$usrid', '$heading', '$content','$latitude','$longitude','$pict', '$date')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;
       echo $json_response = json_encode($result);
    }else{
      echo "there is some errors!! ";
    }
  } catch (exception $e) {
          echo json_encode(null);
}
?>
