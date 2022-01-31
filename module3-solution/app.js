(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', foundItemsDirective);

  function foundItemsDirective() {
    var ddo =
    {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&',
      },
      controller: NarrowItDownController,
      controllerAs: 'ctrl',
      bindToController: true
    }
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService', '$filter'];
  function NarrowItDownController(MenuSearchService, $filter) {
    var ctrl = this;
    ctrl.found = [];
    ctrl.textToSearch = "";
    ctrl.searched = false;
    ctrl.search = function () {
      var filteredTerm = $filter('lowercase')(ctrl.textToSearch);
      MenuSearchService.getMatchedMenuItems(filteredTerm).then(function (result) {
        ctrl.found = result;
        ctrl.searched = true;
      });
    };

    ctrl.onRemove = function (indexToRemove) {
      if (ctrl.found.length > 0) {
        ctrl.found.splice(indexToRemove, 1);
      }
    }
    ctrl.nothingFound = function () {
      return ctrl.found.length == 0 && ctrl.searched;
    }

  }
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    service.getMatchedMenuItems = function (searchTerm) {
      var config = {
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      };
      var foundItems = [];
      return $http(config).then(function (result) {
        for (var i = 0; i < result.data.menu_items.length; i++) {
          if (result.data.menu_items[i].description.indexOf(searchTerm) != -1)
            foundItems.push(result.data.menu_items[i]);
        }
        return foundItems;
      });
    };
  }

})();
