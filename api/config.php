<?php


$DB_HOST = "localhost";
$DB_PASSWORD = "Luisa1985!";
$DB_USERNAME = "root";
$DB_DATABASE = "TravelMate";

$con = mysqli_connect($DB_HOST,$DB_USERNAME, $DB_PASSWORD, $DB_DATABASE);
if(mysqli_connect_errno()){
	echo "Failed ERROR to connect to MySQL" . mysqli__connect_error();
}
?>
