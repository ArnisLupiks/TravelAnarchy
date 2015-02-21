<?php

require_once 'config.php';

$link = mysql_connect('DB_HOST', 'DB_USERNAME','DB_PASSWORD');

if (!$link){

	die ('Could not connect:' .mysql_error());
}

echo 'Connected successfully';
mysql_close($link);





//$conn = mysql_connect($DB_HOST, $DB_USERNAME, $DB_PASSWORD) or die ("Error connecting to mysql");
//mysql_select_db($DB_DATABASE, $conn) or die ("Couldn't find a database.");

//mysql_ping();
?>
