((modul)=>{
    const fileLimitation = ()=>{
        return {
            restrict:'E',
            templateUrl: './public/templates/modals/file-limitation.html',
            scope:true
        }
    };
    modul.directive('fileLimitation', fileLimitation);
})(angular.module('sunzinet'));