'use strict';
var an = angular.module('myApp.view2', ['ngRoute','myApp.services']);
an.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}]);

an.controller('View2Ctrl', ['$scope','fileService']);



an.controller('View2Ctrl', ControllerCtrl);

    // ControllerCtrl.inject = ['$scope','fileService'];
    /** @ngInject */
    // function ControllerCtrl($scope,fileService){
    //     $scope.messages = fileService.getAll();
    // }
    function ControllerCtrl($scope,fileService){
        $scope.messages = fileService.getAll().then(function(data){
           $scope.messages = data;
           
        });
       
        
    }
        

