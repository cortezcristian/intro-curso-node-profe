'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ProductNewCtrl
 * @description
 * # ProductNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ProductNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('products').post($scope.product).then(function(product) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/product";
      } else {
        $location.path('/crud/product');
      }
    });
  }
});
