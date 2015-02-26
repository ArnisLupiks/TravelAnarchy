<?php
	error_reporting(0);

	require_once ("php_includes/db_conn.php");

	$mysqli = $db_conn;

	// Check for database connection error
	if (mysqli_connect_errno()) {
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$status = '%';
	if(isset($_GET['status'])){
		$status = $_GET['status'];
	}

	$query="select * from posts";
	$result = $mysqli->query($query) or die($mysqli->conn->error.__LINE__);
	$arr = array();

	if($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
		$arr[] = $row;
		}
	}

	# JSON-encode the response
	echo $json_response = json_encode($arr);

?>
