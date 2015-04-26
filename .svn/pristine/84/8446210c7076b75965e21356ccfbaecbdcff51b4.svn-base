<?php

require_once 'QuestionGeneratorInterface.php';

  class SsspQuestionGenerator{
    protected $checkAnswerFunctionList = array(
      QUESTION_TYPE_GREATER_LESS => "checkAnswerGreaterLess",
  	  QUESTION_TYPE_PATH => "checkAnswerPath",
  	  QUESTION_TYPE_PATH_WEIGHT => "checkAnswerPathWeight",
    );

    protected $getAnswerFunctionList = array(
      QUESTION_TYPE_GREATER_LESS => "getAnswerGreaterLess",
      QUESTION_TYPE_PATH => "getAnswerPath",
      QUESTION_TYPE_PATH_WEIGHT => "getAnswerPathWeight",
    );

    public function __construct(){
    }

    public function generateQuestion($amt){
      $questions = array();
      $potentialQuestions = $this->generatePotentialQuestions();

      for($i = 0; $i < $amt; $i++){
        if(count($potentialQuestions) == 0) $potentialQuestions = $this->generatePotentialQuestions();

        $questionIndex = rand(0, count($potentialQuestions) - 1);
        $questionFunc = $potentialQuestions[$questionIndex];

        $questions[] = $this->$potentialQuestions[$questionIndex]();

        unset($potentialQuestions[$questionIndex]);
        $potentialQuestions = array_values($potentialQuestions);
      }

      return $questions;
    }

    protected function generatePotentialQuestions(){
      $potentialQuestions = array();

      $potentialQuestions[] = "generateQuestionGreaterLess";
      $potentialQuestions[] = "generateQuestionPath";
      $potentialQuestions[] = "generateQuestionPathWeight";

      return $potentialQuestions;
    }

    public function getAnswer($qObj){
      if(array_key_exists($qObj->qType, $this->getAnswerFunctionList)){
        $answerFunc = $this->getAnswerFunctionList[$qObj->qType];
        return $this->$answerFunc($qObj);
      }
      else return false;
    }

    public function checkAnswer($qObj, $userAns){
      if(array_key_exists($qObj->qType, $this->checkAnswerFunctionList)){
        $verifierFunc = $this->checkAnswerFunctionList[$qObj->qType];
        return $this->$verifierFunc($qObj, $userAns);
      }
      else return false;
    }

    protected function generateSSSP(){
      $sssp = new SSSP();
      return $sssp;
    }

    protected function generateQuestionGreaterLess(){
      $sssp = $this->generateSSSP();
      $greaterLess = array("greater", "less");
      $greaterLessIndex = rand(0,1);
      $ssspContent = $sssp->getAllElements();
        $startValue = $ssspContent[rand(0, count($ssspContent)-1)];
      $longestSP = 0;
      $ssspAns = $sssp->sssp($startValue);
      for($i=0; $i<count($ssspAns); $i++) {
        if($ssspAns[$i] != INFINITY && $ssspAns[$i]>$longestSP) {
          $longestSP = $ssspAns[$i];
        }
      }
      $bound = floor($longestSP/2);
	  
      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_SSSP;
      $qObj->qType = QUESTION_TYPE_GREATER_LESS;
      $qObj->qParams = array("greaterless" => $greaterLess[$greaterLessIndex], "value" => $bound, "source" => $startValue);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $sssp->toGraphState();
      $qObj->internalDS = $sssp;

      return $qObj;
    }

    protected function getAnswerGreaterLess($qObj){
      $sssp = $qObj->internalDS;
      $greaterLess = $qObj->qParams["greaterless"];
      $bound = $qObj->qParams["value"];
      $startValue = $qObj->qParams["source"];
    
      $ssspAns = $sssp->sssp($startValue);
      $ans = array();
      for($i=0; $i<count($ssspAns); $i++) {
        if($greaterLess == "greater" && $ssspAns[$i] > $bound && $ssspAns[$i] != INFINITY) {
          $ans[] = $i;
        } else if ($greaterLess == "less" && $ssspAns[$i] < $bound) {
          $ans[] = $i;
        }
      }

      return $ans;
    }

    protected function checkAnswerGreaterLess($qObj, $userAns){
      $ans = $this->getAnswer($qObj);

      sort($userAns);
      sort($ans);
	  
      $correctness = true;
      if(count($ans) != count($userAns)) $correctness = false;
      else{
        for($i = 0; $i < count($ans); $i++){
          if($ans[$i] != $userAns[$i]){
            $correctness = false;
            break;
          }
        }
      }

      return $correctness;
    }
	
    protected function generateQuestionPath(){
      $sssp = $this->generateSSSP();
  	  $ssspContent = $sssp->getAllElements();
      $startValue = $ssspContent[rand(0, count($ssspContent)-1)];
  	  $destValue = $ssspContent[rand(0, count($ssspContent)-1)];
	  
      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_SSSP;
      $qObj->qType = QUESTION_TYPE_PATH;
      $qObj->qParams = array("source" => $startValue, "value" => $destValue);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = true;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $sssp->toGraphState();
      $qObj->internalDS = $sssp;

      return $qObj;
    }

    protected function getAnswerPath($qObj){
      $sssp = $qObj->internalDS;
      $startValue = $qObj->qParams["source"];
      $destValue = $qObj->qParams["value"];
      $ans = $sssp->path($startValue, $destValue);

      return $ans;
    }

    protected function checkAnswerPath($qObj, $userAns){
      $ans = $this->getAnswer($qObj);
	  
      sort($userAns);
      sort($ans);
	  	  
      $correctness = true;
      if(count($ans) != count($userAns)) $correctness = false;
      else{
        for($i = 0; $i < count($ans); $i++){
          if($ans[$i] != $userAns[$i]){
            $correctness = false;
            break;
          }
        }
      }

      return $correctness;
    }
	
	protected function generateQuestionPathWeight(){
      $sssp = $this->generateSSSP();
  	  $ssspContent = $sssp->getAllElements();
      $startValue = $ssspContent[rand(0, count($ssspContent)-1)];
  	  $destValue = $ssspContent[rand(0, count($ssspContent)-1)];
	  
      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_SSSP;
      $qObj->qType = QUESTION_TYPE_PATH_WEIGHT;
      $qObj->qParams = array("source" => $startValue, "value" => $destValue);
      $qObj->aType = ANSWER_TYPE_FILL_BLANKS;
      $qObj->aAmt = ANSWER_AMT_SINGLE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $sssp->toGraphState();
      $qObj->internalDS = $sssp;

      return $qObj;
    }

    protected function getAnswerPathWeight($qObj){
      $sssp = $qObj->internalDS;
      $startValue = $qObj->qParams["source"];
      $destValue = $qObj->qParams["value"];
      $ssspAns = $sssp->sssp($startValue);
      $ans = array();
      if($ssspAns[$destValue] != INFINITY) {
        $ans = $ssspAns[$destValue];
      }

      return $ans;
    }

    protected function checkAnswerPathWeight($qObj, $userAns){
      $ans = $this->getAnswer($qObj);
      return ($ans == $userAns[0]);
    }
  }

?>