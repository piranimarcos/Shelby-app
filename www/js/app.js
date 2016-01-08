angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  var rout = $stateProvider;

  //estado abtracto que corresponde a la barra de navegacion
    rout.state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: "templates/tab.html"
    })

  //cada estado que sigue va a heredad de la plantilla tab. Encontes sera la ruta "/tab/home"
    rout.state('tab.home', {
      url: '/home',
      views:{
        //name que va en el ion-nav-view en tabs.html
        'tab-home':{
          templateUrl: "templates/home.html"
        }
      }
    })



  $urlRouterProvider.otherwise('/tab/home');
})