<?php
/*
 * collection of classes and functions for all graph DS (used by MST, SSSP and Graph Traversal)
 */

class Pair {
	protected $v;
	protected $w;
	
	public function __construct($v, $w) {
		$this->v = $v;
		$this->w = $w;
	}
		//accessors
	public function v() { return $this->v; }
	public function w() { return $this->w; }

	public function toString() {
		return "(".$this->v.",".$this->w.") ";
	}
}

class Triple {
	protected $from;
	protected $to;
	protected $w; 
	
	public function __construct($f, $t, $w) {
		$this->from = $f;
		$this->to = $t;
		$this->w = $w;
	}
	
	//accessors
	public function from() { return $this->from; }
	public function to() { return $this->to; }
	public function weight() { return $this->w; }
	
	public function toString() {
		return "(".$this->from.",".$this->to.",".$this->w.") ";
	}
}

function pairSort($a, $b) { //a and b are pairs
	if($a->w() == $b->w()) return ($a->v() - $b->v());
	else return ($a->w() > $b->w());
}
	
function tripleSort($a, $b) { //a and b are triples
	if($a->weight() == $b->weight()) return ($a->to() - $b->to());
	else return ($a->weight() > $b->weight());
}

function vertexSort($a, $b) { //a and b are pairs, for sorting adj list
	if($a->v() == $b->v()) return ($a->w() - $b->w());
	else return ($a->v() > $b->v());
}

function generateAdjList($graph) {
	$a = $graph["internalAdjList"];
	$e = $graph["internalEdgeList"];
	$adjList;
	  
	$akeys = array_keys($a);
	for($i=0; $i<count($akeys); $i++) { //for each vertex
		$temp = array();
		foreach ($a[$akeys[$i]] as $key => $value) {
			if(!is_string($key)) {
				$new = new Pair($key, $e[$value]["weight"]);
				$temp[] = $new;
			}
		}
		usort($temp, 'vertexSort'); //by vertex number
		$adjList[$akeys[$i]] = $temp;
	}
	return $adjList;
}

function generateEdgeList($graph) {
	$e = $graph["internalEdgeList"];
	$edgeList;

	$keys = array_keys($e);
	for($i=0; $i<count($keys); $i++) { //for each edge
		$edgeList[] = new Triple($e[$keys[$i]]["vertexA"], $e[$keys[$i]]["vertexB"], $e[$keys[$i]]["weight"]);
	}
	return $edgeList;
}


?>