<?php
  /*
   * Table name: test_config
   * Schema:
   * - index: 0 (primary key) (just an identifier)
   * - seed
   * - topics (serialized array)
   * - questionAmount
   * - maxAttemptCount
   * - timeLimit (in seconds, int)
   * - testIsOpen (boolean)
   * - answerIsOpen (boolean)
   */

  class AdminDatabase{
    protected $db;

    public function __construct() {
      $this->db = mysqli_connect("localhost",DB_USERNAME,DB_PASSWORD,DB_NAME);

      if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }

      $this->init();
    }

    protected function init(){
      mysqli_query($this->db, "INSERT IGNORE INTO `test_config` (`index`, `seed`, `topics`, `questionAmount`, `maxAttemptCount`,
        `timeLimit`, `testIsOpen`, `answerIsOpen`) VALUES ('"."0"."','"."0"."','".serialize(array("BST"))."','"."10"."','"."1".
        "','"."60"."','"."0"."','"."0"."')");
    }

    public function validate($password){
      return $password === ADMIN_PASSWORD;
    }

    /*
     * parameters (all optional):
     * - seed
     * - topics
     * - questionAmount
     * - maxAttemptCount
     * - timeLimit (in seconds, int)
     * - testIsOpen (boolean)
     * - answerIsOpen (boolean)
     */

    public function editConfig($params, $password){
      if(!$this->validate($password)) return false;

      if(array_key_exists("seed", $params)) mysqli_query($this->db, "UPDATE `test_config` SET `seed` = ".$params["seed"].
        " WHERE `index` = "."0");

      if(array_key_exists("topics", $params)) mysqli_query($this->db, "UPDATE `test_config` SET `topics` = '".
        serialize($params["topics"])."' WHERE `index` = "."0");

      if(array_key_exists("questionAmount", $params)) mysqli_query($this->db, "UPDATE `test_config` SET `questionAmount` = ".
        $params["questionAmount"]." WHERE `index` = "."0");

      // Max Attempt Count cannot be lower than 0
      if(array_key_exists("maxAttemptCount", $params)) mysqli_query($this->db, "UPDATE `test_config` SET `maxAttemptCount` = ".
        ($params["maxAttemptCount"]>0? $params["maxAttemptCount"]:1)." WHERE `index` = "."0");

      if(array_key_exists("timeLimit", $params)) mysqli_query($this->db, "UPDATE `test_config` SET `timeLimit` = ".
        $params["timeLimit"]." WHERE `index` = "."0");

      if(array_key_exists("testIsOpen", $params)) mysqli_query($this->db, "UPDATE `test_config` SET `testIsOpen` = ".
        ($params["testIsOpen"]? "1":"0")." WHERE `index` = "."0");

      if(array_key_exists("answerIsOpen", $params)) mysqli_query($this->db, "UPDATE `test_config` SET `answerIsOpen` = ".
        ($params["answerIsOpen"]? "1":"0")." WHERE `index` = "."0");

      return true;
    }

    public function getConfig($password){
      if(!$this->validate($password)) return false;

      $result = mysqli_query($this->db, "SELECT * FROM `test_config` WHERE `index`='"."0"."'");
      $config = mysqli_fetch_assoc($result);
      $config["topics"] = unserialize($config["topics"]);
      unset($config["index"]);

      return $config;
    }

    public function resetAttempt($username, $password){
      if(!$this->validate($password)) return false;

      $checkUsername = mysqli_query($this->db, "SELECT `username` FROM `test` WHERE `username`='".$username."'");
      if(mysqli_num_rows($checkUsername) == 0){
        return false;
      }

      mysqli_query($this->db, "UPDATE `test` SET `attemptCount` = "."0"." WHERE `username` = '".$username."'");

      return true;
    }
  }
?>