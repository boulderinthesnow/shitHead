var app = angular.module("GameApp", ['ngRoute']);
app.config(['$routeProvider', '$httpProvider',  function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/game', {
        templateUrl: 'partials/game.html',
        controller: 'GameController'
      })
      // .when('/game', {
      //   templateUrl: 'partials/game.html',
      //   controller: 'CardController'
      // })
}])



