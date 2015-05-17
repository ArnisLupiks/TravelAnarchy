<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE");
	try {
  	require_once ("php_includes/db_conn.php");
  	$mysqli = $db_conn;
  	// Check for database connection error
  	if (mysqli_connect_errno()) {
  			echo "Failed to connect to MySQL: " . mysqli_connect_error();
  	}
  	//declaring
  	$data = json_decode(file_get_contents("php://input"));
  	$postID = $mysqli->real_escape_string($data->postID);

    //selects from database user userID and friendID
    $query = "SELECT count(postID) from likes where postID ='$postID'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $data =mysqli_fetch_assoc($result);

  	echo $json_response = json_encode($data);
  } catch (exception $e) {
        echo json_encode(e);
  }
?>
