<?php	

	include_once 'config.php';
	include_once 'opendb.php';

	if(mysqli_connect_errno()){
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$status = '%';
	if(isset($_GET['status'])){
		$status = $_GET['status'];
	}
	
	$query = "SELECT * FROM posts";
	$results = $mysqli->query($query) or die ($mysqli->conn->error._LINE_);
	$arr = array();

	if($result->num_rows >0){
		while($row = $result->fetch_assoc()){
			$arr[] = $row;
		}
	}

	echo $json_response = json_encode($arr);

?>
