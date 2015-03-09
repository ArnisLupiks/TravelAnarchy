<?php

    error_reporting(0);

    require_once ("php_includes/db_conn.php");
    // Connecting to mysql database
    $mysqli = $db_conn;
    // Check for database connection error
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    } // The mysql database connection script
    //declare

    $data = json_decode(file_get_contents("php://input"));
    $usrid = mysql_real_escape_string($data->uid);
    $username = mysql_real_escape_string($data->username);
    $email = mysql_real_escape_string($data->email);
    $surname = mysql_real_escape_string($data->surname);
    $birthday = mysql_real_escape_string($data->birthday);
    $picture = mysql_real_escape_string($data->picture);
    //execute


      $query = mysqli_query($mysqli, "SELECT * FROM users WHERE uid = '$usrid' AND email = '$email'");



      if(mysqli_num_rows($query) > 0){
          echo "User already exists here";
          $update_query = mysqli_query($mysqli,"UPDATE users SET name = '$username', surname = '$surname', birthday = '$birthday', picture = '$picture' WHERE uid = '$usrid' AND email = '$email'");
          if ($mysqli->query($update_query) ===TRUE){
            echo " Records updated succeddfully";
          }else{
            echo " Error updating records: " . $mysqli->error;
          }
        }else{
        echo 'there is no user like this, we are storing it in our database';
        $query="INSERT INTO users(uid,name,surname,email,birthday,picture) VALUES ('$usrid', '$username', '$surname', '$email', '$birthday', '$picture')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;
      }
       echo $json_response = json_encode($result);


?>
