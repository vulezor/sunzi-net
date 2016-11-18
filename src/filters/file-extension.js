((modul)=>{
    let fileExtension = ()=>{
        return function(item){
            return item.substr(item.lastIndexOf('.') + 1);
        }
    };
    modul.filter('fileExtension', fileExtension);
})(angular.module('sunzinet'))