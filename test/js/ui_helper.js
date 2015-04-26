// renames entities
function rename(entity, labelID) {
    var label = document.getElementById(labelID).value;  
   if (label !== "") {
       entity.view["name"] = label; 
       // console.log(entity.view.image.node.parentNode);
        entity.view.image.node.parentNode.nextSibling.children[0].innerHTML = label;
        
        if (entity.view["type"] != "source" && entity.view["type"] != "reverser" && entity.view["type"] != "func") 
            entity.statTable.find("h2").text(label);
    }
}

function displayName(entity, labelID) {
    // retrieve and display durrent name in popup
   document.getElementById(labelID).value = entity.view["name"];

}