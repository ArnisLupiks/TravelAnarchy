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
    $uniqueID = $mysqli->real_escape_string($data->uniqueID);
    $picName = $mysqli->real_escape_string($data->picName);
    $tag = $mysqli->real_escape_string($data->tag);

    //execute
  if($usrid != null){
        echo $usrid;
        $query="INSERT INTO logpictures (uid,uniqueID,name,tag) VALUES ('$usrid', '$uniqueID', '$picName','$tag')";
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
