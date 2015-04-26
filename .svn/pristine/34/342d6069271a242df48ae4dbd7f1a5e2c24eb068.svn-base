<?php
  /*
   * Table name: test
   * Schema:
   * - username: primary key, foreign key to user table
   * - answer (serialized array)
   * - grade
   * - timeTaken
   * - startTime (datetime data structure)
   * - attemptCount
   */

  class TestModeDatabase{
    protected $db;

    public function __construct() {
      $this->db = mysqli_connect("localhost",DB_USERNAME,DB_PASSWORD,DB_NAME);

      if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }

      $this->init();
    }

    protected function init(){
      $userList = mysqli_query($this->db, "SELECT `username` FROM `user`");
      while($user = mysqli_fetch_assoc($userList)){
        mysqli_query($this->db, "INSERT IGNORE INTO `test` (`username`, `answer`, `grade`, `timeTaken`, `startTime`, `attemptCount`)
          VALUES ('".$user["username"]."','".""."','"."0"."','"."0"."','".date('Y-m-d H:i:s')."','"."0"."')");
      }

    }

    public function validate($username, $password){
      $user = mysqli_query($this->db, "SELECT * FROM `user` WHERE `username` = '".$username."'");
      $user = mysqli_fetch_assoc($user);

      return $password === $user["password"];
    }

    public function getTestParams(){
      $result = mysqli_query($this->db, "SELECT * FROM `test_config` WHERE `index`='"."0"."'");
      $config = mysqli_fetch_assoc($result);
      $config["topics"] = unserialize($config["topics"]);

      return $config;
    }

    public function getTimeElapsed($username, $password){
      if(!$this->validate($username, $password)) return false;
      
      $startTime = mysqli_query($this->db, "SELECT `startTime` FROM `test` WHERE `username` = '".$username."'");
      $temp = mysqli_fetch_assoc($startTime);
      $startTime = strtotime($temp["startTime"]);
      $now = time();

      return ($now - $startTime);
    }

    public function begin($username, $password){
      if(!$this->validate($username, $password)) return false;

      // update attempt counter
      // if test is not open don't update attempt counter
      $testParams = $this->getTestParams();
      if(!$testParams["testIsOpen"]) return false;

      $attemptCount = mysqli_query($this->db, "SELECT `attemptCount` FROM `test` WHERE `username` = '".$username."'");
      $temp = mysqli_fetch_assoc($attemptCount);
      $attemptCount = $temp["attemptCount"];
      $attemptCount++;
      $maxAttemptCount = $testParams["maxAttemptCount"];
      if($attemptCount <= 0 || $attemptCount > $maxAttemptCount) return false;

      mysqli_query($this->db, "UPDATE `test` SET `attemptCount` = '".($attemptCount)."' WHERE `username` = '".$username."'");

      $startTime = date('Y-m-d H:i:s');
      mysqli_query($this->db, "UPDATE `test` SET `startTime` = '".$startTime."' WHERE `username` = '".$username."'");
      
      return true;
    }

    /*
     * params (all fields compulsory):
     * - answer: student's answer
     * - grade: student's grade
     */

    public function submit($username, $password, $params){
      $testParams = $this->getTestParams();
      // validate username and password
      if(!$this->validate($username, $password)) return false;

      // validate test is open
      if(!$testParams["testIsOpen"]) return false;

      // validate attempt count is > 0 and less than max allowed
      $maxAttemptCount = $testParams["maxAttemptCount"];

      $attemptCount = mysqli_query($this->db, "SELECT `attemptCount` FROM `test` WHERE `username` = '".$username."'");
      $temp = mysqli_fetch_assoc($attemptCount);
      $attemptCount = $temp["attemptCount"];

      if($attemptCount <= 0 || $attemptCount > $maxAttemptCount) return false;

      // validate submission params
      if(!array_key_exists("answer", $params) || !array_key_exists("grade", $params)){
        return false;
      }

      $startTime = mysqli_query($this->db, "SELECT `startTime` FROM `test` WHERE `username` = '".$username."'");
      $temp = mysqli_fetch_assoc($startTime);
      $startTime = strtotime($temp["startTime"]);
      $now = time();

      mysqli_query($this->db, "UPDATE `test` SET `answer` = '".serialize($params["answer"])."' WHERE `username` = '".$username."'");
      mysqli_query($this->db, "UPDATE `test` SET `grade` = '".$params["grade"]."' WHERE `username` = '".$username."'");
      mysqli_query($this->db, "UPDATE `test` SET `timeTaken` = '".($now-$startTime)."' WHERE `username` = '".$username."'");
    }

    public function getUserAnswer($username, $password){
      if(!$this->validate($username, $password)) return false;

      $answer = mysqli_query($this->db, "SELECT `answer` FROM `test` WHERE `username` = '".$username."'");
      $answer = mysqli_fetch_assoc($answer);
      return unserialize($answer["answer"]);
    }

    public function getScoreboard(){
      $questionAmt = mysqli_query($this->db, "SELECT `questionAmount` FROM `test_config`");
      $questionAmt = mysqli_fetch_assoc($questionAmt);
      $questionAmt = $questionAmt["questionAmount"];

      $scoreboard = mysqli_query($this->db, "SELECT `username`, `grade`, `timeTaken` FROM `test` ORDER BY `grade` DESC, `timeTaken`, `username`");
      $scoreboardItem;
      $scoreboardArr = array();

      while ($scoreboardItem = mysqli_fetch_assoc($scoreboard)) {
        $name = mysqli_query($this->db, "SELECT `name` FROM `user` WHERE `username`='".$scoreboardItem["username"]."'");
        $nameArr = mysqli_fetch_assoc($name);
        $scoreboardItem["name"] = $nameArr["name"];
        $scoreboardItem["questionAmount"] = $questionAmt;
        $scoreboardArr[] = $scoreboardItem;
      }

      return $scoreboardArr;
    }
  } 
?>