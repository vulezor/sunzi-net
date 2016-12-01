((modul)=>{
    const fileReplace = ($http, $timeout)=>{
        return{
            restricted:'E',
            controller($scope){
                $scope.resetCount = 0;
                $scope.fileReplace = ($event, form)=>{
                    $event.preventDefault();
                    
                    var formData = new FormData();
                    formData.append('file', $($event.target).find('input[type="file"]')[0].files[0]);
                    formData.append('comment', $scope.isolated_comment);
                    formData.append('user', $scope.user);
                    $http({
                        url: 'file_uploads/' + $scope.boardId + '/' + $scope.boardUid,
                        method: "POST",
                        data: formData,
                        headers: {'Content-Type': undefined}
                    })
                    .then(
                        (response)=>{
                            $scope.changeFileData({index:$scope.index, data:response.data});
                            $($event.target)[0].reset();
                            $scope.resetCount++;
                            $scope.filename = null;
                            form.$submitted = false;
                            form.$pristine = false;
                            form.filename.$error = {"required":true};
                            form.$invalid = false;
                            $scope.$broadcast('return-comment', response.data.file_comment);
                        },
                        (error)=>{
                            console.log(error);
                        }
                    )
                }
                $scope.resetValue = (form)=>{
                     $scope.resetCount++;
                     $scope.filename = null;
                     form.$submitted = false;
                     form.$pristine = false;
                     form.filename.$error = {"required":true};
                     form.$invalid = false;
                     //console.log($scope.resetCount);
                }
            },
            templateUrl:'public/templates/file-replace.html',
            scope:{
                index:'=',
                changeFileData:'&',
                comment:'=',
                boardId:'=',
                boardUid:'=',
                user:'='
            },
            link(scope, element, attr, controller){
                scope.isolated_comment = scope.comment;
                scope.$on('return-comment', function(event, return_comment){
                    //console.log("Return",return_comment);
                    scope.isolated_comment = return_comment;
                })
                element.find('input[type="file"]').change(function(){
                    let input = $(this),
                    numFiles = input.get(0).files ? input.get(0).files.length : 1,
                    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                    input.parents('label').next().val(label).change();
                    input.trigger('fileselect', [numFiles, label]);
                });
            }
        }
    }
    fileReplace.$inject = ['$http','$timeout'];
    modul.directive('fileReplace', fileReplace);
})(angular.module('sunzinet'));