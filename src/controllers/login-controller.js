((modul)=>{
     const loginController = function($scope, $location, AuthenticationService, $sessionStorage, $window){
        let vm = this;
        
        vm.login = login;
      
       // $scope.login = false
        initController();

        function initController() {
            // reset login status
                AuthenticationService.Logout();
        };

        function login(){
            vm.loading = true;
            AuthenticationService.Login(vm.username, function (result) {
                if (result === true) {
                    $scope.$parent.board_id =null;
                    $scope.$parent.edit_board = null;
                    $window.sessionStorage.logged_in = true;
                    $location.path('/');

                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };

        function logout(){
             AuthenticationService.Logout();
        }
    };
    loginController.$inject = ['$scope', '$location', 'AuthenticationService', '$sessionStorage', '$window'];
    modul.controller('loginController', loginController);
})(angular.module('sunzinet'));