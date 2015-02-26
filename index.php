<!DOCTYPE html>
<html>
  <head>
    <title>TravelAnarchy</title>

    <script type="text/javascript" src="//use.typekit.net/iws6ohy.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
	<!-- google maps has been loaded -->
	<script src = "//maps.googleapis.com/maps/api/js?libraries=weather,geometry,visualization,places&sensor=false&language=en&v=3.17"></script>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- font awesome from BootstrapCDN -->
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.17/angular.js"></script>

    <script src="//cdn.auth0.com/w2/auth0-widget-5.js"></script>
    <script src="//cdn.auth0.com/w2/auth0-angular-2.js"> </script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/restangular/1.4.0/restangular.js"></script>
    <!-- bower components -->
	<script type ="text/javascript" src = "bower_components/lodash/dist/lodash.min.js" type = "text/javascript"></script>
	<script type ="text/javascript" src ="bower_components/angular-google-maps/dist/angular-google-maps.min.js" type = "text/javascript"></script>
	<script type ="text/javascript" src = "bower_components/ng-file-upload/angular-file-upload-shim.js"></script>
	<script type = "text/javacript" src = "bower_components/ng-file-upload/angular-file-upload.js"></script>

    <!-- App Javascripts -->

	 <script type="text/javascript" src="app.js"></script>

   <!-- App partials &****************************************-->
    <script type="text/javascript" src="partials/login/login.js"></script>
    <script type="text/javascript" src="partials/authenticated/authenticated.js"></script>
    <script type="text/javascript" src="partials/allPosts/allPosts.js"></script>
    <script type="text/javascript" src="partials/addPosts/addPosts.js"></script>


    <!-- App CSSs -->
    <link rel="stylesheet" type="text/css" href="app.css" />



  </head>
  <body ng-app="sample" ng-controller="AppCtrl">
    <div class="container" ui-view></div>
  </body>
</html>
