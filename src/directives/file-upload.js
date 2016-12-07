((modul)=>{
    const fileUpload = ($http, $timeout)=>{
        return{
            restricted:'E',
            controller($scope){
                $scope.resetCount = 0;
                let alowed_extension, file_name, extension;
                $scope.fileUpload = ($event, form)=>{
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
                    formData.append('comment', $scope.file_comment);
                    formData.append('user', $scope.user);
                    $http({
                        url: 'file_uploads/' + $scope.board.id + '/' + $scope.temporary_node.uid,
                        method: "POST",
                        data: formData,
                        headers: {'Content-Type': undefined}
                    })
                    .then(
                        (response)=>{
                            if(response.data.hasOwnProperty("error")){
                                $('#fileLimitation').modal();
                            }else {
                                if($scope.temporary_node.files){
                                    $scope.temporary_node.files.push(response.data);
                                } else {
                                    $scope.temporary_node.files =[];
                                    $scope.temporary_node.files.push(response.data);
                                }
                                $($event.target)[0].reset();
                                $scope.resetCount++;
                                $scope.filename = null;
                                form.$submitted = false;
                                form.$pristine = false;
                                form.filename.$error = {"required":true};
                                form.$invalid = false;
                                $scope.$emit('save-model-data');
                            }    
                        },
                        (error)=>{
                            console.log(error);
                        }
                    )
                    console.log($scope.board.id);
                    console.log($scope.temporary_node);
                }
                $scope.resetValue = (form)=>{
                     $scope.resetCount++;
                     $scope.filename = null;
                     form.$submitted = false;
                     form.$pristine = false;
                     form.filename.$error = {"required":true};
                     form.$invalid = false;
                     console.log($scope.resetCount);
                }
            },
            templateUrl:'public/templates/file-upload.html',
            scope:true,
            link(scope, element, attr, controller){
                
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
    fileUpload.$inject = ['$http','$timeout'];
    modul.directive('fileUpload', fileUpload);
})(angular.module('sunzinet'));