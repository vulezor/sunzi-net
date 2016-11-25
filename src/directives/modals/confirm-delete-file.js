((modul)=>{
    const confirmDeleteFile = ()=>{
        return {
            controller($scope){
                $scope.deleteCurrentFile=()=>{
                    console.log('delete');
                    $scope.confirmDeleteAction({index:$scope.deleteFileIndex});
                }
            },
            restrict:'E',
            templateUrl: './public/templates/modals/confirm-delete-file.html',
            scope:{
                confirmDeleteAction:'&',
                deleteFileIndex:'='
            }
        }
    };
    modul.directive('confirmDeleteFile', confirmDeleteFile);
})(angular.module('sunzinet'));