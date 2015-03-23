<?php
header("Access-Control-Allow-Origin: *");

    //error_reporting(0);

    require_once ("php_includes/db_conn.php");
    // Connecting to mysql database
    $mysqli = $db_conn;

    // Check for database connection error
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    } // The mysql database connection script

    //declare
    $data = json_decode(file_get_contents("php://input"));
    $receiverUid = mysql_real_escape_string($data->receiverUid);
    $senderUid = mysql_real_escape_string($data->senderUid);
    $mess = mysql_real_escape_string($data->message);
  //execute
  if($senderUid != null){
        echo $receiverUid;
        $query="INSERT INTO messages(receiverUid,senderUid,mess) VALUES ('$receiverUid', '$senderUid', '$mess')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;
       echo $json_response = json_encode($result);
    }else{
      echo "there is some errors!! ";
    }

?>
