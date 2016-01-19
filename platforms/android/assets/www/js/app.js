angular.module('starter', ['ionic', 'ngCordova'])

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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  
  $ionicConfigProvider.tabs.position("buttom");
  $ionicConfigProvider.navBar.alignTitle("center");

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
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        }
      }
    })
    .state('tab.auto', {
      url: '/auto',
      views:{
        'tab-auto':{
          templateUrl: "templates/auto.html",
          controller: "AutoCtrl"
        }
      }
    })
    .state('tab.comunidad', {
      url: '/comunidad',
      views:{
        'tab-comunidad':{
          templateUrl: "templates/comunidad.html",
          controller: "ComunidadCtrl"
        }
      }
    })
    .state('tab.user', {
      url: '/user/:id',
      views:{
        'tab-user':{
          templateUrl: "templates/user.html",
          controller: "UserCtrl"
        }
      }
    })
    .state('tab.datos', {
      url: '/datos',
      views:{
        'tab-datos':{
          templateUrl: "templates/datos.html",
          controller: "DatosCtrl"
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


.controller('HomeCtrl', function($scope){
})

.controller('AutoCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
  $http.get('js/data.json')
    .success(function(data){
      $scope.detalles = data.detalles;
      $scope.data = {
        showReorder: false,
      }
    });

  $scope.toggleDescripcion = function(item){
    item.resumido = !item.resumido;
  }

  $scope.moveItem = function(item, fromIndex, toIndex){
    $scope.detalles.splice(fromIndex, 1);
    $scope.detalles.splice(toIndex, 0, item);
  }

}])

.controller('ComunidadCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
  $http.get('js/data.json')
    .success(function(data){
      $scope.usuarios = data.usuarios;
    });
}])

.controller('UserCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
  $http.get('js/data.json')
    .success(function(data){
      $scope.data = data.usuarios[$state.params.id];
    });
}])

.controller('DatosCtrl', function($scope, $cordovaGeolocation) {

  $scope.getPosition = function(){
    
    var form = this;
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        form.posicion = lat + " | " + long;
      }, function(err) {
        form.posicion = err;
      });
  }

  $scope.sendForm = function(){
    alert(this.nombre + " -- " + this.apellidos);
  }
})
