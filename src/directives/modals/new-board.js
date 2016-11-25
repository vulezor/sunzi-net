((modul)=>{
    var newBoard = ()=>{
    return{
        restrict:'E',
        require:['newBoard'],
        controller:['$scope', ($scope)=>{
            $scope.name = "";
            $scope.sel_board = "";
            $scope.resetValue = ()=>{
                var original = "";
                $scope.name = angular.copy(original);
                $scope.sel_board = angular.copy(original);;
                $scope.form_board.$setPristine();
            }
            $scope.addBoard = ($event)=>{
                if($scope.board.length!==0){
                    if($event.key!==13){ return false};
                }
                $scope.addNewBoard({name:$scope.name});
            }
            $scope.withoutSidemap = ()=>{
                $scope.addNewBoard({name:$scope.name});
            }
            $scope.transferBoard = ()=>{
                $scope.transferingBoard({name:$scope.name, index:$scope.sel_board});
            }
            $scope.add_event = (elem)=>{
                $(elem).click(function(){
                    $scope.$apply(function(){
                            $scope.resetValue();
                    });       
                });
            }
            $scope.change_status = (status)=>{
                if($scope.name.length===0){
                    $scope.form_board.$invalid = true;
                    $scope.form_board.$submitted = true;
                } else {
                    $scope.changeStatus({status:status});
                }
            }
        }],
        templateUrl: 'public/templates/modals/new-board.html',
        scope:{
            addNewBoard:'&',
            changeStatus:'&',
            transferingBoard:'&',
            boardLength:'=',
            modalStatus:'=',
            board:"="
        },
        link(scope, elem, attribute, controller){
            scope.$on('reset-values', ()=>{
                scope.resetValue();
            });
            $('.modal-content').on('mouseenter', ()=>{
                $(elem).unbind( "click" );
            }).on('mouseleave',function(){
                scope.$apply(function(){
                    scope.add_event(elem);
                });
            });
            scope.add_event(elem);
        }
    }
    }
    module.exports = modul.directive('newBoard', newBoard);
})(angular.module('sunzinet'));

