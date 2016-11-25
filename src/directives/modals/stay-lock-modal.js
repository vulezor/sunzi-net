((modul)=>{
    const stayLockModal = ()=>{
        return {
            restrict:'E',
            templateUrl: './public/templates/modals/stay-lock-modal.html',
            scope:true
           
        }
    };
    modul.directive('stayLockModal', stayLockModal);
})(angular.module('sunzinet'));