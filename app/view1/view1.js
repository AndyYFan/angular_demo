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
    $scope.filelist = getFileList($scope.files);   // filelist{ file}
  //    $scope.rows =  new Array();
  //    for(var i = 0; i<$scope.files.length;i++){
  //      $scope.rows.push(renderColumns(data[2]));
  //    }
     
  // console.log($scope.rows);
  });

  activate();

  ////////////////

  function activate() { }

  //constructor of file object
  function File(fileName, uploadTime, filePath) {
    this.fileName = fileName;
    this.uploadTime = uploadTime;
    this.filePath = filePath;
    this
  }

  //constructor of Column
  function Column(columnIndex, columnName, columnContent) {
    this.columnIndex = columnIndex;
    this.columnName = columnName;
    this.columnContent = columnContent;
  }



  //get uploadTime by filePath
  function getDate(filePath) {
    var arr = filePath.split('/');
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

  /**
   * get FilesBrief Info  { filename, uplaodTime, filepath}
   */
  function getFileList(files) {
    var filelist = [];

    for (var file of files) {
      var fileD = new File(file.fileName, getDate(file.filePath), file.filePath);
      filelist.push(fileD);
    }

    return filelist;
  }


  //find columns detail by filepath on the backend
 function findFileByPath(dataSet,filePath){
    for(var file of dataSet){
      if(file.filePath == filePath){
        return file;
      }
    }
    console.log("cannot find file");
 }

 $scope.showExcel = function(file){
    $scope.fileToShow = findFileByPath($scope.files,file.filePath);
   $scope.rows = renderColumns($scope.fileToShow.columnList);
  };


//将列信息转换为行信息
   var renderColumns = function(columns){
     
    var columnNum = columns.length;
    var column0 = columns[0].cells;
    var rowNum = column0.length;
    var checkboxList = [];
    for(var i=0 ;i < columnNum;i++){
      checkboxList.push(new columnCheckbox(i,false));
    }
    $scope.checkboxList = checkboxList;
    var rows = new Array(rowNum);
    for(var i = 0; i< rowNum; i++){
       rows[i] = new Array();
       for(var j = 0;j<columnNum;j++){
         rows[i][j] = columns[j].cells[i];
       }
    }
   return rows;
  } 


function columnCheckbox(index,status){
  this.index  = index;
  this.status = status;

  this.toggle = function(){
    this.status = !this.status;
  }
}

 $scope.toggleCheckbox=function(checkbox){
  checkbox.status = !checkbox.status;
  console.log("pressed :" + checkbox.index +"status:" +checkbox.status);
}

/**
 * rendering preview data by combining selected columns
 */
function preview(checkboxs,file){

    var columns = file.columnList;
    var preview = [];
    for(var i =0 ;i < checkboxs.length;i++){
      if(checkboxs[i].status == true){
        preview.push(columns[checkboxs[i].index]);
      }
      
    }
    return preview;
}

$scope.showPreview = function(indexes,file){
  var columns = preview(indexes,file);
  $scope.previewContent = renderColumns(columns);
}

/**
 * if confirmed, will post selected column indexes to backend,
 * then get the generated excel filename
 * finally download the file by excel filename
 */




/**
 * test
 */

$scope.msg = "tst";

  
}
