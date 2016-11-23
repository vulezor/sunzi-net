((modul)=>{
    let deleteBoardModalError = ()=>{
            return {
                restrict:'E',
                templateUrl: './public/templates/modals/delete-board-modal-error.html',
                scope:true
            }
    };
    modul.directive('deleteBoardModalError', deleteBoardModalError);
})(angular.module('sunzinet'));