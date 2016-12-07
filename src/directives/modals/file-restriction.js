((modul)=>{
    const fileRestriction = ()=>{
        return {
            restrict:'E',
            templateUrl: './public/templates/modals/file-restriction.html',
            scope:true
        }
    };
    modul.directive('fileRestriction', fileRestriction);
})(angular.module('sunzinet'));