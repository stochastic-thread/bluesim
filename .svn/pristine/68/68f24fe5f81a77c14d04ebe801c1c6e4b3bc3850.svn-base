<?php
  /*
   * PHP Class to store the graph templates inside the MySQL database and retrieve them
   */

  /*
   * Table name: graph_template
   * Schema:
   * - name: template name (unique key)
   * - template: serialized graphState (php-version)
   * - directed: boolean
   * - vertexAmount
   * - connected: boolean
   */

  class GraphDatabase{
    // TODO: Consider SQL injection issue
    protected $db;

    public function __construct() {
      $this->db = mysqli_connect("localhost",DB_USERNAME,DB_PASSWORD,DB_NAME);

      if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }

      $this->initBasicTemplates();
    }

    protected function initBasicTemplates(){
      foreach(GraphTemplateList::$graphTemplateIndex[GRAPH_TEMPLATE_TYPE_UNDIRECTED] as $templateName){
        mysqli_query($this->db, "INSERT IGNORE INTO `graph_template` (`name`, `template`, `directed`, `vertexAmount`, `connected`) 
          VALUES ('".$templateName."','".serialize(GraphTemplateList::$graphTemplate[$templateName])."','"
          ."0"."','".count(GraphTemplateList::$graphTemplate[$templateName]["internalAdjList"])."','"."1"."')");
        // echo mysqli_error($this->db);
      }

      foreach(GraphTemplateList::$graphTemplateIndex[GRAPH_TEMPLATE_TYPE_DIRECTED] as $templateName){
        mysqli_query($this->db, "INSERT IGNORE INTO `graph_template` (`name`, `template`, `directed`, `vertexAmount`, `connected`) 
          VALUES ('".$templateName."','".serialize(GraphTemplateList::$graphTemplate[$templateName])."','"
          ."1"."','".count(GraphTemplateList::$graphTemplate[$templateName]["internalAdjList"])."','"."1"."')");
        // echo mysqli_error($this->db);
      }
      // echo mysqli_error($this->db);
    }

    public function getSpecificTemplate($templateName){
      $result = mysqli_query($this->db, "SELECT `template` FROM `graph_template` WHERE `name`='".$templateName."'");
      $template = mysqli_fetch_assoc($result);
      // echo($template["template"]);
      // echo mysqli_error($this->db);
      if(count($template) == 0) return null;
      return $template["template"];
    }

    /*
     * Pass in a variable called $params to getRandomTemplate, containing these informations =>
     * - "numVertex" => number of vertex desired
     * - "directed" => boolean, directed or undirected
     * - Optionals =>
     *   - "connected" => boolean, connected or disconnected
     *   - "negativeEdge" => boolean, contains negative edges or not
     *   - "negativeCycle" => boolean, contains negative cycles or not
     * - Optionals for directed graphs =>
     *   - "isDag" => boolean, is DAG or not
     */

    public function getRandomTemplate($params){
      $directed = $params["directed"]? 1:0;
      $connected = $params["connected"]? 1:0;

      $result = mysqli_query($this->db, "SELECT `template` FROM `graph_template` 
        WHERE `vertexAmount`>='".$params["numVertex"]."'".
        "AND `directed`='".$directed."'".
        "AND `connected`='".$connected."'"
        );
      $templateList = array();

      while(true){
        $template = mysqli_fetch_assoc($result);
        if(is_null($template)) break;
        $templateList[] = $template["template"];
        // echo $template["template"];
      }
      // echo mysqli_error($this->db);
      if(count($templateList) == 0){
        // Relax vertexAmount
        $result = mysqli_query($this->db, "SELECT `template` FROM `graph_template` 
          WHERE `directed`='".$directed."'".
          "AND `connected`='".$connected."'"
          );

        while(true){
          $template = mysqli_fetch_assoc($result);
          if(is_null($template)) break;
          $templateList[] = $template["template"];
          // echo $template["template"];
        }
      }

      if(count($templateList) == 0) return null;

      $selectedTemplate = rand(0, count($templateList)-1);
      return $templateList[$selectedTemplate];
    }

    public function insertTemplate($newTemplate, $templateName, $params){
      $directed = $params["directed"]? 1:0;
      $connected = $params["connected"]? 1:0;

      if($isConnected) $connected = 1;
      mysqli_query($this->db, "INSERT IGNORE INTO `graph_template` (`name`, `template`, `directed`, `vertexAmount`, `connected`) 
          VALUES ('".$templateName."','".serialize($newTemplate)."','".$directed."','"
          .count($newTemplate["internalAdjList"])."','".$connected."')");
        // echo mysqli_error($this->db);
    }

    public function removeTemplate($templateName){
      mysqli_query($this->db, "DELETE FROM `graph_template` WHERE `name`=".$templateName);
    }

    // Add new templates
      // Validate template, then insert

    // Remove templates

    // Query a specific template

    // Query a random template with desired property; return empty template if there is no such template
  }
?>