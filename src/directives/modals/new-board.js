((modul)=>{
    var newBoard = ()=>{
    return{
        restrict:'E',
        require:'newBoard',
        controller:['$scope', ($scope)=>{
            $scope.name = "";
            $scope.resetValue = ()=>{
                var original = "";
                $scope.name = angular.copy(original)
                $scope.form_board.$setPristine();
            }
            $scope.addBoard = ()=>{
                console.log($scope.name);
                $scope.addNewBoard({name:$scope.name});
            }
            $scope.add_event = (elem)=>{
                $(elem).click(function(){
                    $scope.$apply(function(){
                            $scope.resetValue();
                    });       
                });
            }
            $scope.change_status = (status)=>{
                $scope.changeStatus({status:status})
            }
            

        }],
        templateUrl: 'public/templates/modals/new-board.html',
        scope:{
            addNewBoard:'&',
            changeStatus:'&',
            boardLength:'=',
            modalStatus:'=',
            board:"="
        },
        link(scope, elem, attribute, ctrl){
            console.log(ctrl);
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
})(angular.module('sunzinet'))

