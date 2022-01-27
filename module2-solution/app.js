(function(){
    'use strict';

    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var list1 = this;
        list1.items = ShoppingListCheckOffService.getToBuyList();
        list1.isToBuyListEmpty = function (){
            return list1.items.length == 0
        }
        list1.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var list2 = this;
        list2.items = ShoppingListCheckOffService.getBoughtList();
        list2.isAlreadyBoughtListEmpty = function(){
            return list2.items.length == 0
        }
    }

    function ShoppingListCheckOffService(){
        var service = this;
        
        // List of shopping items
        var toBuy = [
            { name: "cookies", quantity: 10 },
            { name: "chips", quantity: 2 },
            { name: "chocolates", quantity: 3 },
            { name: "apples", quantity: 4 },
            { name: "bananas", quantity: 5 },
        ];
        var bought = [];
        
        service.getToBuyList = function () {
            return toBuy;
        };
        service.getBoughtList = function () {
            return bought;
        };
        service.buyItem = function (itemIndex) {

            bought.push({
                name: toBuy[itemIndex].name,
                quantity: toBuy[itemIndex].quantity
            });

            toBuy.splice(itemIndex, 1);

        };
    }
    
})();