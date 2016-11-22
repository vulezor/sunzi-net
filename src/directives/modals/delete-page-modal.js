((modul)=>{
    let deletePageModal = function(){
        return{
            restrict:'E',
            //replace:true,
            templateUrl: './public/templates/modals/delete-page-modal.html'
        }
    };
    modul.directive('deletePageModal', deletePageModal);
})(angular.module('sunzinet'));