'use strict';

var ag = angular.module('myApp.view1', ['ngRoute']);

ag.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]);

ag.controller('View1Ctrl', ['$http', '$scope']);



ag.controller('View1Ctrl', ControllerController);

ControllerController.inject = ['$scope', '$http'];
function ControllerController($scope, $http) {
  var vm = this;
  $http.get('../json/upload.json').success(function (data) {
    $scope.files = data;
    console.log(data);
    var filelist = getFileList($scope.files);
  });

  activate();

  ////////////////

  function activate() { }

  //constructor of file object
  function File(fileName, uploadTime, filepath) {
    this.fileName = fileName;
    this.uploadTime = uploadTime;
    this.filepath = filepath;
  }

  //get uploadTime by filePath
  function getDate(filepath) {
    var arr = filepath.split('/');
    var filename = arr[arr.length - 1];
    var uploadTime = filename.slice(0, 14);
    var date = uploadTime.slice(0, 4) + "/"
      + uploadTime.slice(4, 6) + "/"
      + uploadTime.slice(6, 8) + " "
      + uploadTime.slice(8, 10) + ":"
      + uploadTime.slice(10, 12) + ":"
      + uploadTime.slice(12, 14);

    return date;
  }
  //test
  //console.log(getDate("/Users/fanyunyi/IdeaProjects/ExcelParser/target/ExcelParser/WEB-INF/classes/upload/20170225223934case2.xlsx"));

  function getFileList(files) {
    var filelist = [];

    for (var file of files) {
      var fileD = new File(file.fileName, getDate(file.filePath), file.filePath);
      filelist.push(fileD);
    }

    return filelist;
  }


}
