<?php

$conn = mysql_connect($DB_HOST, $DB_USERNAME, $DB_PASSWORD) or die ("Error connecting to mysql");
mysql_select_db($DB_DATABASE);

mysql_ping();
?>
