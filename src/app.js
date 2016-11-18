
module.exports = angular.module('sunzinet', ['ui.router','ngMessages', 'ngStorage', 'ui.tree', 'ngSessionStorage'])//'ui.tree'
.config(['$httpProvider', '$stateProvider','$urlRouterProvider', ($httpProvider, $stateProvider, $urlRouterProvider)=>{
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('interceptor');

    $urlRouterProvider.otherwise('/');

   $stateProvider 
        .state("board", {
            url: "/",
            templateUrl: "public/views/home.html",
            controller: "homeController"
        })
        .state("boardDetails", {
            url: "/board/:index/:id",
            templateUrl: "public/views/home.html",
            controller: "homeController"
        })
        .state("login", {
            url:"/login",
            templateUrl:"public/views/login/login.html",
            controller: "loginController",
            controllerAs: "vm"
            
        })
        .state('/another-page', {
            templateUrl:'',
            controller:''    
        }) 
}])
.run(['$rootScope', '$http', '$location', '$localStorage', ($rootScope, $http, $location, $localStorage)=>{
    console.log('run');
   /* if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }*/

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });
}]);