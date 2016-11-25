((modul)=>{
    let lockBoardModal = ()=>{
        return {
            restrict: 'E',
            templateUrl: './public/templates/modals/lock-board-modal.html',
            scope:true
        }
    };
    modul.directive('lockBoardModal', lockBoardModal);
})(angular.module('sunzinet'));