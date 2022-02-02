(function () {
    'use strict';
    
    angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) 
    {
        var service = this;
        service.getAllCategories = function () {
            var config = {
            method: "GET",
            url: (ApiBasePath + "/categories.json"),
            };
            return $http(config).then(function(result){
                return result.data;
            });
        }
        service.getItemsForCategory = function(categoryShortName){
            var config = {
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params: {
                    category: categoryShortName
                }
            };
            return $http(config).then(function(result){
                return result.data;
            });
        }
    }
}());