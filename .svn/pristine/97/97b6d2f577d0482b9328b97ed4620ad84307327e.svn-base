<?php
  require_once 'Everything.php';

  // while (@ob_end_flush()); // Debug mode

  $bstQuestionGen = new BstQuestionGenerator();
  $heapQuestionGen = new HeapQuestionGenerator();
  $bitmaskQuestionGen = new BitmaskQuestionGenerator();
  $ufdsQuestionGen = new UfdsQuestionGenerator();
  $mstQuestionGen = new MstQuestionGenerator();
  $ssspQuestionGen = new SsspQuestionGenerator();
  $graphdsQuestionGen = new GraphdsQuestionGenerator();
  $graphTraversalQuestionGen = new GraphTraversalQuestionGenerator();

  $questionGenerator = array(
    QUESTION_TOPIC_BST => $bstQuestionGen,
    QUESTION_TOPIC_HEAP => $heapQuestionGen,
    QUESTION_TOPIC_BITMASK => $bitmaskQuestionGen,
    QUESTION_TOPIC_UFDS => $ufdsQuestionGen,
    QUESTION_TOPIC_MST => $mstQuestionGen,
    QUESTION_TOPIC_SSSP => $ssspQuestionGen,
    QUESTION_TOPIC_GRAPH_DS => $graphdsQuestionGen,
    QUESTION_TOPIC_GRAPH_TRAVERSAL => $graphTraversalQuestionGen
  );

  $qSeed = 0;
  $qArr = array();
  $sAnsArr = array();
  $ansList = array();
  $sAnsCorrectness = array();
  $score = 0;

  function generateQuestions($qAmt, $qTopics){
    global $questionGenerator;
    global $qSeed;
    global $qArr;
    global $sAnsArr;
    global $ansList;
    global $sAnsCorrectness;
    global $score;

    srand((int)$qSeed);

    $qArr = array();
    $qAmtTopic = array();

    /*
    FUTURE WORK: allow no. of questions for each topic to be set individually
    */

    $quotient = floor($qAmt/count($qTopics));
    $remainder = $qAmt%count($qTopics);
    for($i=0; $i < count($qTopics); $i++) {
      $qAmtTopic[] = $quotient;
    }
    for($i=0; $i < $remainder; $i++) {
      $qAmtTopic[$i] += 1;
    }

    for($i = 0; $i < count($qTopics); $i++){
      if(array_key_exists($qTopics[$i], $questionGenerator))
        $qArr = array_merge($qArr, $questionGenerator[$qTopics[$i]]->generateQuestion($qAmtTopic[$i]));
    }
    // End of question generator
  }

  function checkAnswers($qAmt, $qTopics){
    global $questionGenerator;
    global $qSeed;
    global $qArr;
    global $sAnsArr;
    global $ansList;
    global $sAnsCorrectness;
    global $score;

    generateQuestions($qAmt, $qTopics);

    for($i = 0; $i < count($qArr);$i++){
      if($sAnsArr[$i][0] == UNANSWERED){
        $sAnsCorrectness[$i] = false;
        continue;
      }
      else if($sAnsArr[$i][0] == NO_ANSWER){
        $sAnsArr[$i] = array();
      }

      $sAnsCorrectness[$i] = $questionGenerator[$qArr[$i]->qTopic]->checkAnswer($qArr[$i],$sAnsArr[$i]);
      if($sAnsCorrectness[$i]){
        $score++;
      }
    }
  }

  function getAnswers($qAmt, $qTopics){
      global $questionGenerator;
      global $qSeed;
      global $qArr;
      global $sAnsArr;
      global $ansList;
      global $sAnsCorrectness;
      global $score;

      generateQuestions($qAmt, $qTopics);

      for($i = 0; $i < count($qArr);$i++){
      if($sAnsArr[$i][0] == UNANSWERED){
        $sAnsCorrectness[$i] = false;
        $ansList[] = $questionGenerator[$qArr[$i]->qTopic]->getAnswer($qArr[$i],$sAnsArr[$i]);
        continue;
      } else if($sAnsArr[$i][0] == NO_ANSWER){
        $sAnsArr[$i] = array();
      }
      $sAnsCorrectness[$i] = $questionGenerator[$qArr[$i]->qTopic]->checkAnswer($qArr[$i],$sAnsArr[$i]);
      if($sAnsCorrectness[$i]){
        $ansList[] = CORRECT;
      } else {
        $ansList[] = $questionGenerator[$qArr[$i]->qTopic]->getAnswer($qArr[$i],$sAnsArr[$i]);
      }
    }
  }

  $mode = $_GET["mode"];

  if($mode == MODE_GENERATE_QUESTIONS){
    $qAmt = $_GET["qAmt"];
    $qSeed = $_GET["seed"];
    $qTopics = $_GET["topics"];

    $qTopics = explode(",", $qTopics);
    
    generateQuestions($qAmt, $qTopics);
    // End of question generator

    $qArrJson = array();

    for($i = 0; $i < count($qArr);$i++){
      $qArrJson[] = $qArr[$i]->toJsonObject();
    }

    echo arrayOfJsonStringEncoder($qArrJson);
  }

  else if($mode == MODE_CHECK_ANSWERS){
    $sAnsArrCsv = $_GET["ans"];
    $qSeed = $_GET["seed"];
    $qAmt = $_GET["qAmt"];
    $qTopics = $_GET["topics"];
    // echo implode("|",$sAnsArrCsv);
    for($i = 0; $i < count($sAnsArrCsv); $i++){
      $sAnsArr[] = explode(",",$sAnsArrCsv[$i]);
    }
    $score = 0;
    $qTopics = explode(",", $qTopics);

    checkAnswers($qAmt, $qTopics);

    echo $score;
  }

  else if($mode == MODE_GET_ANSWERS){
    $qSeed = $_GET["seed"];
    $qAmt = $_GET["qAmt"];
    $qTopics = $_GET["topics"];
    $qTopics = explode(",", $qTopics);
    $sAnsArrCsv = $_GET["ans"];

    for($i = 0; $i < count($sAnsArrCsv); $i++){
      $sAnsArr[] = explode(",",$sAnsArrCsv[$i]);
    }

    getAnswers($qAmt, $qTopics);

    echo json_encode($ansList);
  }

  else if($mode == MODE_GET_STUDENT_ANSWERS){
    echo "Currently unavailable";
  }

  else if($mode == MODE_LOGIN){
    // only verification
    $username = $_GET["username"];
    $password = $_GET["password"];
    $testModeDb = new TestModeDatabase();

    echo $testModeDb->validate($username, $password)? 1:0;
  }

  else if($mode == MODE_CHECK_TEST_OPEN){
    $testModeDb = new TestModeDatabase();

    $testParams = $testModeDb->getTestParams();
    $returnVal = array();
    $returnVal["testIsOpen"] = $testParams["testIsOpen"];
    $returnVal["answerIsOpen"] = $testParams["answerIsOpen"];
    
    echo json_encode($returnVal);
  }

  else if($mode == MODE_TEST_GENERATE_QUESTIONS){
    $username = $_GET["username"];
    $password = $_GET["password"];
    $type = $_GET["type"];
    $testModeDb = new TestModeDatabase();

    $testParams = $testModeDb->getTestParams();
    $qSeed = $testParams["seed"];

    if($type == TEST_GENERATE_QUESTIONS_TYPE_TEST){
      if($testModeDb->validate($username, $password) && $testParams["testIsOpen"]){
        if(!$testModeDb->begin($username, $password)) return;
      }

      else{
        return;
      }
    }

    else if($type != TEST_GENERATE_QUESTIONS_TYPE_ANSWER || !$testParams["answerIsOpen"]) return;

    generateQuestions(intval($testParams["questionAmount"]), $testParams["topics"]);

    $qArrJson = array();
    for($i = 0; $i < count($qArr);$i++){
      $qArrJson[] = $qArr[$i]->toJsonObject();
    }
    echo arrayOfJsonStringEncoder($qArrJson);
  }

  else if($mode == MODE_TEST_SUBMIT){
    $username = $_GET["username"];
    $password = $_GET["password"];
    $sAnsArrCsv = $_GET["ans"];

    $testModeDb = new TestModeDatabase();
    $params = $testModeDb->getTestParams();


    $qSeed = $params["seed"];
    $qAmt = $params["questionAmount"];
    $qTopics = $params["topics"];

    for($i = 0; $i < count($sAnsArrCsv); $i++){
      $sAnsArr[] = explode(",",$sAnsArrCsv[$i]);
    }
    $score = 0;

    // Question generator
    checkAnswers($qAmt, $qTopics);

    $submissionParams = array();
    $submissionParams["answer"] = $sAnsArr;
    $submissionParams["grade"] = $score;
    $testModeDb->submit($username, $password, $submissionParams);

    echo $score;

  }

  else if($mode == MODE_TEST_GET_INFO){
    $username = $_GET["username"];
    $password = $_GET["password"];
    $testModeDb = new TestModeDatabase();
    $userDb = new UserDatabase();

    $testParams = $testModeDb->getTestParams();

    $info = array();
    $info["timeElapsed"] = $testModeDb->getTimeElapsed($username, $password);
    $info["name"] = $userDb->getName($username, $password);
    $info["timeLimit"] = $testParams["timeLimit"];

    echo json_encode($info);
  }

  else if($mode == MODE_TEST_GET_ANSWERS){
    $username = $_GET["username"];
    $password = $_GET["password"];

    $testModeDb = new TestModeDatabase();
    $params = $testModeDb->getTestParams();

    if($params["answerIsOpen"] != 0){
      $qSeed = $params["seed"];
      $qAmt = $params["questionAmount"];
      $qTopics = $params["topics"];
      $retrievedA = $testModeDb->getUserAnswer($username, $password);
      if($retrievedA == false) return;
      for($n=0; $n<count($retrievedA);$n++) {
        $sAnsArr[$n] = $retrievedA[$n];
      }

      getAnswers($qAmt, $qTopics);
    }

    echo json_encode($ansList);
  }

  else if($mode == MODE_TEST_GET_STUDENT_ANSWERS){
    $username = $_GET["username"];
    $password = $_GET["password"];

    $testModeDb = new TestModeDatabase();

    echo json_encode($testModeDb->getUserAnswer($username, $password));
  }

  else if($mode == MODE_ADMIN){
    $password = $_GET["password"];

    $adminDb = new AdminDatabase();

    echo $adminDb->validate($password)? 1:0;
  }

  else if($mode == MODE_ADMIN_GET_CONFIG){
    $password = $_GET["password"];

    $adminDb = new AdminDatabase();

    $config = json_encode($adminDb->getConfig($password));

    echo $config;
  }

  else if($mode == MODE_ADMIN_EDIT_CONFIG){
    $password = $_GET["password"];
    $params = array();

    $adminDb = new AdminDatabase();

    if(isset($_GET["seed"])) $params["seed"] = $_GET["seed"];
    if(isset($_GET["topics"])) $params["topics"] = explode(",", $_GET["topics"]);
    if(isset($_GET["questionAmount"])) $params["questionAmount"] = $_GET["questionAmount"];
    if(isset($_GET["timeLimit"])) $params["timeLimit"] = $_GET["timeLimit"];
    if(isset($_GET["maxAttemptCount"])) $params["maxAttemptCount"] = $_GET["maxAttemptCount"];
    if(isset($_GET["testIsOpen"])) $params["testIsOpen"] = $_GET["testIsOpen"];
    if(isset($_GET["answerIsOpen"])) $params["answerIsOpen"] = $_GET["answerIsOpen"];

    $adminDb->editConfig($params, $password);
  }

  else if($mode == MODE_ADMIN_RESET_ATTEMPT){
    $password = $_GET["password"];
    $username = $_GET["username"];

    $adminDb = new AdminDatabase();

    echo $adminDb->resetAttempt($username, $password)? 1:0;
  }

  else if($mode == MODE_GET_SCOREBOARD){
    $testModeDb = new TestModeDatabase();

    echo json_encode($testModeDb->getScoreboard());
  }

  else{
    echo "Your request will be processed shortly...";
  }
?>