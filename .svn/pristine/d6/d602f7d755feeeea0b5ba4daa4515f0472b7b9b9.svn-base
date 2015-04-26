<?php
  /*
   * Table name: user
   * Schema:
   * - name
   * - username (primary key)
   * - password
   * - trainingModeTableNamen (currently not used)
   */

  /*
   * Each user will have one training mode table
   * Schema:
   * - session (we need to decide how much session to store)
   * - seed (to generate the questions again)
   * - answer: serialized array of answers
   * - grade
   * - timeTaken
   */

  class UserDatabase{
    protected $db;

    public function __construct() {
      $this->db = mysqli_connect("localhost",DB_USERNAME,DB_PASSWORD,DB_NAME);

      if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }

      $this->init();
    }

    protected function init(){
      // $this->insertMockUsers();
    }

    protected function insertMockUsers(){
      mysqli_query($this->db, "INSERT IGNORE INTO `user` (`name`, `username`, `password`)
        VALUES ('"."Ivan"."','"."ivan"."','"."test1"."')");
      mysqli_query($this->db, "INSERT IGNORE INTO `user` (`name`, `username`, `password`)
        VALUES ('"."Rose"."','"."rose"."','"."test2"."')");
      mysqli_query($this->db, "INSERT IGNORE INTO `user` (`name`, `username`, `password`)
        VALUES ('"."Steven"."','"."steven"."','"."test3"."')");
    }

    public function validate($username, $password){
      $user = mysqli_query($this->db, "SELECT * FROM `user` WHERE `username` = '".$username."'");
      $user = mysqli_fetch_assoc($user);

      return $password === $user["password"];
    }

    public function validateAdmin($adminPwd){
      return $adminPwd === ADMIN_PASSWORD;
    }

    public function exists($username){
      $checkUsername = mysqli_query($this->db, "SELECT * FROM `user` WHERE `username`='".$username."'");
      if(mysql_num_rows($result) == 0){
        return false;
      }

      return true;
    }

    // TODO: secure this against SQL injection
    public function register($name, $username, $password){
      mysqli_query($this->db, "INSERT IGNORE INTO `user` (`name`, `username`, `password`)
        VALUES ('".$name."','".$username."','".$password."')");

      mysqli_query($this->db, "INSERT IGNORE INTO `test` (`username`, `answer`, `grade`, `timeTaken`, `startTime`, `attemptCount`)
          VALUES ('".$username."','".""."','"."0"."','"."0"."','".date('Y-m-d H:i:s')."','"."0"."')");
    }

    public function getName($username, $password){
      if(!$this->validate($username, $password)) return false;

      $name = mysqli_query($this->db, "SELECT `name` FROM `user` WHERE `username`='".$username."'");
      $name = mysqli_fetch_assoc($name);

      return $name["name"];
    }

    public function removeAllUsers($adminPwd){
      if(!$this->validateAdmin($adminPwd)) return false;

      mysqli_query($this->db, "TRUNCATE TABLE `user`");
    }
  }
?>