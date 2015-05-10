<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE");

    require_once ("php_includes/db_conn.php");

    // Connecting to mysql database
    $mysqli = $db_conn;
    // Check for database connection error
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    } // The mysql database connection script
    //declare
    $data = json_decode(file_get_contents("php://input"));
    $usrid =$mysqli->real_escape_string($data->uid);
    $name = $mysqli->real_escape_string($data->name);
    $username = $mysqli->real_escape_string($data->username);
    $email = $mysqli->real_escape_string($data->email);
    $surname = $mysqli->real_escape_string($data->surname);
    $picture = $mysqli->real_escape_string($data->picture);
    //execute
      //selects from database user id and email
      $query = "SELECT email FROM users WHERE uid = '$usrid'";
      $res = $mysqli->query($query) or die($mysqli->error.__LINE__);
      $res = $mysqli->affected_rows;

      //if user id and email is the same
      if($res = $mysqli->affected_rows > 0){
          //do update on user table
          echo "User already exists here";
          $query = "UPDATE users SET name = '$name', username = '$username', surname = '$surname', email = '$email'
                   WHERE uid = '$usrid'";
                   $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
                   $result = $mysqli->affected_rows;

      }else{
        //insert new user in database.
        //echo 'there is no user like this, we are storing it in our database';
        $query="INSERT INTO users (uid,name,username,surname,email,picture) VALUES ('$usrid','$name','$username', '$surname', '$email', '$picture')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;
      }
       echo $json_response = json_encode($result);
?>
