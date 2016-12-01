((modul)=>{
    const homeController = ($scope, $http, $localStorage, $state, $stateParams, $timeout, $sessionStorage, $window, $interval, BeforeUnload, $location, $filter)=>{
        let promise;
        let logout_timeout;
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
        //ANGULAR PARAMS 
       // console.log($window.sessionStorage.logged_in);
        $scope.user = $localStorage.currentUser.user;  // set user from localstorage
                                  // tab limit to show more boards button
        $scope.board = [];                             // represent current board 
        $scope.page_name ='';                          // temporary string in input field on edit title in tree item before save to node.title
        $scope.data = [];                              // represent tree list data.
        $scope.temporary_node = {};                    // temporary_node is information on sidebar
        $scope.close_sidebar = true;                   // side bar true(open), false(close) 
        $scope.breadcrumbs = [];
        $scope.modal_status = 'board';
        $scope.fileIndex = null;
        $scope.focus_screen = true;
        $scope.tab_limit = 7;
        $scope.previous_target = null;
        $scope.pageStatusLimit = "delivered";
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
        //METHODS
        /**
         * @description Initial function of page 
         */
        $(document).mousemove(()=>{
            $scope.$apply(()=>{
                $scope.resetLogoutTime();
            });
        });
        
        window.addEventListener('focus', function() {
            $scope.focus_screen = true;
        });

        window.addEventListener('blur', function() {
            $scope.focus_screen = false;
        });

        window.onbeforeunload = function() {
            $scope.$apply(function(){
                $scope.unlockboard();
            });
            $('#stayLockdModal').modal();
            return false;
        };
        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
       
        $scope.logOut=()=>{
                $scope.unlockboard();
                $scope.$parent.stop();  
                $location.path('/login');
                
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
        $scope.unlockboard = ()=>{
            $http.put('unlockboard/'+$scope.board.id).then((response)=>{
                //  console.log('unlock');
                // console.log(response.data);
            },(error)=>{
                console.log(error)
            });
        };

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.lockboard=()=>{
            $http.put('lockboard/'+$scope.board.id+'/'+$scope.user).then((response)=>{
             //   console.log(response.data);
            },(error)=>{
                console.log(error);
            });
        };

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        $scope.logoutTimeOut=()=>{
            logout_timeout = $timeout(()=>{
                $scope.logOut();
            }, 300000);//5min
        };

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------   
     
        $scope.resetLogoutTime=()=>{
            if($scope.focus_screen){
                $timeout.cancel(logout_timeout);
                $scope.logoutTimeOut();
            }
        };
       
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.init=()=>{
            //console.log("LOGEDIN: ",sessionStorage.logged_in);
            $scope.$parent.stop(); 
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
                $scope.close_sidebar = false; 
                let elem_width = $('.bside-container').outerWidth();
                $('.bside-container').css({"margin-right":"-"+elem_width+"px"});
                $scope.$parent.refreshBoardNames(); //start ajax interval to check board lock
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
            let data={};
            data.leaving_board_id = $scope.$parent.board_id;
            data.edit_board = $scope.$parent.edit_board;
            $http.get('/get_board/'+index+'/'+$scope.user, {params:data}).then((response)=>{
                $scope.board = response.data[0]; 
                $scope.data = angular.copy(JSON.parse(response.data[0].data)); 
                $scope.$parent.board_id = response.data[0].id;
                $scope.$parent.edit_board = response.data[0].edit_board;
               // console.log($localStorage.currentUser.user);
                if($scope.board.user != $localStorage.currentUser.user && $scope.board.user !="" ){
                    $('#lockBoardModal').modal();
                }
            },(error)=>{
                console.log(error);
            });
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.defaultObj = ()=>{
            return [
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
        }
        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        /**
         * @param name string name of the new board
         * @description Save new board with name and template data 
         */
        $scope.addNewBoard = (name, data)=>{
            let obj = [];
            if(!data){
                obj = $scope.defaultObj();
            } else {
                obj = data;
            }
            $http.post('/insert_board', {"name":name,"data":obj}).then((response)=>{
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

        //--------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.transferBoard = (name, index)=>{
            if(index!==''){
                $http.get('/get_board_transfer/'+index).then((response)=>{
                    let board = response.data[0];
                    let data = angular.copy(JSON.parse(response.data[0].data)); 
                    $scope.deleteFiles(data);
                    $scope.addNewBoard(name, data);
                },(error)=>{
                    console.log(error);
                });
            } else {
                $scope.addNewBoard(name);
            }
        }

        //--------------------------------------------------------------------------------------------------------------------------------------------------------------

        /**
         * @param data intiger
         * @description calling same function to delete key files in nested arrays of each node  
         * */ 
        $scope.deleteFiles = (data)=>{
            data.forEach(function(dat){
            delete dat.files;
            $scope.deleteFiles(dat.nodes);
            });
        }

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
            if($scope.board.edit_board==="edit"){
                if($scope.data.length===0){
                    let obj = [{
                        id:1,
                        uid:$scope.getUid(),
                        title:"Homepage",
                        status:"open",
                        edit:false,
                        nodes:[]
                    }];
                  $scope.data= obj; 
                  $scope.saveData();
                  $timeout(()=>{
                     // console.log('edit')
                        angular.element('#'+obj[0].uid).triggerHandler('dblclick');
                  }, 200);
                } else {
                    $timeout(()=>{
                        angular.element($('.bgColor').find('.minus')).triggerHandler('click');
                    }, 0);
                }
            }
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.deletePage = ()=>{
            $timeout(()=>{
                angular.element($('.bgColor').find('.plus')).triggerHandler('click');
                $scope.$emit('save-model-data');
                $scope.temporary_node = [];
            }, 0);
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
        $scope.saveOldLink = ()=>{
            let old_page_url = $('#old_page_url').val();
            if($("#transfer_oldcontent").is(":checked")){
                $scope.temporary_node.transfer = "YES";
            } else {
                $scope.temporary_node.transfer = "NO"
            }
            $scope.temporary_node.old_page_url = old_page_url;
            $scope.$emit('save-model-data');
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
           // console.log("EVENT: ", $event);
            if($scope.board.edit_board==="edit"){
                $scope.page_name = angular.copy(node.title);
                node.edit = !node.edit;
                var parent = $($event.target).parent();
                $timeout(function(){
                        $('#page_name').focus().select();
                }, 200);
            }
            
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        /**
         * @param $event event
         * @param node object
         * @description On keypres enter get value from input element and set new title value of that node object and 
         *              set node.edit to false tor remove input field and show node.title value instead.
         */
        $scope.setNewValue= function($event, node){
          //  console.log($event.which)
            if($event.which === 13){
                node.title = $($event.target).val();
                node.edit = !node.edit;
                $scope.$emit('save-model-data');
            }
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.getUid = ()=>{
            var d = new Date().getTime();
            if(window.performance && typeof window.performance.now === "function"){
                d += performance.now(); //use high-precision timer if available
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
        var obj = {
            id: nodeData.id * 10 + nodeData.nodes.length,
            uid:$scope.getUid(),
            title: "New Name",//nodeData.title + '.' + (nodeData.nodes.length + 1),
            edit:false,
            status:'open',
            nodes: []
        }
        nodeData.nodes.push(obj);
       // $scope.page_name = "New Name";
      /*  console.log($('.nested-list-container').chidren("input[type='text']"));
        $('.nested-list-container').find("input[type='text']").focus();*/
        $scope.$emit('save-model-data');
         $timeout(function(){
             //$('#'+obj.uid).parents('div.handle-content').triggerHandler('click');
              $('#'+obj.uid).triggerHandler('dblclick');
           
              
           //   angular.element($('#'+obj.uid)).parents('div.handle-content').triggerHandler('click');
         }, 200);
        
       
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
            if(!$scope.close_sidebar){
                $timeout(()=>{
                    angular.element($('.close-handle')).triggerHandler('click');
                },0);
            }
            
            result = [];
            var obj = {
                "title":"start",
                "nodes":$scope.data
            };
            $scope.bread_crumbs(obj, node.uid, result);
            result.splice(result.length-1, 1);
            result.splice(0, 1);   
            $scope.breadcrumbs = result.reverse();

            $scope.temporary_node = node;

            if($scope.temporary_node.files){
                $scope.pageStatusLimit = $scope.setPageStatusItem($scope.temporary_node.files);
            } else {
                $scope.pageStatusLimit = "delivered"
            }
            console.log($scope.pageStatusLimit);
            //old url page 
            if($scope.temporary_node.old_page_url){
                if($scope.temporary_node.old_page_url.length===0){
                    $('#old_page_url').val("");
                } else {
                    $('#old_page_url').val($scope.temporary_node.old_page_url); 
                }
            } else {
                $('#old_page_url').val("");
            }

            //transfer content checkbox
            if($scope.temporary_node.transfer){
                if($scope.temporary_node.transfer==="YES"){
                    $("#transfer_oldcontent").prop( "checked", true );
                } else {
                    $("#transfer_oldcontent").prop( "checked", false );
                }
            } else {
                $("#transfer_oldcontent").prop( "checked", false );
            }
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        /**
         * @param files array of object
         * @return str status
         * @description set status of the page. If files have same status, for that page we can confirm same status as those files
         */
        $scope.setPageStatusItem = (files)=>{
            let obj = {
                open:0,
                transferred:0, 
                modified:0, 
                released:0
            }
            if(files){
                files.forEach((file)=>{
                    switch(file.file_status){
                    case 'open':
                        obj.open++
                        break;
                    case 'transferred':
                        obj.transferred++
                        break;
                    case 'modified':
                        obj.modified++
                        break;
                    case 'released':
                        obj.released++
                        break;    
                    }
                });
            }
            console.log(obj);
            let status;
            $.each(obj, (i, item)=>{
                if(files.length === item){
                    console.log(files.length);
                    console.log(item)
                   status = i;
                } 
            });

            if(!status){
                
                $.each(obj, (i, item)=>{
                    if(i==='released'){
                        if(item >= 1){
                             status = 'released';
                        }
                    }
                });
                 $.each(obj, (i, item)=>{
                    if(i==='modified'){
                        if(item >= 1){
                             status = 'modified';
                        }
                    }
                });
                 $.each(obj, (i, item)=>{
                    if(i==='transferred'){
                        if(item >= 1){
                             status = 'transferred';
                        }
                    }
                });     
                $.each(obj, (i, item)=>{
                    if(i==='open'){
                        if(item >= 1){
                             status = 'delivered';
                        }
                    }
                });
                $scope.temporary_node.status = status;
            }
            return status;
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.closeSidebar = ($event)=>{
            let elem_width = $('.bside-container').outerWidth();
            if($scope.close_sidebar){
                $('.bside-container').animate({"margin-right":"-"+elem_width+"px"}, 200, 'swing');
            } else {
                $('.bside-container').animate({"margin-right":"0px"}, 200, 'swing');
            }
            $scope.close_sidebar = !$scope.close_sidebar;
        } 

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.changeStatus = (status)=>{
            $scope.temporary_node.status = status;
            $scope.$emit('save-model-data');
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.changeFileStatus = ($index, status)=>{
            $scope.temporary_node.files[$index].file_status = status;
            $scope.$emit('save-model-data');

            if($scope.temporary_node.files){
                $scope.pageStatusLimit = $scope.setPageStatusItem($scope.temporary_node.files);
            } else {
                $scope.pageStatusLimit = "delivered"
            }
        };

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.setDownloadFolder = (item)=>{
            return item.replace('/'+item.substr(item.lastIndexOf('/') + 1), "");
        };

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.delete_file = ($index)=>{
            $scope.fileIndex = $index;
            $('#deleteBoardPageFileConformation').modal();
        };

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.confirmDeleteFile = (index)=>{
            var files = angular.copy($scope.temporary_node.files);
            files.splice(index, 1)
            if(files.length===0){
                delete $scope.temporary_node.files
            } else {
                $scope.temporary_node.files = files;
            }
            $scope.fileIndex = null;
            $('#deleteBoardPageFileConformation').modal('hide');
            $scope.$emit('save-model-data');
        };

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.deleteSelectedPage = ()=>{
            if($scope.temporary_node.nodes){
                if($scope.temporary_node.nodes.length > 0){
                    $('#deleteBoardPage').modal();
                } else {
                    $('#deleteBoardPageConformation').modal();
                } 
            } else {
                $('#deleteBoardPageConformation').modal();
            } 
        };

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.changeModalStatus = (status)=>{
            $scope.modal_status = status;
            //reset new modal insert form
            if(status=='board'){
                $scope.$broadcast('reset-values');
            }
        };

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.settingsModal = ()=>{
            $('#settingsModal').modal();
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.changeBoardTitle = (title)=>{
            $http.put("/update_board/"+$scope.board.id, {"name":title}).then((response)=>{
                //console.log(response.data);
                $scope.$parent.boards_names[$scope.$parent.selected_index].name = title;
                $scope.board.name = title;
                $('#settingsModal').modal('hide');
            },(error)=>{
                console.log(error)
            })
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.boardDelete = ()=>{
            if(JSON.parse($scope.board.data).length === 0){
                $http.delete("/delete_board/"+$scope.board.id).then((response)=>{
                    $('#settingsModal').modal('hide');
                    $timeout(()=>{
                        $scope.$parent.boards_names.splice($scope.$parent.selected_index, 1);
                        $scope.board = {};
                        $state.go("boardDetails",{"index":0,"id":$scope.$parent.boards_names[0].id}); 
                    }, 300);
                },(error)=>{
                    console.log(error)
                });
            } else {
                $('#deleteBoard').modal();
            }
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.downloadZip = ()=>{
            let path, file_names= [];
                path = $scope.temporary_node.files[0].file_path.split("/");
                path.splice(path.length-1, 1);
                path = path.join("/");

            $scope.temporary_node.files.forEach(function($file){
                file_names.push($file.file_name);
            });

            var obj = {
                board_name:$scope.temporary_node.title,//$scope.board.name.replace(" ", "_")+"-"
                path:path,
                file_names:file_names
            };
            $http.get('download_zip', {params:{zip_details:obj}}).then((response)=>{
                $('body').append('<iframe style="display:none;" src="'+response.data.zip_name+'"></iframe>');
            },(error)=>{
                console.log(error);
            });
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.downloadFile = (title)=>{
            $('body').append('<iframe style="display:none;" src="'+title+'"></iframe>');
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.expandForm = ($event, index)=>{
            if($('body').find('.expand-form').length>0){
                $('body').find('.expand-form').removeClass('expand-form');
            }
            if((index != $scope.previous_target) || !$scope.previous_target){
                $($event.target).parents('.action-links').next().addClass('expand-form');
                $scope.previous_target = index;
            } else {
                $($event.target).parents('.action-links').next().removeClass('expand-form');
                $scope.previous_target = null;
            } 
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.fileDataChange = (index, data)=>{
            console.log(data);
              $scope.temporary_node.files[index].file_comment = data.file_comment;
              $scope.temporary_node.files[index].file_date = data.file_date;
              $scope.temporary_node.files[index].file_name = data.file_name;
              $scope.temporary_node.files[index].file_path = data.file_path;
              $scope.temporary_node.files[index].file_status = data.file_status;
              $scope.temporary_node.files[index].user = data.user;
              $scope.temporary_node.files[index].file_status = 'modified';
            $scope.$emit('save-model-data');
        }
        
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
        //EVENTS
        $scope.$on('save-model-data', ()=>{
               /*console.log($scope.board.id);
                console.log($scope.data);
                console.log('snimaj');*/
                if($scope.board.edit_board==='edit'){
                    $http.put("/update_board/"+$scope.board.id, {"data":$scope.data}).then(
                        (response)=>{
                            $scope.board.data = response.data[0].data;
                        },
                        (error)=>{
                            console.log(error);
                        }
                    );
                }
        });

        $scope.$on('get-temp-board', ()=>{
            //console.log($scope.board.id);
            $scope.$parent.temp_board_id = $scope.board.id;
            $scope.$parent.board_user = $scope.user;
        });

        $scope.$on('check-locked-board', (event, board_data)=>{
            if($scope.edit_board=="no_edit"){
                if(board_data.edit_board=="edit"){
                    $scope.board = board_data; 
                    $scope.data = angular.copy(JSON.parse(board_data.data)); 
                    $scope.$parent.board_id = board_data.id;
                    $scope.$parent.edit_board = response.data[0].edit_board;
                    $scope.edit_board = "edit";
                }

            }
        });
        
        $scope.$on('$stateChangeStart',(event, toState, toParams, fromState, fromParams)=>{
                $timeout.cancel(logout_timeout);
                //$timeout.cancel(promise_value);
                $scope.$parent.stop(); 
        });
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
        //WATCHERS
        $scope.$watch('pageStatusLimit', (newValue, oldValue, scope)=>{
            console.log(newValue);
        });
       //stop ajax interval to check board lock
        $scope.init(); //start page Initialization
    };
    homeController.$inject = ['$scope', '$http', '$localStorage', "$state", "$stateParams", "$timeout", "$sessionStorage", "$window", "$interval", "BeforeUnload", "$location", "$filter"];
    modul.controller('homeController', homeController); 
})(angular.module('sunzinet'));
 