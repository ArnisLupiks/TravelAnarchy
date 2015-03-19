<?php
	header("Access-Control-Allow-Origin: *");
	error_reporting(0);
	try {
	require_once ("php_includes/db_conn.php");
	$mysqli = $db_conn;
	// Check for database connection error
	if (mysqli_connect_errno()) {
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
 //declare
	$data = json_decode(file_get_contents("php://input"));
	$usrid = mysql_real_escape_string($data->uid);

	$query = "SELECT username, surname, picture
	 					FROM users WHERE uid = ?";
	$statement = $mysqli->prepare($query);
	$statement->bind_param('s', $usrid);
	$statement->execute();
	$result = $statement -> get_result();
        $data = array();
        //MYSQLI_NUM = Array items will use a numerical index key.
        //MYSQLI_ASSOC = Array items will use the column name as an index key.
        //MYSQLI_BOTH = [default] Array items will be duplicated, with one having a numerical index key and one having the column name as an index key.
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        //unicode
        header("Content-Type: application/json", true);
        echo json_encode($data);
	//close connection
  $statement->close();
	$mysqli->close();

} catch (exception $e) {
        echo json_encode(null);
}
?>
