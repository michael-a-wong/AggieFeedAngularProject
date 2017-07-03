var app = angular.module('myApp', ["ngMaterial"]);  
    app.controller('myCtrl', function($scope, $http) {
      $scope.count = 0;
      $scope.list = []; 

      $scope.apiCall = function() {
        $scope.count++;
        console.log('MyApp is real'); 
        console.log($scope.cityName);
        if ($scope.cityName == null) {
          $scope.cityName = 'Davis'; 
        }
        $http({
          method: 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather?q=' + $scope.cityName + '&APPID=6c22e3e9d58f36b919237acd80ba106d'
        }).then(function successCallback(response) {
            
            $scope.list.push(response.data);
            //console.log(response);

            var jsonResult = {
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

          console.log(jsonResult);
 
          }, function errorCallback(response) {
          });
      } 
    });

    function seccuessCallback(response) {
      console.log(response); 
    }