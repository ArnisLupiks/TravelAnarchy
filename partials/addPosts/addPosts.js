angular.module('sample.addPosts', [
  'auth0','OtdDirectives'

])
.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),

            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }])
.factory('logee', function($http){
  return{
    addLog : function(formData){
      return $http({
        url : 'api/addPosts.php',
        method: 'POST',
        data: formData
      })
    },
    addPicture : function(pictureData){
      return $http({
        url : 'api/addPicture.php',
        method: 'POST',
        data: pictureData
      })
    }
  }
})
// setting unique ID
.factory('uuid', function() {
    var svc = {
        new: function() {
            function _p8(s) {
                var p = (Math.random().toString(16)+"000000000").substr(2,8);
                return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        },
        empty: function() {
          return '00000000-0000-0000-0000-000000000000';
        }
    };
    return svc;
})
.controller('addPostCtrl',
            function HomeController($scope, $http,uuid, logee,FileUploader, $rootScope, $filter, $location, auth){

            //end geolocation
            //location scope is empty
              $scope.location = '';
            // date pick option
              $scope.today = function() {
                $scope.dt = new Date();
                console.log("today button pressed");
              };
              $scope.open = function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              $scope.opened = true;
              };
              $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
              };
              /* uuid generated */
              $scope.new = uuid.new();
              $scope.nInfo = new Date();

              /* tags */
              $scope.tag = 1;

              $scope.formats = ['yyyy/MM/dd','dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
              $scope.format = $scope.formats[0];
              // on submit button do post and collect data
               $scope.submitForm = function() {
                      var formData = {uid: auth.profile.user_id, heading: $scope.heading,
                                      latitude: $scope.location.latitude, longitude: $scope.location.longitude,
                                      content: $scope.content, pict: $scope.new, date: $scope.dt};
                      logee.addLog(formData).success(function(data){
                      });
                };
                //reset form
                 $scope.master = {};
                 $scope.maste = "";
                 $scope.reset = function() {
                     $scope.form = angular.copy($scope.master);
                     $scope.dt = angular.copy($scope.master);
                     console.log("reset has been pressed");
                };

                $scope.uploader = new FileUploader();
                  //filter utitlity function
                  $scope.customArrayFilter = function (item){
                    return (item.postHeading.indexOf('it') != -1);

                };

              /*  $rootScope.addPic = function(){
                  console.log('this is this pictures nameeeeeeeeeeeeeeeeeee',$rootScope.Filefile);

                  var pictureData = {uid: auth.profile.user_id, uniqueID: $scope.new, picName: $rootScope.Filefile, tag: $scope.tag};
                  logee.addPicture(pictureData).success(function(data){
                    console.log("aaaaaaaaaaaa: ",data);
                  });
                }
*/

                //add pictures
                 var uploader = $scope.uploader = new FileUploader({
                     url: 'api/uploadPic.php'
                 });
/*
                 var pictureData = {uid: auth.profile.user_id, uniqueID: $scope.new, picName: fileItem.file.name, tag: $scope.tag};
                 log.addPicture(pictureData).success(function(data){
               });
*/
                 uploader.filters.push({
                     name: 'imageFilter',
                     fn: function(item /*{File|FileLikeObject}*/, options) {
                         var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                         return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                     }
                 });

                 // CALLBACKS

                 uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                     console.info('onWhenAddingFileFailed', item, filter, options);
                 };
                 uploader.onAfterAddingFile = function(fileItem) {
                    //adds random name to picture
                   var fileExtension = '.' + fileItem.file.name.split('.').pop();
                  fileItem.file.name = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
                     console.info('onAfterAddingFile', fileItem);
                     console.info("this is name: ",fileItem.file.name);



                 };
                 uploader.onAfterAddingAll = function(addedFileItems) {
                     console.info('onAfterAddingAll', addedFileItems);
                 };
                 uploader.onBeforeUploadItem = function(item) {
                     console.info('onBeforeUploadItem', item);
                 };
                 uploader.onProgressItem = function(fileItem, progress) {
                     console.info('onProgressItem', fileItem, progress);
                 };
                 uploader.onProgressAll = function(progress) {
                     console.info('onProgressAll', progress);
                 };
                 uploader.onSuccessItem = function(fileItem, response, log, status, headers) {
                   $rootScope.Filefile = fileItem.file.name;
                   console.log('this is this pictures name', fileItem.file.name);
                     console.info('onSuccessItem', fileItem, response, status, headers);

                     var pictureData = {uid: auth.profile.user_id, uniqueID: $scope.new, picName: fileItem.file.name, tag: $scope.tag};
                     logee.addPicture(pictureData).success(function(data){
                       console.log("aaaaaaaaaaaa: ",data);
                     });

                 };
                 uploader.onErrorItem = function(fileItem, response, status, headers) {
                     console.info('onErrorItem', fileItem, response, status, headers);
                 };
                 uploader.onCancelItem = function(fileItem, response, status, headers) {
                     console.info('onCancelItem', fileItem, response, status, headers);
                 };
                 uploader.onCompleteItem = function(fileItem, response, status, headers) {
                     console.info('onCompleteItem', fileItem, response, status, headers);


                 };
                 uploader.onCompleteAll = function() {
                     console.info('onCompleteAll');
                     $location.path("/");
                 };
                 console.info('uploader', uploader);
        });
        angular.module('OtdDirectives', []).
                    directive('googlePlaces', function(){
                        return {
                            restrict:'E',
                            replace:true,
                            // transclude:true,
                            scope: {location:'='},
                            template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/>',
                            link: function($scope, elm, attrs){
                                var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
                                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                                    var place = autocomplete.getPlace();
                                    $scope.location = {latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()};
                                    $scope.$apply();
                                });
                            }
                        }
                    });
