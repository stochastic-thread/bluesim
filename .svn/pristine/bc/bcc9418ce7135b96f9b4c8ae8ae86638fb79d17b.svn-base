<?php

  require_once 'QuestionGeneratorInterface.php';

  class HeapQuestionGenerator implements QuestionGeneratorInterface{
    protected $checkAnswerFunctionList = array(
      QUESTION_TYPE_EXTRACT => "checkAnswerExtract",
      QUESTION_TYPE_INSERTION => "checkAnswerInsertion",
      QUESTION_TYPE_HEAPIFY => "checkAnswerHeapify",
      QUESTION_TYPE_HEAP_SORT => "checkAnswerHeapSort",
      QUESTION_TYPE_ROOT => "checkAnswerRoot",
      QUESTION_TYPE_LEAVES => "checkAnswerLeaves",
      QUESTION_TYPE_INTERNAL => "checkAnswerInternal",
      QUESTION_TYPE_GREATER_LESS => "checkAnswerGreaterLess",
      QUESTION_TYPE_RELATIONS => "checkAnswerRelations",
      QUESTION_TYPE_IS_HEAP => "checkAnswerIsHeap"
      );

    protected $getAnswerFunctionList = array(
      QUESTION_TYPE_EXTRACT => "getAnswerExtract",
      QUESTION_TYPE_INSERTION => "getAnswerInsertion",
      QUESTION_TYPE_HEAPIFY => "getAnswerHeapify",
      QUESTION_TYPE_HEAP_SORT => "getAnswerHeapSort",
      QUESTION_TYPE_ROOT => "getAnswerRoot",
      QUESTION_TYPE_LEAVES => "getAnswerLeaves",
      QUESTION_TYPE_INTERNAL => "getAnswerInternal",
      QUESTION_TYPE_GREATER_LESS => "getAnswerGreaterLess",
      QUESTION_TYPE_RELATIONS => "getAnswerRelations",
      QUESTION_TYPE_IS_HEAP => "getAnswerIsHeap"
      );

    public function __construct(){

    }

    public function generateQuestion($amt){
      $questions = array();
      $potentialQuestions = $this->generatePotentialQuestions();
      
      for($i = 0; $i < $amt; $i++){
        $heapSize = rand(HEAP_SIZE_LOWER_BOUND,HEAP_SIZE_UPPER_BOUND);

        if(count($potentialQuestions) == 0) $potentialQuestions = $this->generatePotentialQuestions();

        $questionIndex = rand(0, count($potentialQuestions) - 1);
        $questionFunc = $potentialQuestions[$questionIndex];

        $questions[] = $this->$potentialQuestions[$questionIndex]($heapSize);

        unset($potentialQuestions[$questionIndex]);
        $potentialQuestions = array_values($potentialQuestions);
      }

      return $questions;
    }

    public function generatePotentialQuestions(){
      $potentialQuestions = array();

      $potentialQuestions[] = "generateQuestionExtract";
      $potentialQuestions[] = "generateQuestionInsertion";
      $potentialQuestions[] = "generateQuestionHeapify";
      $potentialQuestions[] = "generateQuestionHeapSort";
      $potentialQuestions[] = "generateQuestionRoot";
      $potentialQuestions[] = "generateQuestionLeaves";
      $potentialQuestions[] = "generateQuestionInternal";
      $potentialQuestions[] = "generateQuestionGreaterLess";
      $potentialQuestions[] = "generateQuestionRelations";
      $potentialQuestions[] = "generateQuestionIsHeap";

      return $potentialQuestions;
    }

    public function checkAnswer($qObj, $userAns){
      if(array_key_exists($qObj->qType, $this->checkAnswerFunctionList)){
        $verifierFunc = $this->checkAnswerFunctionList[$qObj->qType];
        return $this->$verifierFunc($qObj, $userAns);
      }
      else return false;

      // if($qObj->qType == QUESTION_TYPE_EXTRACT) return $this->checkAnswerExtract($qObj, $userAns);
      // else if($qObj->qType == QUESTION_TYPE_INSERTION) return $this->checkAnswerInsertion($qObj, $userAns);
      // else if($qObj->qType == QUESTION_TYPE_HEAPIFY) return $this->checkAnswerHeapify($qObj, $userAns);
      // else if($qObj->qType == QUESTION_TYPE_HEAP_SORT) return $this->checkAnswerHeapSort($qObj, $userAns);
      // else if($qObj->qType == QUESTION_TYPE_ROOT) return $this->checkAnswerRoot($qObj, $userAns);
      // else if($qObj->qType == QUESTION_TYPE_LEAVES) return $this->checkAnswerLeaves($qObj, $userAns);
      // else if($qObj->qType == QUESTION_TYPE_INTERNAL) return $this->checkAnswerInternal($qObj, $userAns);
      // else if($qObj->qType == QUESTION_TYPE_GREATER_LESS) return $this->checkAnswerGreaterLess($qObj, $userAns);
      // else if($qObj->qType == QUESTION_TYPE_RELATIONS) return $this->checkAnswerRelations($qObj, $userAns);
      // else if($qObj->qType == QUESTION_TYPE_IS_HEAP) return $this->checkAnswerIsHeap($qObj, $userAns);
      // else return false;
    }

    public function getAnswer($qObj){
      if(array_key_exists($qObj->qType, $this->getAnswerFunctionList)){
        $answerFunc = $this->getAnswerFunctionList[$qObj->qType];
        return $this->$answerFunc($qObj);
      }
      else return false;
    }

    protected function generateMinHeap(){
      $heap = new Heap(true);
      // $seed = rand();
      // $heap->seedRng($seed);
      return $heap;
    }

    protected function generateMaxHeap(){
      $heap = new Heap(false);
      // $seed = rand();
      // $heap->seedRng($seed);
      return $heap;
    }

    protected function isNoAnswer($userAns){
      return $userAns[0] == NO_ANSWER;
    }

    protected function isUnanswered($userAns){
      return $userAns[0] == UNANSWERED;
    }

    protected function generateQuestionInsertion($heapSize){
      $heap = $this->generateMaxHeap();
      $heap->buildRandomHeap($heapSize);
      $heapContent = $heap->getAllElements();
      $varToBeInserted = $heapContent[0];
      while(in_array($varToBeInserted, $heapContent)){
        $varToBeInserted = rand(HEAP_RANGE_LOWER_BOUND,HEAP_RANGE_UPPER_BOUND);
      }

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_HEAP;
      $qObj->qType = QUESTION_TYPE_INSERTION;
      $qObj->qParams = array("value" => $varToBeInserted,"subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = true;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $heap->toGraphState();
      $qObj->internalDS = $heap;

      return $qObj;
    }

    protected function getAnswerInsertion($qObj){
      $heap = $qObj->internalDS;
      $varToBeInserted = $qObj->qParams["value"];
      $ans = $heap->insert($varToBeInserted);
      
      return $ans;
    }

    protected function checkAnswerInsertion($qObj, $userAns){
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

    protected function generateQuestionExtract($heapSize){
      $heap = $this->generateMaxHeap();
      $heap->buildRandomHeap($heapSize);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_HEAP;
      $qObj->qType = QUESTION_TYPE_EXTRACT;
      $qObj->qParams = array("subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = true;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $heap->toGraphState();
      $qObj->internalDS = $heap;

      return $qObj;
    }

    protected function getAnswerExtract($qObj){
      $heap = $qObj->internalDS;
      $ans = $heap->extractMax();

      return $ans;
    }

    protected function checkAnswerExtract($qObj, $userAns){
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

    protected function generateQuestionHeapSort($heapSize){
      $heap = $this->generateMaxHeap();
      $heap->buildRandomHeap($heapSize);
      $heapContent = $heap->getAllElements();
      $amt = rand(1, count($heapContent)-2);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_HEAP;
      $qObj->qType = QUESTION_TYPE_HEAP_SORT;
      $qObj->qParams = array("amt" => $amt, "subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = false;
      $qObj->graphState = $heap->toGraphState();
      $qObj->internalDS = $heap;

      return $qObj;
    }

    protected function getAnswerHeapSort($qObj){
      $heap = $qObj->internalDS;
      $heap->partialHeapSort($qObj->qParams["amt"]);
      $ans = $heap->getAllElements();
      array_shift($ans);

      return $ans;
    }

    protected function checkAnswerHeapSort($qObj, $userAns){
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

    protected function generateQuestionHeapify($heapSize){
      $heap = $this->generateMaxHeap();
      $heap->buildUnshiftedHeap($heapSize);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_HEAP;
      $qObj->qType = QUESTION_TYPE_HEAPIFY;
      $qObj->qParams = array("subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $heap->toGraphState();
      $qObj->internalDS = $heap;

      return $qObj;
    }

    protected function getAnswerHeapify($qObj){
      $heap = $qObj->internalDS;
      $heapContent = $heap->getAllElements();
      array_shift($heapContent);
      $newHeap = new Heap($heap->isMin());
      $ans = $newHeap->heapify($heapContent);

      return $ans;
    }

    protected function checkAnswerHeapify($qObj, $userAns){
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
	
    protected function generateQuestionRoot($heapSize){
      $heap = $this->generateMaxHeap();
      $heap->buildRandomHeap($heapSize);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_HEAP;
      $qObj->qType = QUESTION_TYPE_ROOT;
      $qObj->qParams = array("subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_ONE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = false;
      $qObj->graphState = $heap->toGraphState();
      $qObj->internalDS = $heap;

      return $qObj;
    }

    protected function getAnswerRoot($qObj){
      $heap = $qObj->internalDS;
      $ans = $heap->getRoot();

      return $ans;
    }

    protected function checkAnswerRoot($qObj, $userAns){
      $ans = $this->getAnswer($qObj);

      return ($userAns[0] == $ans);
    }
	
	protected function generateQuestionLeaves($heapSize){
      $heap = $this->generateMaxHeap();
      $heap->buildRandomHeap($heapSize);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_HEAP;
      $qObj->qType = QUESTION_TYPE_LEAVES;
      $qObj->qParams = array("subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = false;
      $qObj->graphState = $heap->toGraphState();
      $qObj->internalDS = $heap;

      return $qObj;
    }

    protected function getAnswerLeaves($qObj){
      $heap = $qObj->internalDS;
      $ans = $heap->getLeaves();

      return $ans;
    }

    protected function checkAnswerLeaves($qObj, $userAns){
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
	
	protected function generateQuestionInternal($heapSize){
      $heap = $this->generateMaxHeap();
      $heap->buildRandomHeap($heapSize);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_HEAP;
      $qObj->qType = QUESTION_TYPE_INTERNAL;
      $qObj->qParams = array("subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $heap->toGraphState();
      $qObj->internalDS = $heap;

      return $qObj;
    }

    protected function getAnswerInternal($qObj){
      $heap = $qObj->internalDS;
      $ans = $heap->getInternal();

      return $ans;
    }

    protected function checkAnswerInternal($qObj, $userAns){
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

    protected function generateQuestionGreaterLess($heapSize){
      $heap = $this->generateMaxHeap();
      $heap->buildRandomHeap($heapSize);
      $valIndex = rand(1, $heap->size());
      $val = $heap->getElementAtIndex($valIndex);
      $greaterLess = array("greater", "less");
      $greaterLessIndex = rand(0,1);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_HEAP;
      $qObj->qType = QUESTION_TYPE_GREATER_LESS;
      $qObj->qParams = array("subtype" => QUESTION_SUB_TYPE_MAX_HEAP, "value" => $val, "greaterless" => $greaterLess[$greaterLessIndex]);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_MULTIPLE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $heap->toGraphState();
      $qObj->internalDS = $heap;

      return $qObj;
    }

    protected function getAnswerGreaterLess($qObj){
      $heap = $qObj->internalDS;
      $val = $qObj->qParams["value"];
      $subtype = $qObj->qParams["subtype"];
      $greaterLess = $qObj->qParams["greaterless"];
    
      $all = $heap->getAllElements();
      sort($all);
      $indexof = array_search($val, $all);
      $ans;
      if($greaterLess == "greater") {
        $ans = array_slice($all, $indexof+1);
        $ans = array_slice($ans, 0, count($ans)-1); //to get rid of the inf
      } else if($greaterLess == "less"){
        $ans = array_slice($all, 0, $indexof);
      }

      return $ans;
    }

    protected function checkAnswerGreaterLess($qObj, $userAns){
      $ans = $this->getAnswer($qObj);
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
	
	protected function generateQuestionRelations($heapSize){
      $heap = $this->generateMaxHeap();
      $amt = rand(8,15);
      $heap->buildRandomHeap($amt);
      $valIndex = rand(1, $heap->size());
      $val = $heap->getElementAtIndex($valIndex);
      $relationsArr = array("parent", "left child", "right child");
      $relation = rand(0,2);

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_HEAP;
      $qObj->qType = QUESTION_TYPE_RELATIONS;
      $qObj->qParams = array("subtype" => QUESTION_SUB_TYPE_MAX_HEAP, "value" => $val, "relation" => $relationsArr[$relation]);
      $qObj->aType = ANSWER_TYPE_VERTEX;
      $qObj->aAmt = ANSWER_AMT_ONE;
      $qObj->ordered = false;
      $qObj->allowNoAnswer = true;
      $qObj->graphState = $heap->toGraphState();
      $qObj->internalDS = $heap;

      return $qObj;
    }

    protected function getAnswerRelations($qObj){
      $heap = $qObj->internalDS;
      $val = $qObj->qParams["value"];
      $subtype = $qObj->qParams["subtype"];
      $relation = $qObj->qParams["relation"];

      $all = $heap->getAllElements();
      $indexof = array_search($val, $all);
      if($relation == "parent") {
        $ansindex = floor($indexof/2);
      } else if($relation == "left child") {
        $ansindex = $indexof*2;
      } else if($relation == "right child") {
        $ansindex = $indexof*2 + 1;
      }
    
      $ans = array();
      if ($ansindex>0 && $ansindex<(count($all))) {
        $ans = $all[$ansindex];
      }

      return $ans;
    }

    protected function checkAnswerRelations($qObj, $userAns){
      $ans = $this->getAnswer($qObj);

      return ($ans == $userAns[0]);
    }
	
	protected function generateQuestionIsHeap($heapSize){
      $heap = $this->generateMaxHeap();
      $amt = rand(16,31);
      $heap->buildRandomHeap($amt);
      $swap = rand(0,1);
      if($swap) { $heap->swap(); }

      $qObj = new QuestionObject();
      $qObj->qTopic = QUESTION_TOPIC_HEAP;
      $qObj->qType = QUESTION_TYPE_IS_HEAP;
      $qObj->qParams = array("subtype" => QUESTION_SUB_TYPE_MAX_HEAP);
      $qObj->aType = ANSWER_TYPE_MCQ;
      $qObj->aAmt = ANSWER_AMT_ONE;
      $qObj->aParams = array("Valid" => HEAP_SWAP_ANS_VALID, "Invalid" => HEAP_SWAP_ANS_INVALID);
      $qObj->ordered = false;
      $qObj->allowNoAnswer = false;
      $qObj->graphState = $heap->toGraphState();
      $qObj->internalDS = $heap;

      return $qObj;
    }

    protected function getAnswerIsHeap($qObj){
      $heap = $qObj->internalDS;
      $subtype = $qObj->qParams["subtype"];
      $ans = $heap->isHeap()? HEAP_SWAP_ANS_VALID:HEAP_SWAP_ANS_INVALID;

      return $ans;
    }

    protected function checkAnswerIsHeap($qObj, $userAns){
      $ans = $this->getAnswer($qObj);
	  
      return ($ans == $userAns[0]);
    }
	
  }
?>