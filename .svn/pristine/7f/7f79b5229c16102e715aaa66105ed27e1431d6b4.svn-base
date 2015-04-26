<?php

  require_once 'QuestionGeneratorInterface.php';

  class UfdsQuestionGenerator implements QuestionGeneratorInterface{
    protected $checkAnswerFunctionList = array(
      QUESTION_TYPE_FIND_SET_SEQUENCE => "checkAnswerFindSetSequence",
      QUESTION_TYPE_FIND_SET_COMPRESSION => "checkAnswerFindSetCompression",
      QUESTION_TYPE_IS_SAME_SET => "checkAnswerIsSameSet"
      );

    protected $getAnswerFunctionList = array(
      QUESTION_TYPE_FIND_SET_SEQUENCE => "getAnswerFindSetSequence",
      QUESTION_TYPE_FIND_SET_COMPRESSION => "getAnswerFindSetCompression",
      QUESTION_TYPE_IS_SAME_SET => "getAnswerIsSameSet"
      );

    public function __construct(){

    }

    public function generateQuestion($amt){
      $questions = array();
      $potentialQuestions = $this->generatePotentialQuestions();

      for($i = 0; $i < $amt; $i++){
        $ufdsSize = rand(5,15);
        $setAmt = rand(1,$ufdsSize);

        if(count($potentialQuestions) == 0) $potentialQuestions = $this->generatePotentialQuestions();

        $questionIndex = rand(0, count($potentialQuestions) - 1);
        $questionFunc = $potentialQuestions[$questionIndex];

        $questions[] = $this->$potentialQuestions[$questionIndex]($ufdsSize, $setAmt);

        unset($potentialQuestions[$questionIndex]);
        $potentialQuestions = array_values($potentialQuestions);

      }

      return $questions;
    }

    protected function generatePotentialQuestions(){
      $potentialQuestions = array();

      $potentialQuestions[] = "generateQuestionFindSetSequence";
      $potentialQuestions[] = "generateQuestionFindSetCompression";
      $potentialQuestions[] = "generateQuestionIsSameSet";

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

    protected function generateUfds(){

    }

    protected function generateQuestionFindSetSequence($ufdsSize, $setAmt){
      $ufds = new UFDS();
      $ufds->insertElements($ufdsSize, $setAmt);
      $varWhichSetIsToBeFound = rand(0, $ufdsSize-1);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_UFDS;
      $qObj->qType = QUESTION_TYPE_FIND_SET_SEQUENCE;
      $qObj->qParams = array("value" => $varWhichSetIsToBeFound, "subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = true;
      $qObj->allowNoAnswer = false;
      $qObj->graphState = $ufds->toGraphState();
      $qObj->internalDS = $ufds;

      return $qObj;
    }

    protected function getAnswerFindSetSequence($qObj){
      $ufds = $qObj->internalDS;
      $varWhichSetIsToBeFound = $qObj->qParams["value"];
      $ans = $ufds->findSet($varWhichSetIsToBeFound);

      return $ans;
    }

    protected function checkAnswerFindSetSequence($qObj, $userAns){
      $ans = $this->getAnswer($qObj);

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

    protected function generateQuestionFindSetCompression($ufdsSize, $setAmt){
      $ufds = new UFDS();
      $ufds->insertElements($ufdsSize, $setAmt);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_UFDS;
      $qObj->qType = QUESTION_TYPE_FIND_SET_COMPRESSION;
      $qObj->qParams = array("value" => $varWhichSetIsToBeFound, "subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = true;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $ufds->toGraphState();
      $qObj->internalDS = $ufds;

      return $qObj;
    }

    protected function getAnswerFindSetCompression($qObj){
      $ufds = $qObj->internalDS;
      $ufdsContent = $ufds->getAllElements();
      $ans = array();

      foreach($ufdsContent as $key=>$value){
        if(count($ufds->findSetNoPathCompression($key)) > 2){
          $ans[] = $key;
        }
      }

      return $ans;
    }

    protected function checkAnswerFindSetCompression($qObj, $userAns){
      $ans = $this->getAnswer($qObj);

      sort($ans);
      sort($userAns);

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

    protected function generateQuestionIsSameSet($ufdsSize, $setAmt){
      $ufds = new UFDS();
      $ufds->insertElements($ufdsSize, $setAmt);
      $varToTestSameSet = rand(0, $ufdsSize-1);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_UFDS;
      $qObj->qType = QUESTION_TYPE_IS_SAME_SET;
      $qObj->qParams = array("value" => $varToTestSameSet, "subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = true;
      $qObj->allowNoAnswer = false;
      $qObj->graphState = $ufds->toGraphState();
      $qObj->internalDS = $ufds;

      return $qObj;
    }

    protected function getAnswerIsSameSet($qObj){
      $ufds = $qObj->internalDS;
      $ufdsContent = $ufds->getAllElements();
      $varToTestSameSet = $qObj->qParams["value"];
      $ans = array();

      for($i = 0; $i < count($ufdsContent); $i++){
        if($ufds->isSameSet($i, $varToTestSameSet)) $ans[] = $i;
      }

      return $ans;
    }

    protected function checkAnswerIsSameSet($qObj, $userAns){
      $ans = $this->getAnswer($qObj);

      sort($ans);
      sort($userAns);

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

  }
?>