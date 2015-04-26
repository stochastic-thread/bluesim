<?php

  require_once 'QuestionGeneratorInterface.php';

  class MstQuestionGenerator{
    protected $checkAnswerFunctionList = array(
        QUESTION_TYPE_PRIM_SEQUENCE => "checkAnswerPrimSequence",
        QUESTION_TYPE_KRUSKAL_SEQUENCE => "checkAnswerKruskalSequence",
        QUESTION_TYPE_MINIMAX_EDGE => "checkAnswerMinimaxEdge",
        );

    protected $getAnswerFunctionList = array(
        QUESTION_TYPE_PRIM_SEQUENCE => "getAnswerPrimSequence",
        QUESTION_TYPE_KRUSKAL_SEQUENCE => "getAnswerKruskalSequence",
        QUESTION_TYPE_MINIMAX_EDGE => "getAnswerMinimaxEdge",
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

      $potentialQuestions[] = "generateQuestionPrimSequence";
      $potentialQuestions[] = "generateQuestionKruskalSequence";
      $potentialQuestions[] = "generateQuestionMinimaxEdge";

      return $potentialQuestions;
    }

    public function checkAnswer($qObj, $userAns){
      if(array_key_exists($qObj->qType, $this->checkAnswerFunctionList)){
        $verifierFunc = $this->checkAnswerFunctionList[$qObj->qType];
        return $this->$verifierFunc($qObj, $userAns);
      }
      else return false;
    }

    public function getAnswer($qObj){
      if(array_key_exists($qObj->qType, $this->getAnswerFunctionList)){
        $answerFunc = $this->getAnswerFunctionList[$qObj->qType];
        return $this->$answerFunc($qObj);
      }
      else return false;
    }

    protected function generateMinST(){
      $mst = new MST(true);
      return $mst;
    }

    protected function generateMaxST(){
      $mst = new MST(false);
      return $mst;
    }

    protected function generateQuestionPrimSequence(){
      $mst = $this->generateMinST();
      $mstContent = $mst->getAllElements();
      $startValue = $mstContent[rand(0, count($mstContent)-1)];
      $amtEdge = rand((int)(count($mstContent)/2), count($mstContent)-1);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_MST;
      $qObj->qType = QUESTION_TYPE_PRIM_SEQUENCE;
      $qObj->qParams = array("value" => $startValue, "amt" => $amtEdge,"subtype" => QUESTION_SUB_TYPE_NONE, "directed" => false);
      $qObj->aType = ANSWER_TYPE_EDGE;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = true;
      $qObj->allowNoAnswer = false;
      $qObj->graphState = $mst->toGraphState();
      $qObj->internalDS = $mst;

      return $qObj;
    }

    protected function getAnswerPrimSequence($qObj){
      $mst = $qObj->internalDS;
      $startValue = $qObj->qParams["value"];
      $amtEdge = $qObj->qParams["amt"];
      $rawAns = $mst->prim($startValue);
      $rawAns = array_slice($rawAns, 0, $amtEdge);
  	  $ans= array();
  	  for($i=0; $i<count($rawAns); $i++) {
  		  $ans[] = $rawAns[$i]->from();
        $ans[] = $rawAns[$i]->to();
  	  }
      return $ans;
    }

    protected function checkAnswerPrimSequence($qObj, $userAns){
      $ans = $this->getAnswer($qObj);

      $correctness = true;
      if(count($ans) != count($userAns)) $correctness = false;
      else{
        for($i = 0; $i < count($ans); $i+=2){
          $vA = $ans[$i]; $vB = $ans[$i+1]; //ans key
          $uA = $userAns[$i]; $uB = $userAns[$i+1]; //user ans
          if(!(($vA==$uA && $vB==$uB)||($vA==$uB && $vB==$uA))){
            $correctness = false;
            break;
          }
        }
      }

      return $correctness;
    }

    protected function generateQuestionKruskalSequence(){
      $mst = $this->generateMinST();
      $mstContent = $mst->getAllElements();
      $amtEdge = rand((int)(count($mstContent)/2), count($mstContent)-1);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_MST;
      $qObj->qType = QUESTION_TYPE_KRUSKAL_SEQUENCE;
      $qObj->qParams = array("amt" => $amtEdge, "subtype" => QUESTION_SUB_TYPE_NONE, "directed" => false);
      $qObj->aType = ANSWER_TYPE_EDGE;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = true;
      $qObj->allowNoAnswer = false;
      $qObj->graphState = $mst->toGraphState();
      $qObj->internalDS = $mst;

      return $qObj;
    }

    protected function getAnswerKruskalSequence($qObj){
      $mst = $qObj->internalDS;
      $rawAns = $mst->kruskal();
      $amtEdge = $qObj->qParams["amt"];
      $rawAns = array_slice($rawAns, 0, $amtEdge);

      $ans= array();
      for($i=0; $i<count($rawAns); $i++) {
        $ans[] = $rawAns[$i]->from();
        $ans[] = $rawAns[$i]->to();
      }

      return $ans;
    }

    protected function checkAnswerKruskalSequence($qObj, $userAns){
      $ans = $this->getAnswer($qObj);

      $correctness = true;
      if(count($ans) != count($userAns)) $correctness = false;
      else{
        for($i = 0; $i < count($ans); $i+=2){
          $vA = $ans[$i]; $vB = $ans[$i+1]; //ans key
          $uA = $userAns[$i]; $uB = $userAns[$i+1]; //user ans
          if(!(($vA==$uA && $vB==$uB)||($vA==$uB && $vB==$uA))){
            $correctness = false;
            break;
          }
        }
      }

      return $correctness;
    }

    protected function generateQuestionMinimaxEdge(){
      $subtypeArr = array(QUESTION_SUB_TYPE_MINST, QUESTION_SUB_TYPE_MAXST);
      $minMax = rand(0,1);
      if($minMax == 0) {
        $mst = $this->generateMinST();
      } else {
        $mst = $this->generateMaxST();
      }
      $mstContent = $mst->getAllElements();
      $vertexAIndex = rand(0, count($mstContent)-1);
      $vertexA = $mstContent[$vertexAIndex];
      unset($mstContent[$vertexAIndex]);
      $mstContent = array_values($mstContent);
      $vertexB = $mstContent[rand(0, count($mstContent)-1)];

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_MST;
      $qObj->qType = QUESTION_TYPE_MINIMAX_EDGE;
      $qObj->qParams = array("vertexA" => $vertexA, "vertexB" => $vertexB,"subtype" => $subtypeArr[$minMax], "opp" => $subtypeArr[1-$minMax], "directed" => false);
      $qObj->aType = ANSWER_TYPE_EDGE;
      $qObj->aAmt = ANSWER_AMT_ONE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = false;
      $qObj->graphState = $mst->toGraphState();
      $qObj->internalDS = $mst;

      return $qObj;
    }

    protected function getAnswerMinimaxEdge($qObj){
      $mst = $qObj->internalDS;
      $vertexA = $qObj->qParams["vertexA"];
      $vertexB = $qObj->qParams["vertexB"];
      $rawAns = $mst->minimax($vertexA, $vertexB);
      $ans = array();
      $ans[] = $rawAns->from(); $ans[] = $rawAns->to();

      return $ans;
    }

    protected function checkAnswerMinimaxEdge($qObj, $userAns){
      $ans = $this->getAnswer($qObj);

      $correctness = true;
      $vA = $ans[0]; $vB = $ans[1]; //ans key
      $uA = $userAns[0]; $uB = $userAns[1]; //user ans
      if(!(($vA==$uA && $vB==$uB)||($vA==$uB && $vB==$uA))){
        $correctness = false;
      }

      return $correctness;
    }
  }

?>