((modul)=>{
    let settings = ()=>{
        return {
            restrict:'E',
            controller($scope){
                $scope.setNewName = ()=>{
                    $scope.changeTitle({title:$scope.boardName});
                };
                $scope.deleteBoard = ()=>{
                    $scope.delBoard()
                }
            },
            templateUrl:'./public/templates/modals/settings.html',
            scope:{
                changeTitle:"&",
                delBoard:"&",
                boardName:"@"
            }
        }
    };
    modul.directive('settings', settings);
})(angular.module('sunzinet'));