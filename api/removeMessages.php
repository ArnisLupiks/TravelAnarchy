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
	$ID = $mysqli->real_escape_string($data->mesID);
  $receiverUid = $mysqli->real_escape_string($data->receiverUid);

	$query="DELETE FROM messages WHERE ID = '$ID' AND receiverUid = '$receiverUid'";
	$result = $mysqli->query($query) or die($mysqli->conn->error.__LINE__);
  $result = $mysqli->affected_rows;
   echo $json_response = json_encode($result);
  } catch (exception $e) {
      echo json_encode(null);
  }
?>
