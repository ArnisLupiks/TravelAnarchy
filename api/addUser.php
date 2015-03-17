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
    $name = mysql_real_escape_string($data->name);
    $username = mysql_real_escape_string($data->username);
    $email = mysql_real_escape_string($data->email);
    $surname = mysql_real_escape_string($data->surname);
    $birthday = mysql_real_escape_string($data->birthday);
    $picture = mysql_real_escape_string($data->picture);
    //execute
      //selects from database user id and email
      $query = mysqli_query($mysqli, "SELECT * FROM users WHERE uid = '$usrid' AND email = '$email'");
      //if user id and email is the same
      if(mysqli_num_rows($query) > 0){
          //do update on user table
          //echo "User already exists here";
          $mysqli->query = ("UPDATE users SET name =?, username = ?, surname = ?, picture = ?
                   WHERE uid = '$usrid AND email = '$email'");
          $statement = $mysqli->prepare($query);
          //bind parameters for markers, where (s = string, i = integer, d = double,  b = blob)
          $results = $statement->bind_param('sssb', $name, $username, $surname, $picture);

          if($results){
              //print 'Success! recordsl in database updated';
          }else{
              print 'Error : ('. $mysqli->errno .') '. $mysqli->error;
          }
      }else{
        //insert new user in database.
        //echo 'there is no user like this, we are storing it in our database';
        $query="INSERT INTO users(uid,name,username,surname,email,birthday,picture) VALUES ('$usrid','$name','$username', '$surname', '$email', '$birthday', '$picture')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;
      }
       echo $json_response = json_encode($result);
?>
