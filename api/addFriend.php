<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE");
	error_reporting(0);
	try {
  	require_once ("php_includes/db_conn.php");
  	$mysqli = $db_conn;
  	// Check for database connection error
  	if (mysqli_connect_errno()) {
  			echo "Failed to connect to MySQL: " . mysqli_connect_error();
  	}
  	//declaring
  	$data = json_decode(file_get_contents("php://input"));
  	$userID = $data->userID;
    $friendID = $data->friendID;

    //selects from database user id and email
    $query = "SELECT * FROM friends WHERE userID = '$userID' AND friendID = '$friendID'";
    $res = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $res = $mysqli->affected_rows;
    //if user userID and friendID exists
    if($res = $mysqli->affected_rows > 0){
        //do update on user table
        echo $json_response = json_encode("User already exists here");
    }else{
      echo $userID;
      $query="INSERT INTO friends (userID, friendID) VALUES ('$userID', '$friendID')";
      $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
      $result = $mysqli->affected_rows;
    }
      echo $json_response = json_encode($result);

  } catch (exception $e) {
        echo json_encode(null);
  }

?>
