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
	$comID = $data->comID;
  $comUsrID = $data->comUsrID;

	$query="DELETE FROM logcomments WHERE id = '$comID' AND comUsrID = '$comUsrID'";
	$result = $mysqli->query($query) or die($mysqli->conn->error.__LINE__);
  $result = $mysqli->affected_rows;
   echo $json_response = json_encode($result);
  } catch (exception $e) {
      echo json_encode(null);
  }
?>
