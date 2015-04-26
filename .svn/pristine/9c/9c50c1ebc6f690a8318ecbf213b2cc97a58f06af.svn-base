<?php

	require_once 'QuestionGeneratorInterface.php';

	class GraphdsQuestionGenerator implements QuestionGeneratorInterface{
		protected $checkAnswerFunctionList = array(
			QUESTION_TYPE_DS_SIZE => "checkAnswerDsSize",
			QUESTION_TYPE_NEIGHBOURS => "checkAnswerNeighbours",
			QUESTION_TYPE_NONZERO => "checkAnswerNonzero"
			);

		protected $getAnswerFunctionList = array(
			QUESTION_TYPE_DS_SIZE => "getAnswerDsSize",
			QUESTION_TYPE_NEIGHBOURS => "getAnswerNeighbours",
			QUESTION_TYPE_NONZERO => "getAnswerNonzero"
			);

		//constructor
		public function __construct(){
		}
		
		//interface functions
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
	
			$potentialQuestions[] = "generateQuestionDsSize";
			$potentialQuestions[] = "generateQuestionNeighbours";
			$potentialQuestions[] = "generateQuestionNonzero";

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

		protected function generateGraph($weighted, $directed, $connected){
			$size = rand(2,9);
			$graphTemplate = GraphTemplate::getGraph(array("numVertex" => $size, "weighted" => $weighted, "directed" => $directed, "connected" => $connected));
			return $graphTemplate;
		}

		protected function toGraphState($graphTemplate, $weighted, $directed) {
			return GraphTemplate::createState($graphTemplate, array("displayWeight" => $weighted, "directed" => $directed));
		}
		
		//each question type generator and checker
		protected function generateQuestionDsSize() {
			$w = rand(0,1);
			$d = false; //later change to rand(0,1) when we have better directed graph templates
			$c = rand(0,1);
			$graphTemplate = $this->generateGraph($w, $d, $c); //returns a graph template
			$qObj = new QuestionObject();
			$qObj->qTopic = QUESTION_TOPIC_GRAPH_DS;
			$qObj->qType = QUESTION_TYPE_DS_SIZE;
			$qObj->qParams = array();
			$qObj->aType = ANSWER_TYPE_FILL_BLANKS;
			$qObj->aAmt = ANSWER_AMT_ONE;
			$qObj->ordered = false;
			$qObj->allowNoAnswer = false;
			$qObj->graphState = $this->toGraphState($graphTemplate, $w, $d);
			$qObj->internalDS = $graphTemplate;
		
			return $qObj;
		}

		protected function getAnswerDsSize($qObj){
			$graphTemplate = $qObj->internalDS;
			$nVertices = count(array_keys($graphTemplate["internalAdjList"]));
			$ans = $nVertices*$nVertices;
			return $ans;
		}
		
		protected function checkAnswerDsSize($qObj, $userAns) {
			$ans = $this->getAnswer($qObj);

			return ($userAns[0] == $ans);
		}

		protected function generateQuestionNeighbours() {
			$w = rand(0,1);
			$d = false; //later change to rand(0,1) when we have better directed graph templates
			$c = rand(0,1);
			$graphTemplate = $this->generateGraph($w, $d, $c); //returns a graph template
			$graphContent = array_keys(generateAdjList($graphTemplate));
			$v = $graphContent[rand(0, count($graphContent)-1)];

			$qObj = new QuestionObject();
			$qObj->qTopic = QUESTION_TOPIC_GRAPH_DS;
			$qObj->qType = QUESTION_TYPE_NEIGHBOURS;
			$qObj->qParams = array("value" => $v);
			$qObj->aType = ANSWER_TYPE_VERTEX;
			$qObj->aAmt = ANSWER_AMT_MULTIPLE;
			$qObj->ordered = false;
			$qObj->allowNoAnswer = true;
			$qObj->graphState = $this->toGraphState($graphTemplate, $w, $d);
			$qObj->internalDS = $graphTemplate;
		
			return $qObj;
		}

		protected function getAnswerNeighbours($qObj){
			$graphTemplate = $qObj->internalDS;
			$v = $qObj->qParams["value"];
			$adjList = generateAdjList($graphTemplate);
			$ans = array();

			$thisrow = $adjList[$v];
			for($i=0; $i<count($thisrow); $i++) {
				$ans[] = $thisrow[$i]->v();
			}
			return $ans;
		}
		
		protected function checkAnswerNeighbours($qObj, $userAns) {
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
		
		protected function generateQuestionNonzero() {
			$w = rand(0,1);
			$d = false; //later change to rand(0,1) when we have better directed graph templates
			$c = rand(0,1);
			$graphTemplate = $this->generateGraph($w, $d, $c); //returns a graph template
			$qObj = new QuestionObject();
			$qObj->qTopic = QUESTION_TOPIC_GRAPH_DS;
			$qObj->qType = QUESTION_TYPE_NONZERO;
			$qObj->qParams = array();
			$qObj->aType = ANSWER_TYPE_FILL_BLANKS;
			$qObj->aAmt = ANSWER_AMT_ONE;
			$qObj->ordered = false;
			$qObj->allowNoAnswer = false;
			$qObj->graphState = $this->toGraphState($graphTemplate, $w, $d);
			$qObj->internalDS = $graphTemplate;
		
			return $qObj;
		}

		protected function getAnswerNonzero($qObj){
			$graphTemplate = $qObj->internalDS;
			$edgeList = generateEdgeList($graphTemplate);
			$nEdges = count($edgeList);
			$ans = 2*$nEdges;
			return $ans;
		}
		
		protected function checkAnswerNonzero($qObj, $userAns) {
			$ans = $this->getAnswer($qObj);

			return ($userAns[0] == $ans);
		}
	}
?>