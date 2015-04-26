<?php

class SSSP {
	
	protected $adjList; //array of arrays of pairs (use Pair class from MST)
	protected $graphTemplate;
	protected $size;
	
	public function __construct(){
		$this->init();
    }
	
	protected function init() {
		$this->size = rand(6,10);
		$this->graphTemplate = GraphTemplate::getGraph(array("numVertex" => $this->size, "directed" => true, "connected" => true));
		$this->adjList = generateAdjList($this->graphTemplate); //array of array of Pairs
	}
	
	public function clearAll() {
		$this->init();
	}
	
	public function getAllElements() {
		return array_keys($this->adjList);
	}
	
	public function toGraphState(){
		return GraphTemplate::createState($this->graphTemplate, array("displayWeight" => true, "directed" => true));
    }
	
	//returns an array of integers
	public function sssp($start) {
		return $this->bellmanFord($start);
	}
	
	//returns an array of integers (SPs starting from $start)
	public function bellmanFord($start) {
		$shortestPath = array(); //from $start
		$parent = array();
		
		//initialize $shortestPath to infinity
		$akeys = $this->getAllElements();
		for($i=0; $i<count($akeys); $i++) {
			$shortestPath[$akeys[$i]] = INFINITY;
		}
		$shortestPath[$start] = 0;
		
		//relax edges
		for($i=1; $i<count($akeys); $i++) { // V-1 times
			//for all edges
			for($iu=0; $iu<count($akeys); $iu++) { //iu goes from 0 to number of vertices-1
				$u = $akeys[$iu]; //u is the key of the vertex
				for($iv=0; $iv<count($this->adjList[$u]); $iv++) { //iv goes from 0 to number of adjacent vertices-1
					$v = $this->adjList[$u][$iv]->v(); //v is the key of the adjacent vertex
					$w = $this->adjList[$u][$iv]->w(); //w is the weight of edge u-->v
					if (($shortestPath[$u] + $w) < $shortestPath[$v]) {
						$shortestPath[$v] = $shortestPath[$u] + $w;
						$parent[$v] = $u;
					}
				}
			}
		}
		//this bellman ford does not look for negative cycles
		return $shortestPath;
	}
	
	//returns an array of integers (path from $start to $end)
	public function path($start, $end) {
		$shortestPath = array(); //from $start
		$parent = array();
		
		//initialize $shortestPath to infinity, and $parent to -1 (no parent)
		$akeys = $this->getAllElements();
		for($i=0; $i<count($akeys); $i++) {
			$shortestPath[$akeys[$i]] = INFINITY;
			$parent[$akeys[$i]] = -1;
		}
		$shortestPath[$start] = 0;
		
		//relax edges
		for($i=1; $i<count($akeys); $i++) { // V-1 times
			//for all edges
			for($iu=0; $iu<count($akeys); $iu++) { //iu goes from 0 to number of vertices-1
				$u = $akeys[$iu]; //u is the key of the vertex
				for($iv=0; $iv<count($this->adjList[$u]); $iv++) { //iv goes from 0 to number of adjacent vertices-1
					$v = $this->adjList[$u][$iv]->v(); //v is the key of the adjacent vertex
					$w = $this->adjList[$u][$iv]->w(); //w is the weight of edge u-->v
					if (($shortestPath[$u] + $w) < $shortestPath[$v]) {
						$shortestPath[$v] = $shortestPath[$u] + $w;
						$parent[$v] = $u;
					}
				}
			}
		}
		//this bellman ford does not look for negative cycles
		
		//find path
		$path = array();
		if($shortestPath[$end] != INFINITY) { //reachable
			$path[] = $end;
			while($parent[$end] != -1) {
				array_unshift($path, $parent[$end]);
				$end = $parent[$end];
			}
		}
		return $path;
	}
	
}

?>