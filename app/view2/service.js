(function(){
    'use strict';

    angular
        .module('myApp.services',[])
        .factory('fileService', Factory)

    /** @ngInject */
    function Factory($http,$q){
         var restUrl = "http://localhost:8888/test";
         var defer = $q.defer();
         var promise= defer.promise;
        var getMessages = function(){
            
            $http.get(restUrl).success(function(data){
               defer.resolve(data);
            }).error(function(data){
               defer.reject(data);
            });
            return promise;
        };
        return {
            getAll:getMessages
        }

    }

}());