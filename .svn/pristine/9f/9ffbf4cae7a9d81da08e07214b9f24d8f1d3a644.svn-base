<div class="clearfix" style="position:relative;">
    <div ui-tree-handle class="handle-content pull-left"></div>
    <div style="margin:5px 0px;" class="pull-left tree-node tree-node-content list-body-content"  >
        <a class="btn btn-success btn-xs" ng-if="node.nodes && node.nodes.length > 0" data-nodrag ng-click="toggle(this)">
            <span class="glyphicon" ng-class="{\'glyphicon-chevron-right\': collapsed, \'glyphicon-chevron-down\': !collapsed}"></span>
        </a>
        {{node.title}}
        <a class="pull-right btn btn-danger btn-xs minus" data-nodrag  ng-click="remove(this)"><span class="glyphicon glyphicon-remove"></span></a>
        <a class="pull-right btn btn-primary btn-xs plus"  data-nodrag ng-click="newSubItem(this)" style="margin-right: 8px;"><span class="glyphicon glyphicon-plus"></span></a>
    
    </div>
    </div>
        <ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">
        <li ng-repeat="node in node.nodes" ui-tree-node ng-include="\'nodes_render\'">
        </li>
        </ol>
        </div>
    </div>