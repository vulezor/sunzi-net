((modul)=>{
    var Service = ($http, $localStorage) => {
        var service = {
            Login(username, callback){
                $http.post('/authentificate', {"username": username}).then((response)=>{

                    //console.log(response.data.length)
                    // login successful if there's a token in the response
                    if (response.data.length !== 0) {
                        // store username and token in local storage to keep user logged in between page refreshes
                     $localStorage.currentUser = response.data;
                        // add jwt token to auth header for all requests made by the $http service
                        // $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
            },
            Logout(){
                //remove user from local storage and clear http auth header
                delete $localStorage.currentUser;
                //$http.defaults.headers.common.Authorization = '';*/
            }

        };

        return service;
    }
    angular.$inject = ['$http', '$localStorage'];
    modul.factory('AuthenticationService', Service);
})(angular.module('sunzinet'));