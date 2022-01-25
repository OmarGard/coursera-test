(function(){
    'use strict';

    angular.module('LunchCheck',[])
    .controller('LunchCheckController',LunchController);
    
    LunchController.$inject = ['$scope'];
    function LunchController($scope) {
        $scope.lunchList = "";
        $scope.result = "";

        $scope.countLunch = function (){
            if ($scope.lunchList == ""){
                $scope.result = "Please enter data first"
            }
            else
            {
                let array = $scope.lunchList.split(',');
                if (array.length <= 3)
                {
                    $scope.result = "Enjoy!";
                }
                else{
                    $scope.result = "Too much";
                }
            }
            
        };
    }
})();