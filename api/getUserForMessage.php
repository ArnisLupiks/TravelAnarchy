<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE");

	//error_reporting(0);
	try {
	require_once ("php_includes/db_conn.php");

	$mysqli = $db_conn;

	// Check for database connection error
	if (mysqli_connect_errno()) {
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}


//  $surname = mysql_real_escape_string($data->surname);


	$query="SELECT DISTINCT uid, c.name, c.email
	 					FROM users c order by 1";
	$result = $mysqli->query($query) or die($mysqli->conn->error.__LINE__);
	$data = array();

	if($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
		$data[] = $row;
		}
	}

	echo $json_response = json_encode($data);
} catch (exception $e) {
        echo json_encode(null);
    }
?>
