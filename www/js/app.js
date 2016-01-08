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
  $stateProvider

  //estado abtracto que corresponde a la barra de navegacion
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: "templates/tab.html"
    })

  //cada estado que sigue va a heredad de la plantilla tab. Encontes sera la ruta "/tab/home"
    .state('tab.home', {
      url: '/home',
      views:{
        //name que va en el ion-nav-view en tabs.html
        'tab-home':{
          templateUrl: "templates/home.html"
        }
      }
    })
    .state('tab.auto', {
      url: '/auto',
      views:{
        'tab-auto':{
          templateUrl: "templates/auto.html"
        }
      }
    })
    .state('tab.comunidad', {
      url: '/comunidad',
      views:{
        'tab-comunidad':{
          templateUrl: "templates/comunidad.html"
        }
      }
    })
    .state('tab.datos', {
      url: '/datos',
      views:{
        'tab-datos':{
          templateUrl: "templates/datos.html"
        }
      }
    })
    .state('tab.info', {
      url: '/info',
      views:{
        'info':{
          templateUrl: "templates/info.html"
        }
      }
    })

  $urlRouterProvider.otherwise('/tab/home');
})