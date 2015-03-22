<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization");
header("Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE");

	//error_reporting(0);
	try{
	require_once ("php_includes/db_conn.php");

	$mysqli = $db_conn;

	// Check for database connection error
	if (mysqli_connect_errno()) {
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	/*
	$query="select * from posts";
	$result = $mysqli->query($query) or die($mysqli->conn->error.__LINE__);
	$arr = array();

	if($result->num_rows > 0) {
		while($row = $result->mysqli_fetch_assoc()) {
		$arr[] = $row;
		}
	}

	# JSON-encode the response
	echo $json_response = json_encode($arr);
*/
	$query = "SELECT *	FROM posts";
	$statement = $mysqli->prepare($query);
	//$statement->bind_param();
	$statement->execute();
	$result = $statement -> get_result();
        $arr = array();
        //MYSQLI_NUM = Array items will use a numerical index key.
        //MYSQLI_ASSOC = Array items will use the column name as an index key.
        //MYSQLI_BOTH = [default] Array items will be duplicated, with one having a numerical index key and one having the column name as an index key.
        while ($row = mysqli_fetch_assoc($result)) {
            $arr[] = $row;
        }
        //unicode
        header("Content-Type: application/json", true);
        echo json_encode($arr);
	//close connection
  $statement->close();
	$mysqli->close();

} catch (exception $e) {
        echo json_encode(null);
}





?>
