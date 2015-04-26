<?php
  require_once 'Everything.php';

  $graphParams = array();
  $graphParams["numVertex"] = $_GET["numVertex"];
  $graphParams["directed"] = $_GET["directed"];
  if(isset($_GET["connected"])) $graphParams["connected"] = $_GET["connected"] == 1? true:false;
  if(isset($_GET["negativeEdge"])) $graphParams["negativeEdge"] = $_GET["negativeEdge"] == 1? true:false;
  if(isset($_GET["negativeCycle"])) $graphParams["negativeCycle"] = $_GET["negativeCycle"] == 1? true:false;
  if(isset($_GET["isDag"])) $graphParams["isDag"] = $_GET["isDag"] == 1? true:false;
  if(isset($_GET["directionChangeChance"])) $graphParams["directionChangeChance"] = $_GET["directionChangeChance"];
  if(isset($_GET["bidirectionChangeChance"])) $graphParams["bidirectionChangeChance"] = $_GET["bidirectionChangeChance"];

  $graph = GraphTemplate::getGraph($graphParams);
  echo json_encode($graph);
?>