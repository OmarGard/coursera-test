(function () {
    "use strict";
    
    angular.module('common')
    .service('UserInfoService', UserInfoService);
    UserInfoService.$inject = ['$http', 'ApiPath'];
    function UserInfoService($http, ApiPath) {
      var usrInfoService = this;
      usrInfoService.userInfo = {
        firstName: "",
        lastName: "",
        email:"",
        phone:"",
        menuNumber: "",
        title:"",
        description: "",
        category_short_name : "",
      };

      usrInfoService.getUserInfo = function(){
        return usrInfoService.userInfo;
      }
      usrInfoService.validateMenuNumber = function(menuNumber){
        var promise = $http.get(ApiPath + '/menu_items/'+menuNumber+'.json');
        return promise;
      }
      usrInfoService.updateUserInfo = function(newInfo){
        usrInfoService.userInfo = {
          firstName: newInfo.firstName,
          lastName: newInfo.lastName,
          email:newInfo.email,
          phone:newInfo.phone,
          menuNumber: newInfo.menuNumber,
          description: newInfo.description,
          title: newInfo.title,
          category_short_name: newInfo.category_short_name,
        };
      }
      
    }

})();