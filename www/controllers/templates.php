<?php
class Templates extends Base_Controller
{
    public function __construct(){
        parent::__construct();
    }

    public function nodes_render(){
        echo'<div class="clearfix list-item" style="position:relative;">
          	<div ui-tree-handle class="handle-content" ng-class="{\'open_status\': node.status===\'open\', \'delivered\': node.status===\'delivered\', \'transferred\': node.status===\'transferred\', \'modified\': node.status===\'modified\', \'released\': node.status===\'released\'}">
              <!--<i class="fa fa-bars"></i>-->
            </div>
            <div ui-tree-handle class="tree-node tree-node-content list-body-content" ng-click="setTemporaryNode($event, node)">
              <a class="btn-caret" ng-if="node.nodes && node.nodes.length > 0" data-nodrag ng-click="toggle(this)">
                <i class="fa" ng-class="{\'fa-angle-down\': collapsed, \'fa-angle-up\': !collapsed}"></i>
              </a>
              <span data-ng-if="!node.edit" id="{{node.uid}}" data-ng-dblclick="editPage($event, node)"> {{node.title}}  </span>
              <span data-ng-if="node.edit"> <input type="text" id="page_name" data-ng-model="page_name" autofocus ng-blur="node.edit = !node.edit" esc-key="resetFilter()" ng-keypress="setNewValue($event, node)"/> </span> 
               <a class="pull-right btn btn-danger btn-xs plus" data-nodrag  ng-click="remove(this)"><i class="fa fa-plus"></i></a>
               <a class="pull-right btn btn-primary btn-xs minus"  data-nodrag ng-click="newSubItem(this)" style="margin-right: 8px;">&nbsp;<i class="fa fa-minus"></i></a>
            </div>
  	       </div>
  	          <ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">
  	            <li ng-repeat="node in node.nodes" ui-tree-node ng-include="\'nodes_render\'">
  	            </li>
  	          </ol>
  	          </div>
            </div>';
    }
}
?>