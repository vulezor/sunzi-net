((modul)=>{
    let deletePageConfirmation = ()=>{
        return{
            restrict:'E',
            templateUrl: './public/templates/modals/delete-page-confirmation.html',
            scope:true
        }
    };
    modul.directive('deletePageConfirmation', deletePageConfirmation);
})(angular.module('sunzinet'));