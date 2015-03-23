<!DOCTYPE html>
<html ng-app="TravelMate" ng-controller="AppCtrl">
  <head>
    <title ng-bind="pageTitle"></title>


    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- font awesome from BootstrapCDN -->
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/custom.css">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="css/ngDialog-theme-default.css">
  <link rel="stylesheet" href="css/ngDialog-theme-plain.css">
  <link rel="stylesheet" href="css/ngDialog.css">

  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.17/angular.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> <!-- Jquery -->
  <script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

  <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.9.0/ui-bootstrap-tpls.min.js"></script>
    <!-- font awesome from BootstrapCDN -->
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="app.css">


    <script type="text/javascript" src="auth0-variables.js"></script>
    <script type="text/javascript" src="https://cdn.auth0.com/js/auth0-lock-6.js"></script>

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.17/angular-cookies.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.17/angular-route.js"></script>
    <script type="text/javascript" src="https://cdn.auth0.com/w2/auth0-angular-4.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/auth0/angular-storage/master/dist/angular-storage.js"></script>
    <script src="//cdn.rawgit.com/auth0/angular-jwt/master/dist/angular-jwt.js" type="text/javascript"> </script>
    <script type="text/javascript" src="app.js"></script>
    <!-- bower components -->
  <script type ="text/javascript" src = "bower_components/lodash/dist/lodash.min.js" type = "text/javascript"></script>
  <script type ="text/javascript" src = "bower_components/angular-google-maps/dist/angular-google-maps.min.js" type = "text/javascript"></script>
  <script type ="text/javascript" src = "bower_components/ng-file-upload/angular-file-upload-shim.js"></script>
  <script type = "text/javacript" src = "bower_components/ng-file-upload/angular-file-upload.js"></script>
  <script type = "text/javacript" src = "bower_components/auth0-lock/build/auth0-lock.min.js"></script>
  <script type = "text/javacript" src = "bower_components/auth0-angular/build/auth0-angular.min.js"></script>
  <script type = "text/javacript" src = "bower_components/angular-file-upload/angular-file-upload.min.js"></script>
  <script type = "text/javacript" src = "bower_components/a0-angular-storage/dist/angular-storage.min.js"></script>
  <script type = "text/javacript" src = "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/ng-dialog/0.2.3/js/ngDialog.min.js"></script>




    <!-- App partials &****************************************-->
   <script type="text/javascript" src="partials/login/login.js"></script>
   <script type="text/javascript" src="partials/authenticated/authenticated.js"></script>
   <script type="text/javascript" src="partials/allPosts/allPosts.js"></script>
   <script type="text/javascript" src="partials/addPosts/addPosts.js"></script>
   <script type="text/javascript" src="partials/profile/profile.js"></script>
   <script type="text/javascript" src="partials/newMessage/newMessage.js"></script>
   <script type="text/javascript" src="partials/messages/messages.js"></script>


   <script type="text/javascript" src="js/custom.js"></script>


  </head>
  <body>
    <div ng-include="'partials/authenticated/authenticated.html'" ng-show="isAuthenticated"></div>
    <div class="container" ng-view></div>
  </body>
</html>
