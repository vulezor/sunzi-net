const interceptor = ($q, $localStorage)=>{
    return{
        request(request){
           /* console.log('request is done');*/
            request.params = request.params || {};
            //console.log(request);
            if(request.url!=='/get_boards'){
                $('#loadicon').stop().fadeIn()
            }
            if ($localStorage.currentUser) {
               // console.log('TOKEN', $localStorage.currentUser.token);
                request.params.access_token = $localStorage.currentUser.token; 
                request.params.user = $localStorage.currentUser.user;                        
              //  request.headers.Authorization = 'Bearer ' + $localStorage.currentUser.token;
            }
           // console.log(request);
                return request; 
        },
        response(response){
          /*  console.log('RESPONSE', response)
            console.log('response is done');*/
            $('#loadicon').stop().fadeOut()
            return response;
        },
        responseError(rejection){
            /*console.log('Failed with', rejection.status, 'status');*/
            $('#loadicon').stop().fadeOut() 
            return $q.reject(rejection); 
        }
    }
};
interceptor.$inject=['$q','$localStorage'];
module.exports = angular.module('sunzinet').factory('interceptor', interceptor);