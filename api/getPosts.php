<?php
	error_reporting(0);

	require_once ("php_includes/db_conn.php");


		
	
	if($result = $db_conn->query("SELECT * FROM posts")){
		if($result->num_rows){
			$rows = $result->fetch_assoc();

			echo '<pre>' , print_r($rows), '</pre>';
		}
	}


?>
