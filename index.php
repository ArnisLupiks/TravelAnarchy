<!DOCTYPE html>
<html ng-app="TravelMate" ng-controller="AppCtrl">
  <head>
    <title ng-bind="pageTitle"></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.css" rel="stylesheet">
  <link rel="stylesheet" href="css/custom.css">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <!--<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet"> -->
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="app.css">
  <link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,800,600,300,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="js/responsiveslides.css">



  </head>
  <body>
    <div ng-include="'partials/authenticated/authenticated.html'" ng-show="isAuthenticated"></div>
    <div flash-message="2000" ></div>
    <div class="container" ng-view></div>

    <script src='//maps.googleapis.com/maps/api/js?libraries=places&sensor=false'></script>

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> <!-- Jquery -->
    <script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.9.0/ui-bootstrap-tpls.min.js"></script>

      <script type="text/javascript" src="auth0-variables.js"></script>
      <script type="text/javascript" src="https://cdn.auth0.com/js/auth0-lock-6.js"></script>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.17/angular-cookies.js"></script>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.17/angular-route.js"></script>
      <script type="text/javascript" src="https://cdn.auth0.com/w2/auth0-angular-4.js"></script>
      <script type="text/javascript" src="https://cdn.rawgit.com/auth0/angular-storage/master/dist/angular-storage.js"></script>
      <script type="text/javascript" src="js/salvattore.min.js"></script>
      <script src="js/responsiveslides.min.js"></script>

      <script src="js/custom.js"></script>


      <script src="//cdn.rawgit.com/auth0/angular-jwt/master/dist/angular-jwt.js" type="text/javascript"> </script>
      <script type="text/javascript" src="app.js"></script>

      <!-- bower components -->
    <script  src = "bower_components/lodash/dist/lodash.js"></script>
    <script src = "bower_components/angular-google-maps/dist/angular-google-maps.js"></script>
    <script src = "bower_components/ngmap/build/scripts/ng-map.min.js"></script>
    <script src="bower_components/ngmap/app/scripts/app.js"></script>
  <script src="bower_components/ngmap/app/scripts/directives/map_controller.js"></script>
  <script src="bower_components/ngmap/app/scripts/directives/map.js"></script>
  <script src="bower_components/ngmap/app/scripts/directives/marker.js"></script>

  <script src="bower_components/ngmap/app/scripts/directives/shape.js"></script>
  <script src="bower_components/ngmap/app/scripts/services/geo_coder.js"></script>
  <script src="bower_components/ngmap/app/scripts/services/navigator_geolocation.js"></script>
  <script src="bower_components/ngmap/app/scripts/services/attr2_options.js"></script>


    <script src = "bower_components/ng-file-upload/angular-file-upload-shim.js"></script>
    <script src = "bower_components/ng-file-upload/angular-file-upload.js"></script>
    <script src = "bower_components/auth0-lock/build/auth0-lock.min.js"></script>
    <script src = "bower_components/auth0-angular/build/auth0-angular.min.js"></script>
    <script src = "bower_components/angular-file-upload/angular-file-upload.min.js"></script>
    <script src = "bower_components/a0-angular-storage/dist/angular-storage.min.js"></script>
    <script src = "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script src = "bower_components/angular-flash-alert/dist/angular-flash.min.js"></script>
    <script src = "bower_components/moment/moment.js"></script>
    <script src = "bower_components/angular-moment/angular-moment.js"></script>

    <script src = "bower_components/angularjs-geolocation/src/geolocation.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ng-dialog/0.2.3/js/ngDialog.min.js"></script>

      <!-- App partials &****************************************-->
     <script type="text/javascript" src="partials/login/login.js"></script>
     <script type="text/javascript" src="partials/authenticated/authenticated.js"></script>
     <script type="text/javascript" src="partials/allPosts/allPosts.js"></script>

     <script type="text/javascript" src="partials/addPosts/addPosts.js"></script>
     <script type="text/javascript" src="partials/profile/profile.js"></script>
     <script type="text/javascript" src="partials/newMessage/newMessage.js"></script>
     <script type="text/javascript" src="partials/messages/messages.js"></script>
     <script type="text/javascript" src="partials/favoriteLogs/favorite.js"></script>
     <script type="text/javascript" src="partials/friends/friends.js"></script>

  </body>

</html>
