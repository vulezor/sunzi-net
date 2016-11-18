(()=>{
    const isEmpty = ()=>{
        let bar;
        return obj => {
            for (bar in obj) {
                if (obj.hasOwnProperty(bar)) {
                    return false;
                }
            }
            return true;
        };
    }
    angular.module('sunzinet').filter('isEmpty', isEmpty);
})();
