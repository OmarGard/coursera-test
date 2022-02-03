(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['UserInfoService'];
    function SignUpController(UserInfoService) 
    {
      var signUpCtrl = this;
      signUpCtrl.firstName = "";
      signUpCtrl.lastName = "";
      signUpCtrl.email = "";
      signUpCtrl.phone = "";
      signUpCtrl.menuNumber = "";
      signUpCtrl.infoUpdated = false;
      signUpCtrl.error = false;

      signUpCtrl.submit= function(){
        signUpCtrl.infoUpdated = false;
        signUpCtrl.error = false;
        var menuNumberValidation = UserInfoService.validateMenuNumber(signUpCtrl.menuNumber);
        menuNumberValidation.then(function(response){
          var newInfo = {
            firstName: signUpCtrl.firstName,
            lastName: signUpCtrl.lastName,
            email:signUpCtrl.email,
            phone:signUpCtrl.phone,
            menuNumber: signUpCtrl.menuNumber,
            description: response.data.description,
            title: response.data.name,
            category_short_name: response.data.category_short_name
          };
          UserInfoService.updateUserInfo(newInfo);
          

          signUpCtrl.infoUpdated = true;
          
        }).catch(function(error){
          signUpCtrl.error = true;
        });
      }
    }
   
    
})();
    