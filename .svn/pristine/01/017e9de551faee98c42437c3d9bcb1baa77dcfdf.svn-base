<?php

  require_once 'QuestionGeneratorInterface.php';

  class GraphTraversalQuestionGenerator{

  	protected $checkAnswerFunctionList = array(
      QUESTION_TYPE_TRAVERSAL => "checkAnswerTraversal",
      QUESTION_TYPE_DISCONNECT => "checkAnswerDisconnect",
      );

    protected $getAnswerFunctionList = array(
      QUESTION_TYPE_TRAVERSAL => "getAnswerTraversal",
      QUESTION_TYPE_DISCONNECT => "getAnswerDisconnect",
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

      $potentialQuestions[] = "generateQuestionTraversal";
      $potentialQuestions[] = "generateQuestionDisconnect";

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

    protected function generateGraphTraversal($d, $c){
      $graphTraversal = new GraphTraversal($d, $c);
      return $graphTraversal;
    }

    protected function generateQuestionTraversal(){
      $directedAngle = rand(1,360);
      $d = ($directedAngle <= 90); //25% directed, 75% undirected
      $connectedAngle = rand(1,360);
      $c = ($connectedAngle <= 180); //50% connected, 50% disconnected
		
      $graphTraversal = $this->generateGraphTraversal($d, $c);
      $subtypeArr = array(QUESTION_SUB_TYPE_BFS, QUESTION_SUB_TYPE_DFS);
      $subtypeIndex = rand(0,1);
      $graphContent = $graphTraversal->getAllElements();
      $startValue = $graphContent[rand(0, count($graphContent)-1)];
	  
      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_GRAPH_TRAVERSAL;
      $qObj->qType = QUESTION_TYPE_TRAVERSAL;
      $qObj->qParams = array("subtype" => $subtypeArr[$subtypeIndex], "value" => $startValue);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = true;
      $qObj->allowNoAnswer = false;
      $qObj->graphState = $graphTraversal->toGraphState();
      $qObj->internalDS = $graphTraversal;

      return $qObj;
    }

    protected function getAnswerTraversal($qObj){
      $graphTraversal = $qObj->internalDS;
      $subtype = $qObj->qParams["subtype"];
      $startValue = $qObj->qParams["value"];
    
      $ans;
      if($subtype == QUESTION_SUB_TYPE_BFS) {
        $ans = $graphTraversal->BFS($startValue);
      } else if ($subtype = QUESTION_SUB_TYPE_DFS){
        $ans = $graphTraversal->DFS($startValue);
      }

      return $ans;
    }

    protected function checkAnswerTraversal($qObj, $userAns){
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
	
  	protected function generateQuestionDisconnect(){
      $graphTraversal = $this->generateGraphTraversal(false, true); //undirected, connected
	  
      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_GRAPH_TRAVERSAL;
      $qObj->qType = QUESTION_TYPE_DISCONNECT;
      $qObj->qParams = array();
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $graphTraversal->toGraphState();
      $qObj->internalDS = $graphTraversal;

      return $qObj;
    }

    protected function getAnswerDisconnect($qObj){
      $graphTraversal = $qObj->internalDS;    
      $ans = $graphTraversal->disconnect();

      return $ans;
    }
	
  	protected function checkAnswerDisconnect($qObj, $userAns){
      $ans = $this->getAnswer($qObj);

      sort($ans);
      sort($userAns);
	  //echo(implode($ans)."<br/>");
	  
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