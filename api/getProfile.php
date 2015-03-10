<?php
header("Access-Control-Allow-Origin: *");

	error_reporting(0);

	require_once ("php_includes/db_conn.php");

	$mysqli = $db_conn;

	// Check for database connection error
	if (mysqli_connect_errno()) {
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	//declare
	$data = json_decode(file_get_contents("php://input"));
	$usrid = mysql_real_escape_string($data->uid);

	$query = "SELECT uid, name, surname, birthday, picture
	 					FROM users WHERE uid = ?";
	if($statement = $mysqli->prepare($query)){
	$statement->bind_param('s', $usrid);
	$statement->execute();
	$statement->bind_result($uid, $name, $surname, $birthday, $picture);
	$statement->fetch();
	$statement->free_result();
	echo $json_response = json_encode($result);

						//close connection
						$statement->close();
					}
					$mysqli->close();
/*
	if($usrid != null){
        echo $usrid;
        $query="SELECT * FROM users WHERE uid = '$usrid' ";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
				$arr = array();

				if($result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
					$arr[] = $row;
					}
				}
				# JSON-encode the response
       echo $json_response = json_encode($arr);
    }else{
      echo "there is some errors!! ";
    }



	$status = '%';
	if(isset($_GET['status'])){
		$status = $_GET['status'];
	}

*/


?>
