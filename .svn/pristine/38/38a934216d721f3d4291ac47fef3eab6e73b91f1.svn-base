<?php
  
  class MST{
	protected $adjList;
	protected $edgeList;
	protected $graphTemplate;
	protected $size;
    protected $min; // true means the MST is minimum spanning tree

    public function __construct($isMin){
      $this->init();
      $this->min = $isMin;
    }

    public function clearAll(){
		$this->init();
    }

    protected function init(){
		$this->size = rand(6,8);
		$this->graphTemplate = GraphTemplate::getGraph(array("numVertex" => $this->size, "directed" => false, "connected" => true));
		$this->adjList = generateAdjList($this->graphTemplate); //array of array of Pairs
		$this->edgeList = generateEdgeList($this->graphTemplate); //array of triples
    }

    public function toGraphState(){
		return GraphTemplate::createState($this->graphTemplate, array("displayWeight" => true, "directed" => false));
    }
	
	public function getSize() {
		return $this->size;
	}
	
	public function getAllElements() {
		return array_keys($this->adjList);
	}

    public function prim($start){
	  $edgeSet = array(); //empty set
      $vertexSet = array(); //empty set
	  $vertexSet[] = $start; //put starting vertex in set
	  
	  $PQ = array(); //array of triples (from, to, weight)
	  $nNeighbours = count($this->adjList[$start]);
	  for($i=0; $i<$nNeighbours; $i++) { //enqueue neighbours
	  	  $neighbourEdge = new Triple($start, $this->adjList[$start][$i]->v(), $this->adjList[$start][$i]->w());
		  $PQ[] = $neighbourEdge;
	  }
	  usort($PQ, 'tripleSort'); //by weight
	  if(!$this->min) $PQ = array_reverse($PQ);
	  
	  while(!empty($PQ)) {
	    $edge = array_shift($PQ); //edge is a (from, to, weight) triple
		$v = $edge->to();
		if(!in_array($v, $vertexSet)) { //v is not in vertexSet
		  $vertexSet[] = $v; //put it in
		  $edgeSet[] = new Triple($edge->from(), $v, $edge->weight());
		  $nNeighbours = count($this->adjList[$v]);
		  for($i=0; $i<$nNeighbours; $i++) { //and enqueue neighbours
		  	  $neighbourEdge = new Triple($v, $this->adjList[$v][$i]->v(), $this->adjList[$v][$i]->w());
			  $PQ[] = $neighbourEdge;
		  }
		  usort($PQ, 'tripleSort'); //by weight
		  if(!$this->min) $PQ = array_reverse($PQ);
		}
	  }
	  return $edgeSet;
    }

    public function kruskal(){
		$ufds = new UFDS();
		$edgeQ = $this->edgeList;
		$akeys = array_keys($this->adjList);
		for($i=0; $i<count($akeys); $i++) {
			$ufds->insert($akeys[$i]);
		}
		$edgeSet = array();
		usort($edgeQ, 'tripleSort'); //by weight
		if(!$this->min) $edgeQ = array_reverse($edgeQ);
		
		$length = count($edgeQ);
		for($i=0; $i<$length; $i++) {
			$e = array_shift($edgeQ);
			if(!($ufds->isSameSet($e->from(), $e->to()))) { //if does not form cycle
				$edgeSet[] = $e;
				$ufds->unionSet($e->from(), $e->to());
			}
		}
		return $edgeSet;
    }
	
	/*also handles maximin*/
	public function minimax($start, $end) {
		$tree = $this->prim($start); //edge triple list
		//make adj list
		$treeAdj = array();
		for($i=0; $i<count($tree); $i++) { //works for undirected graph only
			$v1 = $tree[$i]->from();
			$v2 = $tree[$i]->to();
			$w = $tree[$i]->weight();
			
			if(!isset($treeAdj[$v1])) $treeAdj[$v1] = array();
			if(!isset($treeAdj[$v2])) $treeAdj[$v2] = array();
			$treeAdj[$v1][] = new Pair($v2, $w);
			$treeAdj[$v2][] = new Pair($v1, $w);
		}
		//traverse tree
		$stack = array();
		$visited = array();
		$parent = array();
		
		$stack[] = $start;
		$visited[$start] = true;
		while(!empty($stack)) {
			$u = array_pop($stack);
			for($i=0; $i<count($treeAdj[$u]); $i++) {
				$v = $treeAdj[$u][$i]->v();
				if(!$visited[$v]) {
					$visited[$v] = true;
					$parent[$v] = $u;
					$stack[] = $v;
				}
			}
		}
		//backward traverse path to find min/max on path
		if($this->min) {
			$ans = 0;
		} else {
			$ans = INFINITY;
		}
		$ansTriple;
		$v = $end;
		while(isset($parent[$v])) {
			$p = $parent[$v];
			if($this->min) {
				$weight = 0;
			} else {
				$weight = INFINITY;
			}
			for($i=0; $i<count($treeAdj[$p]); $i++) {
				if($treeAdj[$p][$i]->v() == $v) {
					$weight = $treeAdj[$p][$i]->w();
				}
			}
			if($this->min) {
				if($weight > $ans) {
					$ans = $weight;
					$ansTriple = new Triple($p,$v,$weight);
				}
			} else {
				if($weight < $ans) {
					$ans = $weight;
					$ansTriple = new Triple($p,$v,$weight);
				}
			}
			$v = $p;
		}
		return $ansTriple;
	}
	
  }
?>