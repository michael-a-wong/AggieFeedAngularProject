var app = angular.module('myApp', ["ngMaterial"]);  

app.factory('WeatherService', function() {
  var factory = {};

  factory.getRequest= function($http, cityName) {
    //var result; 
    //console.log('MyApp is real'); 
    //console.log(cityName);
    if (cityName == null) {
      cityName = 'Davis'; 
    }
   // console.log(cityName);

    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=6c22e3e9d58f36b919237acd80ba106d'
    }).then(function successCallback(response) {

      var result = {
       "activity" : {
         "icon": "icon-info-sign",
         "actor": {
           "id" : "sourceId",
           "objectType": "person",
           "displayName": "Department Name",
           "author" : {
             "id" : "kName",
             "displayName" : "FirstName LastName"
           },
           "image" : {
             "color" : "#f1c40f"
           }
         },
         "verb": "post",
         "title": response.data.name + "\'s Weather",
         "object": {
           "ucdSrcId" : "content identifier",
           "objectType": "notification",
           "content": response,
           "ucdEdusModel" : {
             "url" : "http://http://api.openweathermap.org/data/2.5/weather?q=",
             "urlDisplayName" : "Open Weather Map",
             "event" : {
               "location": "Event Location",
               "hasStartTime" : true,
               "startDate": "date string",
               "endDate": "date string",
               "isAllDay": false,
               "iCalendar" : "iCal string",
               "addToGoogleCalendar": "string"
             }
           },
           "location" : {
             "displayName": response.data.name,
             "geo" : {
               "latitude": response.data.coord.lon,
               "longitude": response.data.coord.lat
             },
             "geometry" : {
               "type": "Point",
               "coordinates": [response.data.coord.lon, response.data.coord.lat]
             }
           }
         },
         "to" : [
         {
           "id": "<kName>",
           "g": false,
           "i": false
         }
         ],
         "ucdEdusMeta" : {
           "labels" : ["~academic", "some-label"],
           "startDate" : "date string",
           "endDate" : "date string"
         }
       }
     };
     //console.log("IN the function" + result)
     //console.log(result);

     return result; 

      //return response.data;

    }, function errorCallback(response) {
      console.log("THERE WAS AN ERROR!!!!")
    });
  }

  return factory;
});

app.service('WeatherApi', function(WeatherService){
 this.getRequest = function($http, cityName) {
  return WeatherService.getRequest($http, cityName);
}
});

app.controller('myCtrl', function($scope, $http, WeatherApi ) {
  $scope.count = 0;
  $scope.list = []; 

  $scope.apiCall = function () { 
    $scope.count++;

    var get = WeatherApi.getRequest($http, $scope.cityName); 
    get.then(function(result) { 

      //console.log("In the controller" + result); 
      //console.log(result); 

      $scope.list.push(result);

    }); 

    //console.log("This is the List"); 
    //console.log($scope.list[0]); 
  }
})










