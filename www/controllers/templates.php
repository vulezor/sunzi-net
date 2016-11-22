<?php
class Templates extends Base_Controller
{
    public function __construct(){
        parent::__construct();
    }

    public function nodes_render(){
        echo'<div class="clearfix list-item" style="position:relative;">
          	<div ui-tree-handle class="handle-content pull-left " ng-class="{\'open_status\': node.status===\'open\', \'delivered\': node.status===\'delivered\', \'transferred\': node.status===\'transferred\', \'modified\': node.status===\'modified\', \'released\': node.status===\'released\'}">
              <!--<i class="fa fa-bars"></i>-->
            </div>
            <div ui-tree-handle  style="margin:5px 0px;max-width:80%" class="pull-left tree-node tree-node-content list-body-content" ng-click="setTemporaryNode($event, node)">
              <a class=" pull-right" ng-if="node.nodes && node.nodes.length > 0" data-nodrag ng-click="toggle(this)">
                 &nbsp;<i class="fa" ng-class="{\'fa-angle-up\': collapsed, \'fa-angle-down\': !collapsed}" style="font-size:18px;color:#929292;margin-top:3px"></i>
              </a>
              <span data-ng-if="!node.edit" data-ng-dblclick="editPage($event, node)" style="display:block;max-width:100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"> {{node.title}}  </span>
              <span data-ng-if="node.edit"> <input type="text" id="page_name" data-ng-model="page_name" autofocus ng-blur="node.edit = !node.edit" ng-keypress="setNewValue($event, node)"/> </span> 
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