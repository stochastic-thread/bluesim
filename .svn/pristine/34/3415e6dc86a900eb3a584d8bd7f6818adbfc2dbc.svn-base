<?php
class GraphTemplate{
  public function __construct(){

  }

  /*
   * Pass in a variable called $params to getGraph, containing these informations =>
   * - "numVertex" => number of vertex desired
   * - "directed" => boolean, directed or undirected
   * - Optionals =>
   *   - "connected" => boolean, connected or disconnected
   *   - "negativeEdge" => boolean, contains negative edges or not
   *   - "negativeCycle" => boolean, contains negative cycles or not
   * - Optionals for directed graphs =>
   *   - "isDag" => boolean, is DAG or not
   *   - "directionChangeChance" => int between 0 and 100, chance (in percent) of changing direction of non-bidirectional edges compared to the one in the DB
   *   - "bidirectionChangeChance" => int between 0 and 100, chance (in percent) of turning a certain non-bidirectional edge AMONG THE EDGES CHANGED to bidirectional (so the actual chance is directionChangeChance*bidirectionChangeChance)
   */

  public static function getGraph($params){
    $template = array_copy(GraphTemplateList::$graphTemplate[GRAPH_TEMPLATE_EMPTY]);
    $templateBank;
    $loopBreaker = 0;
    $loopLimit = 10;

    if(!array_key_exists("directionChangeChance", $params)) $params["directionChangeChance"] = GRAPH_TEMPLATE_EDGE_DIRECTION_CHANGE_DEFAULT_CHANCE;
    if(!array_key_exists("bidirectionChangeChance", $params)) $params["bidirectionChangeChance"] = GRAPH_TEMPLATE_EDGE_BIDIRECTION_CHANGE_DEFAULT_CHANCE;

    // $graphDb = new GraphDatabase();
    // $template = $graphDb->getRandomTemplate($params);
    // $template = unserialize($template);

    if($params["directed"]) $templateBank = GraphTemplateList::$graphTemplateIndex[GRAPH_TEMPLATE_TYPE_DIRECTED];
    else $templateBank = GraphTemplateList::$graphTemplateIndex[GRAPH_TEMPLATE_TYPE_UNDIRECTED];

    while(count($template["internalAdjList"]) < $params["numVertex"] && $loopBreaker < $loopLimit){
      $templateName = $templateBank[rand(0, count($templateBank)-1)];
      $template = array_copy(GraphTemplateList::$graphTemplate[$templateName]);
      $loopBreaker++;
    }

    $weightList = array(0);
    $connected = false;
    if($params["connected"]) $connected = true;

    self::reduceVertex($template, $params["numVertex"], $connected, $params["directed"]);
    if(!$connected && self::isConnected($template, $params["directed"])) self::disconnect($template, $params["directed"]);
    self::randomizeDirection($template, $params["directionChangeChance"], $params["bidirectionChangeChance"]);
    self::randomizeWeight($template);
    self::randomizeVertexNumber($template);

    return $template;
  }

  /*
   * Pass in a variable called $params to createState, containing these informations =>
   * - "displayWeight" => boolean, display or hide weight
   * - "directed" => boolean, directed or undirected
   */

  public static function createState($graphTemplate, $params){
    $internalAdjListObject = $graphTemplate["internalAdjList"];
    $internalEdgeListObject = $graphTemplate["internalEdgeList"];

    $state = array(
      "vl"=>array(),
      "el"=>array()
    );

    foreach ($internalAdjListObject as $key => $value){
      $state["vl"][$key] = array();

      $state["vl"][$key]["cxPercentage"] = $internalAdjListObject[$key]["cxPercentage"];
      $state["vl"][$key]["cyPercentage"] = $internalAdjListObject[$key]["cyPercentage"];
      $state["vl"][$key]["text"] = $key;
    }
    foreach ($internalEdgeListObject as $key => $value){
      $state["el"][$key] = array();

      $state["el"][$key]["vertexA"] = $internalEdgeListObject[$key]["vertexA"];
      $state["el"][$key]["vertexB"] = $internalEdgeListObject[$key]["vertexB"];
      $state["el"][$key]["weight"] = $internalEdgeListObject[$key]["weight"];
      if($params["displayWeight"]) $state["el"][$key]["displayWeight"] = true;
      if($params["directed"]) $state["el"][$key]["type"] = EDGE_TYPE_DE;
    }

    return $state;
  }

  protected static function reduceVertex(&$template, $numVertex, $connected, $directed){
    $tempTemplate = array_copy($template);
    $indexList = array_keys($template["internalAdjList"]);
    $loopLimit = 10*(count($indexList) - $numVertex);
    if($loopLimit < 0) $loopLimit = 0;
    $loopBreaker = 0;

    while(count($indexList) > 0 && $loopBreaker < $loopLimit){
      if(count($tempTemplate["internalAdjList"]) <= $numVertex) break;
      $indexChosen = rand(0, count($indexList)-1);
      $index = $indexList[$indexChosen];
      $templateCopy = array_copy($tempTemplate);
      $adjacent = $tempTemplate["internalAdjList"][$index];
      unset($adjacent["cxPercentage"]);
      unset($adjacent["cyPercentage"]);

      foreach($adjacent as $key => $value){
        if($directed) unset($templateCopy["internalEdgeList"][$templateCopy["internalAdjList"][$key][$index]]);
        unset($templateCopy["internalAdjList"][$key][$index]);
        unset($templateCopy["internalEdgeList"][$value]);
      }

      if($directed){
        foreach($templateCopy["internalAdjList"] as $key => $value){
          if(isset($value[$index])){
            unset($templateCopy["internalEdgeList"][$value[$index]]);
            unset($templateCopy["internalAdjList"][$key][$index]);
          }
        }
      }

      unset($templateCopy["internalAdjList"][$index]);
      if(!$connected || self::isConnected($templateCopy, $directed)){
        $tempTemplate = $templateCopy;
      }
      unset($indexList[$indexChosen]);
      $indexList = array_values($indexList);
      $loopBreaker++;
    }

    // echo "<br/><br/>";
    //   echo json_encode($template);
    //   echo "<br/>";
    //   echo json_encode($tempTemplate);
    // echo "<br/><br/>";
    // echo "aaa";
    // echo "<br/><br/>";

    $template = $tempTemplate;
  }

  protected static function randomizeVertexNumber(&$template){
    $originalKeys = array_keys($template["internalAdjList"]);
    $modifiedKeys = array();

    for($i = 0; count($originalKeys) > 0; $i++){
      $selectedKey = rand(0, count($originalKeys)-1);
      $modifiedKeys[$originalKeys[$selectedKey]] = $i;
      unset($originalKeys[$selectedKey]);
      $originalKeys = array_values($originalKeys);
    }

    $tempAdjList = array();

    foreach($modifiedKeys as $oldKey => $newKey){
      $tempAdjList[$newKey] = $template["internalAdjList"][$oldKey];

      // echo json_encode($template)."<br/>";

      $tempConnectivity = array();

      foreach($tempAdjList[$newKey] as $key => $value){
        if($key === "cxPercentage" || $key === "cyPercentage"){
          $tempConnectivity[$key] = $tempAdjList[$newKey][$key];
          continue;
        }
        $tempConnectivity[$modifiedKeys[$key]] = $tempAdjList[$newKey][$key];
      }

      $tempAdjList[$newKey] = $tempConnectivity;
    }

    $template["internalAdjList"] = $tempAdjList;

    foreach($template["internalEdgeList"] as $key => $value){
      $template["internalEdgeList"][$key]["vertexA"] = $modifiedKeys[$value["vertexA"]];
      $template["internalEdgeList"][$key]["vertexB"] = $modifiedKeys[$value["vertexB"]];
    }

    // echo json_encode($template);
    // echo "<br/><br/>";
  }

  protected static function randomizeWeight(&$template){
    $weightList = array(0);

    foreach($template["internalEdgeList"] as $key => $value){
      $weight = 0;

      while(in_array($weight, $weightList)){
        $weight = rand(1, 99);
      }
      $weightList[] = $weight;

      $template["internalEdgeList"][$key]["weight"] = $weight;
    }
  }

  /*
   * directionChangeChance: number between 0 and 100
   * bidirectionChangeChance: number between 0 and 100
   */

  protected static function randomizeDirection(&$template, $directionChangeChance, $bidirectionChangeChance){
    foreach($template["internalEdgeList"] as $key => $value){
      if(rand(1,100) > $directionChangeChance) continue;
      $vertexA = $value["vertexA"];
      $vertexB = $value["vertexB"];
      if(array_key_exists($vertexB, $template["internalAdjList"][$vertexA]) && array_key_exists($vertexA, $template["internalAdjList"][$vertexB]))
        continue;
      $template["internalEdgeList"][$key]["vertexA"] = $vertexB;
      $template["internalEdgeList"][$key]["vertexB"] = $vertexA;
      $template["internalAdjList"][$vertexB][$vertexA] = $key;
      unset($template["internalAdjList"][$vertexA][$vertexB]);
      if(rand(1,100) > $bidirectionChangeChance){
        $edgeList = array_keys($template["internalEdgeList"]);
        sort($edgeList);
        $lastKey = $edgeList[count($edgeList)-1];
        $template["internalEdgeList"][$lastKey+1] = array(
          "vertexA" => $vertexA,
          "vertexB" => $vertexB,
          );
        $template["internalAdjList"][$vertexA][$vertexB] = $lastKey+1;
      }
    }
  }

  protected static function disconnect(&$template, $directed){
    while(self::isConnected($template, $directed) && count($template["internalEdgeList"]) > 0){
        $edgeListId = array_keys($template["internalEdgeList"]);
        $edgeToBeRemoved = $edgeListId[rand(0, count($edgeListId)-1)];
        $vertexA = $template["internalEdgeList"][$edgeToBeRemoved]["vertexA"];
        $vertexB = $template["internalEdgeList"][$edgeToBeRemoved]["vertexB"];
        unset($template["internalAdjList"][$vertexA][$vertexB]);
        if($directed){
          if(isset($template["internalAdjList"][$vertexB][$vertexA]))
            unset($template["internalEdgeList"][$template["internalAdjList"][$vertexB][$vertexA]]);
        } 
        unset($template["internalAdjList"][$vertexB][$vertexA]);
        unset($template["internalEdgeList"][$edgeToBeRemoved]);
    }
  }

  protected static function isConnected($template, $directed){
    $visited = array();

    if(!$directed){
      $arr = array_keys($template["internalAdjList"]);
      $initVertex = $arr[0];
      $queue = array();
      $visited[] = $initVertex;
      $adjacent = $template["internalAdjList"][$initVertex];
      unset($adjacent["cxPercentage"]);
      unset($adjacent["cyPercentage"]);

  	  if(!is_array($adjacent)) {
  		  $temp = $adjacent;
  		  $adjacent = array();
  		  $adjacent[] = $temp;
  	  }
      foreach($adjacent as $key => $value){
        $queue[] = $key;
      }

      while(count($queue) > 0){
        $currVertex = $queue[0];
        array_shift($queue);
        if(!in_array($currVertex, $visited)){
          $visited[] = $currVertex;
          $adjacent = $template["internalAdjList"][$currVertex];
          unset($adjacent["cxPercentage"]);
          unset($adjacent["cyPercentage"]);
          foreach($adjacent as $key => $value){
            $queue[] = $key;
          }
        }
      }

      return count($visited) == count($template["internalAdjList"]);
    }
    else{
      // Weakly connected check
      // Convert AdjList to undirected version, then call the function again
      foreach($template["internalEdgeList"] as $key => $value){
        $template["internalAdjList"][$value["vertexA"]][$value["vertexB"]] = $key;
        $template["internalAdjList"][$value["vertexB"]][$value["vertexA"]] = $key;
      }

      return self::isConnected($template, false);
    }
  }

  protected static function isDag($template, $directed){
    if(!$directed) return false;

    $vertexAmt = count($template["internalAdjList"]);
    $toposort = array();
    $noIncomingEdge = array_keys($template["internalAdjList"]);

    foreach($template["internalEdgeList"] as $key => $value){
      $noIncomingEdge = array_diff($noIncomingEdge, array($value["vertexB"]));
    }

    while(count($noIncomingEdge) > 0){
      $currVertex = array_shift($noIncomingEdge);
      foreach($template["internalAdjList"] as $key=>$value){
        if($key == "cxPercentage" || $key == "cyPercentage") continue;

        unset($template["internalEdgeList"][$value]);
        $noIncomingEdge[] = $key;
      }

      foreach($template["internalEdgeList"] as $key => $value){
        $noIncomingEdge = array_diff($noIncomingEdge, array($value["vertexB"]));
      }
    }

    if(count($toposort) != $vertexAmt) return false;
    else return true;
  }
}
?>