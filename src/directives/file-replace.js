((modul)=>{
    const fileReplace = ($http, $timeout)=>{
        return{
            restricted:'E',
            controller($scope){
                $scope.resetCount = 0;
                $scope.fileReplace = ($event, form)=>{
                    let alowed_extension, file_name, extension;
                    $event.preventDefault();
                    alowed_extension = ['png', 'PNG', 'doc', 'DOC', 'docx', 'DOCX', 'xlsx', 'XLSX', 'xls', 'XLS', 'TIFF', 'tiff', 'JPG', 'jpg', 'JPEG', 'jpeg', 'PPT', 'ppt', 'PPTX', 'pptx', 'PDF', 'pdf', 'MP3', 'mp3', 'MP4','mp4']
                    file_name = $($event.target).find('input[type="file"]')[0].files[0].name;
                    extension = file_name.split('.').pop();
                    extension = alowed_extension.indexOf(extension);
                    if(extension === -1){
                        $($event.target).find('input[type="file"]').val("").trigger('change');
                        $('#fileRestriction').modal();
                        return false;
                    }
                    if($($event.target).find('input[type="file"]')[0].files[0].size/1024/1024 > 30){
                        $('#fileLimitation').modal();
                        return false;
                    }
                   
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
                            if(response.data.hasOwnProperty("error")){
                                $('#fileLimitation').modal();
                            }else {
                                $scope.changeFileData({index:$scope.index, data:response.data});
                                $($event.target)[0].reset();
                                $scope.resetCount++;
                                $scope.filename = null;
                                form.$submitted = false;
                                form.$pristine = false;
                                form.filename.$error = {"required":true};
                                form.$invalid = false;
                                $scope.$broadcast('return-comment', response.data.file_comment);
                            }
                           
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