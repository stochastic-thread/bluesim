<?php

class GraphTraversal {
	
	protected $adjList; //array of arrays of pairs (use Pair class from MST)
	protected $graphTemplate;
	protected $size;
	protected $directed;
	protected $connected;
	
	public function __construct($d, $c){
		$this->directed = $d;
		$this->connected = $c;
		$this->init();
    }
	
	protected function init() {
		$this->size = rand(6,10);
		$this->graphTemplate = GraphTemplate::getGraph(array("numVertex" => $this->size, "directed" => $this->directed, "connected" => $this->connected));
		$this->adjList = generateAdjList($this->graphTemplate); //array of array of Pairs
	}
	
	public function clearAll() {
		$this->init();
	}
	
	public function getAllElements() {
		return array_keys($this->adjList);
	}
	
	public function toGraphState(){
		return GraphTemplate::createState($this->graphTemplate, array("displayWeight" => false, "directed" => $this->directed));
    }
	
	//returns an array of integers - the BFS traversal order
	public function BFS($start) {
		$Q = array();
		$visited = array();
		$keys = $this->getAllElements();
		for($i=0; $i<count($keys); $i++) {
			$visited[$keys[$i]] = false;
		}
		$traversal = array();
		
		$Q[] = $start;
		while(!empty($Q)) {
			$u = array_shift($Q);
			if(!$visited[$u]) {
				$visited[$u] = true;
				$traversal[] = $u;
				$nNeighbours = count($this->adjList[$u]);
				for($i=0; $i<$nNeighbours; $i++) {
					$v = $this->adjList[$u][$i]->v();
					$Q[] = $v;
				}
			}
		}
		return $traversal;
	}
	
	//returns an array of integers - the DFS traversal order
	public function DFS($start) {
		$stack = array();
		$visited = array();
		$keys = $this->getAllElements();
		for($i=0; $i<count($keys); $i++) {
			$visited[$keys[$i]] = false;
		}
		$traversal = array();
		
		$stack[] = $start;
		while(!empty($stack)) {
			$u = array_pop($stack);
			if(!$visited[$u]) {
				$visited[$u] = true;
				$traversal[] = $u;
				$nNeighbours = count($this->adjList[$u]);
				for($i=($nNeighbours-1); $i>=0; $i--) {
					$v = $this->adjList[$u][$i]->v();
					$stack[] = $v;
				}
			}
		}
		return $traversal;
	}
	
	//returns an array of integers - the vertices that when removed, will cause a disconnect
	public function disconnect() {		
		$ans = array();
		
		$keys = $this->getAllElements();
		for($i=0; $i<count($keys); $i++) { //for each vertex
			$ignore = $keys[$i];
			//do dfs on the graph without this vertex (virtually remove this vertex from the graph)
			$stack = array();
			$visited = array();
			$traversal = array();
			for($j=0; $j<count($keys); $j++) {
				$visited[$keys[$j]] = false;
			}
			if($i == 0) {
				$stack[] = $keys[count($keys)-1];
			} else {
				$stack[] = $keys[0];
			}
			while(!empty($stack)) {
				$u = array_pop($stack);
				if(!$visited[$u] && $u != $ignore) { //add extra condition to ignore this vertex
					$visited[$u] = true;
					$traversal[] = $u;
					$nNeighbours = count($this->adjList[$u]);
					for($k=($nNeighbours-1); $k>=0; $k--) {
						$v = $this->adjList[$u][$k]->v();
						$stack[] = $v;
					}
				}
			}
			if(count($traversal) < (count($keys)-1)) { //causes disconnect
				$ans[] = $ignore;
			}
		}
		return $ans;
	}
	
}

?>