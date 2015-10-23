'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ProductCtrl', function ($scope, Restangular) {
   $scope.products = Restangular.all("products").getList().$object;
  });
