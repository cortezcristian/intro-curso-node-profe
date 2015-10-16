'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ProductEditCtrl
 * @description
 * # ProductEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ProductEditCtrl', function ($scope, $location, Restangular, product) {
  var original = product;
  $scope.product = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.product);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/product";
      } else {
        $location.path('/crud/product');
      }
    });
  };

  $scope.save = function() {
    $scope.product.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/product";
      } else {
        $location.path('/crud/product');
      }
    });
  };
});
