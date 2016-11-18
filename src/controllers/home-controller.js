const homeController = ($scope, $http, $localStorage, $state, $stateParams, $timeout, $sessionStorage, $window)=>{
    
    //PARAMS 
    console.log($window.sessionStorage.logged_in);
    $scope.user = $localStorage.currentUser.user;  // set user from localstorage
    $scope.tab_limit = 5;                          // tab limit to show more boards button
    $scope.board = [];                             // represent current board 
    $scope.page_name ='';                          // temporary string in input field on edit title in tree item before save to node.title
    $scope.data = [];                              // represent tree list data.
    $scope.temporary_node = {};                    // temporary_node is information on sidebar
    $scope.close_sidebar = true;                   // side bar true(open), false(close) 
    $scope.breadcrumbs
    $scope.modal_status = 'board';
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    //METHODS

    /**
     * @description Initial function of page 
     */
    $scope.init = ()=>{
       console.log("LOGEDIN: ",sessionStorage.logged_in);
        $http.get('/get_boards').then((response)=>{
            $scope.$parent.boards_names = response.data;
            if($scope.$parent.boards_names.length === 0){
                // start new modal if there no boards on database
                $('#newBoardModal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            } else {
                // if not set state params on link then from array set index value 0 and $scope.$parent.boards_names[0].id and redirect to it
                if($.isEmptyObject($stateParams)){
                    $state.go("boardDetails",{"index":0,"id":$scope.$parent.boards_names[0].id}); 
                    $scope.$parent.selected_index = 0;
                } else { // get board based on $stateParams
                    $scope.$parent.selected_index = parseInt($stateParams.index);
                    $scope.getBoard($stateParams.id);               
                }
                // set jQuery event on element with class list-item
                $('body').on("click", ".list-item, .handle-content", function(){ 
                    //click event behavior
                    $(".bgColor").removeClass('bgColor');
                    $(".bgColor-handle").removeClass('bgColor-handle');
                    $(this).children().eq(1).addClass('bgColor');
                    $(this).children().eq(0).addClass('bgColor-handle');
                });
            }
        },(error)=>{
            console.log(error);
        });
    }  

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * @param index intiger
     * @description ajax call to set board based and data on board id
     */
    $scope.getBoard = (index)=>{
        $http.get('/get_board/'+index).then((response)=>{
            $scope.board = response.data[0];
            $scope.data = angular.copy(JSON.parse(response.data[0].data)); 
        },(error)=>{
            console.log(error)
        });
    }
    
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * @param name string name of the new board
     * @description Save new board with name and template data 
     */
    $scope.addNewBoard = (name)=>{
        let data = [
            {
                "id": 1,
                "uid":$scope.getUid(),
                "title": "Homepage",
                "status":'open',
                "edit": false,
                "nodes": [
                    {
                        "id": 2,
                        "uid":$scope.getUid(),
                        "title": "node1.1",
                        "edit": false,
                        "status":'open',
                        "nodes": []
                    },
                    {
                        "id": 3,
                        "uid":$scope.getUid(),
                        "title": "node1.2",
                        "edit": false,
                        "status":'open',
                        "nodes": []
                    }
                ]
            }
        ];
        $http.post('/insert_board', {"name":name,"data":data}).then((response)=>{
            $('#newBoardModal').modal('hide');
            $timeout(function(){
                $scope.$parent.boards_names.push(response.data[0]);
                $state.go("boardDetails",{"index":(parseInt($scope.$parent.boards_names.length)-1),"id":response.data[0].id});// redirecting
                $scope.$parent.selected_index = parseInt($scope.$parent.boards_names.length)-1;     

            }, 500);
        },(error)=>{
            console.log('error');
        });

    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    $scope.remove = (scope)=>{
        scope.remove();
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    $scope.toggle = (scope)=>{
        scope.toggle();
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    $scope.moveLastToTheBeginning = ()=>{
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a); 
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    $scope.collapseAll = ()=>{
        $scope.$broadcast('angular-ui-tree:collapse-all');
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    $scope.expandAll = ()=>{
        $scope.$broadcast('angular-ui-tree:expand-all');
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * @description angular emulate triger click on hidden selector $('.bgColor').find('.minus') to add new node on tree (hidden button)
     */
    $scope.addNewPage = ()=>{
        $timeout(()=>{
            angular.element($('.bgColor').find('.minus')).triggerHandler('click');
        }, 0);
    }

     $scope.deletePage = ()=>{
        $timeout(()=>{
            angular.element($('.bgColor').find('.plus')).triggerHandler('click');
             $scope.$emit('save-model-data');
             $scope.temporary_node = [];
        }, 0);
    }

    $scope.saveData = ()=>{
        $scope.$emit('save-model-data');
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * @param $event event
     * @param node object
     * @description On clicking text in tree element set input with that model title value and focus on it.
     */
    $scope.editPage = ($event, node)=>{
        $scope.page_name = angular.copy(node.title);
        node.edit = !node.edit;
        var parent = $($event.target).parent();
        $timeout(function(){
                $('#page_name').focus().select();
        }, 200);
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * @param $event event
     * @param node object
     * @description On keypres enter get value from input element and set new title value of that node object and 
     *              set node.edit to false tor remove input field and show node.title value instead.
     */
    $scope.setNewValue= function($event, node){
        if($event.which === 13){
            node.title = $($event.target).val();
            node.edit = !node.edit;
            $scope.$emit('save-model-data');
        }
    }

    $scope.getUid = ()=>{
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now();; //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------
    $scope.newSubItem = function (scope) {
    var nodeData = scope.$modelValue;
    nodeData.nodes.push({
        id: nodeData.id * 10 + nodeData.nodes.length,
        uid:$scope.getUid(),
        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
        edit:false,
        status:'open',
        nodes: []
    });
    $scope.$emit('save-model-data');
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * @description This is odd technique to make breadcrumbs i must return to refactor this code
     */
    var result = [];
    $scope.bread_crumbs = (parentnode, uid, result)=>{
        if (parentnode.uid == uid){
        result.push(parentnode.Parent);
        return true;
        }
        if (parentnode.nodes) {
            for (var i = 0; i < parentnode.nodes.length; i++) {
                var node = parentnode.nodes[i];
                if (parentnode.nodes &&  $scope.bread_crumbs(node, uid, result)) {
                    result.push(parentnode.title);
                    return true;
                }
            }
        }
        // no matches found - return false
        return false;
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    $scope.setTemporaryNode = function($event, node){
        if($('#upload_files')[0]){
            $('#upload_files')[0].reset();
        }
        
        result = [];
        var obj = {
            "title":"start",
            "nodes":$scope.data
        };
        
        $scope.bread_crumbs(obj, node.uid, result);
       // console.log(result);
        result.splice(result.length-1, 1);
        result.splice(0, 1);   
        $scope.breadcrumbs = result.reverse();
         console.log(result);
        $scope.temporary_node = node;
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    $scope.closeSidebar = ($event)=>{
        console.log($event.target);
        var elem_width = $('.bside-container').outerWidth();
        console.log(elem_width);
        if($scope.close_sidebar){
            $('.bside-container').animate({"margin-right":"-"+elem_width+"px"}, 200, 'swing');
        } else {
            $('.bside-container').animate({"margin-right":"0px"}, 200, 'swing');
        }
        $scope.close_sidebar = !$scope.close_sidebar;
    } 
    $scope.changeStatus = (status)=>{
        $scope.temporary_node.status = status;
         $scope.$emit('save-model-data');
    }

    $scope.changeFileStatus = ($index, status)=>{
        console.log($scope.temporary_node.files[$index].file_status);
        $scope.temporary_node.files[$index].file_status = status;
         $scope.$emit('save-model-data');
    }


    $scope.setDownloadFolder = (item)=>{
        return item.replace('/'+item.substr(item.lastIndexOf('/') + 1), "");
    }

    $scope.delete_file = ($index)=>{
        console.log($index)
        console.log($scope.temporary_node.files)
        $scope.temporary_node.files.splice($index,1);
        console.log($scope.temporary_node.files);
        $scope.temporary_node = {
            files:$scope.temporary_node.files
        }
    }

    $scope.deleteSelectedPage = ()=>{
        console.log($scope.temporary_node)
        if($scope.temporary_node.nodes){
            if($scope.temporary_node.nodes.length > 0){
                console.log('cant delete file');
            } else {
                $scope.deletePage();
            } 
        } else {
            $scope.deletePage();
        }
        
    }

    $scope.changeStatus = (status)=>{
        $scope.modal_status = status;
    }
    
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------
    //EVENTS
    $scope.$on('save-model-data', ()=>{
            console.log($scope.board.id);
            console.log($scope.data);
            $http.put("/update_board/"+$scope.board.id, {"data":$scope.data}).then(
                (response)=>{
                    console.log(response.data);
                },
                (error)=>{
                    console.log(error)
                }
            );
    });
    
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------

    $scope.init(); //start page Initialization
 
}
homeController.$inject = ['$scope', '$http', '$localStorage', "$state", "$stateParams", "$timeout", "$sessionStorage", "$window"];
module.export = angular.module('sunzinet').controller('homeController', homeController); 

