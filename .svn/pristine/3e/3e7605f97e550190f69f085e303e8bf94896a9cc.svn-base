((modul)=>{
    const confirmClick = ()=>{
        return {
            restricted:'A',
            scope:true,
            link(scope, element, attr) {
                var msg = attr.confirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }
    modul.directive('confirmClick', confirmClick);
})(angular.module('sunzinet'));


