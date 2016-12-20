((modul)=>{
        const mainController = ($scope, $http, $window, $localStorage, $location, $sessionStorage, $interval)=>{
        let promise_value;
       // $window.sessionStorage.ja = 'ja';
        /*console.log($window.sessionStorage.logged_in)*/
        if(!sessionStorage.logged_in){
            $location.path('/login');
        }
        /*console.log('main Controller');*/
        $scope.selected_index = 0;
        $scope.boards_names = [];
        $scope.board_id =null;
        $scope.edit_board = null;
    // $scope.promise;
        $scope.temp_board_id;
        $scope.board_user;
    
        $scope.intervalBoard = ()=>{
        $scope.$broadcast('get-temp-board');
            $http.get('/get_boards', {params:{temp_board_id:$scope.temp_board_id, user:$scope.board_user}}).then((response)=>{
                if($scope.temp_board_id){
                    let temp_board = response.data[response.data.length-1];
                    console.log("TEMP BOARD :",temp_board);
                    response.data.pop();
                    $scope.$broadcast('check-locked-board', temp_board);
                }
                /*console.log("RESPONSE", response.data)*/
                $scope.boards_names = response.data;
                $scope.tab_limit = 5;
            },(error)=>{
                console.log(error);
            })
        };

        $scope.refreshBoardNames = ()=>{
            promise_value = $interval($scope.intervalBoard, 10000);       
        } 
    
        $scope.stop =()=>{
        $interval.cancel(promise_value);
        };

        document.onkeydown = function(evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key == "Escape" || evt.key == "Esc");
        } else {
            isEscape = (evt.keyCode == 27);
        }
        if (isEscape) {
        // console.log($('.nested-list-container').find("input[type='text']").length);
            var input_field = $('.nested-list-container').find("input[type='text']");
            if(input_field.length>0){
                console.log($('.nested-list-container').find("input[type='text']").length);
                input_field.trigger('blur');
            };
        }
    };
        /* $scope.onExit = ()=>{
            var message = 'If you live your session will expire';
                if (!event) {
                    alert('adsfasd');
                    delete $localStorage.currentUser;
                    event = window.event; 
                }
                if (event) {
                    console.log('stay')
                    event.returnValue = message;
                } else {
                    alert('bka')
                }
                return message;
        }*/
        /*window.onbeforeunload = function() {
            
            
            
        };*/
    /**
     *  $scope.$apply(function(){
                 delete $localStorage.currentUser;
            })
    */
        $window.onbeforeunload =  $scope.onExit;
    }
    mainController.$inject = ['$scope', '$http', '$window','$localStorage', '$location', '$sessionStorage', '$interval'];
    modul.controller('mainController', mainController);
})(angular.module('sunzinet'));
