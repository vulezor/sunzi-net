((modul)=>{
    let settings = ()=>{
        return {
            restrict:'E',
            controller($scope){
                $scope.name = $scope.temporaryNode.title;
                $scope.setNewName = ()=>{
                    console.log(name);
                };
            },
            templateUrl:'./public/templates/modals/settings.html',
            scope:{
                temporaryNode:"="
            }
        }
    };
    modul.directive('settings', settings);
})(angular.module('sunzinet'));