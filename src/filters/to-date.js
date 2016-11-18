((modul)=>{
    let toDate = ()=>{
        return function(item){
            return new Date(item);
        };
    };
    modul.filter('toDate', toDate);
})(angular.module('sunzinet'))

