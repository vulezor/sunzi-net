
const mainController = ($scope, $window, $localStorage, $location, $sessionStorage)=>{
    $window.sessionStorage.ja = 'ja';
    console.log($window.sessionStorage.logged_in)
    if(!sessionStorage.logged_in){
        $location.path('/login');
    }
    console.log('main Controller');
    $scope.selected_index = 0;
    $scope.boards_names = [];

    /* $scope.onExit = ()=>{
         var message = 'If you live your session will expire';
            if (!event) {
                alert('adsfasd');
                delete $localStorage.currentUser;
                event = window.event; 
            }
            if (event) {
                 console.log('stay')
                event.returnValue = message;
            } else {
                alert('bka')
            }
            return message;
     }*/
     /*window.onbeforeunload = function() {
          
        
        
    };*/
/**
 *  $scope.$apply(function(){
             delete $localStorage.currentUser;
         })
 */
    $window.onbeforeunload =  $scope.onExit;
}
mainController.$inject = ['$scope', '$window','$localStorage', '$location', '$sessionStorage'];
module.export =  angular.module('sunzinet').controller('mainController', mainController);