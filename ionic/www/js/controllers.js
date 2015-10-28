angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tab.dash');
  };
  
})

.controller('DashCtrl', function($scope, $location, filterBy) {
  // 
  $scope.search = function() {
    // alert($('input[name="filterBy"]:checked').val());
    filterBy.setProperty($('input[name="filterBy"]:checked').val());
    $location.path('/tab/list');
  };
})

.controller('ListCtrl', function($scope, $timeout, $ionicFilterBar, filterBy) {

  if (filterBy.getProperty() !== null) {
    $scope.filterBy = "'"+filterBy.getProperty()+"'";
  } else {
    $scope.filterBy = "'name'";
  }

  var filterBarInstance;

  function getItems () {
    var items = [];
    // for (var x = 1; x < 100; x++) {
    //   // items.push({text: 'This is item number ' + x + ' which is an ' + (x % 2 === 0 ? 'EVEN' : 'ODD') + ' number.'});
    //   items.push({value: x, text: 'This is item number ' + x + ' which is an ' + (x % 2 === 0 ? 'EVEN' : 'ODD') + ' number.'});
    // }
    items.push({id: 0, name: 'Chicken Parmesan Casserole', time: 50, cost: 1.07});
    items.push({id: 1, name: 'Spaghetti and Meatballs', time: 45, cost: 1.64});
    items.push({id: 2, name: 'White Vegetarian Lasagna', time: 45, cost: 1.08});
    $scope.items = items;
  }

  getItems();

  $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      }
    });
  };

  $scope.refreshItems = function () {
    if (filterBarInstance) {
      filterBarInstance();
      filterBarInstance = null;
    }

    $timeout(function () {
      getItems();
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ItemDetailCtrl', function($scope, $stateParams) {
  function searchId(id, arr){
    for (var i=0; i < arr.length; i++) {
        if (arr[i].id.toString() === id) {
          return arr[i];
        }
    }
  }

  var ingredients = [];
  ingredients.push({name: 'whole milk', quantity: 2.5, unit: 'cup'});
  ingredients.push({name: 'vegetable broth', quantity: 1, unit: 'cup'});
  ingredients.push({name: 'garlic', quantity: 6, unit: 'cloves'});

  var items = [];
  items.push({id: 0, name: 'Chicken Parmesan Casserole', time: 50, cost: 1.07});
  items.push({id: 1, name: 'Spaghetti and Meatballs', time: 45, cost: 1.64});
  items.push({id: 2, name: 'White Vegetarian Lasagna', time: 45, cost: 1.08});
  // items.push({id: 1, name: 'Chicken Parmesan Casserole', time: '50 minutes', cost: '1.07 per serving'});
  // items.push({id: 2, name: 'Spaghetti and Meatballs', time: '45 minutes', cost: '1.64 per serving'});
  // items.push({id: 3, name: 'White Vegetarian Lasagna', time: '45 minutes', cost: '1.08 per serving'});
  
  $scope.item = searchId($stateParams.itemId,items);
  $scope.ingredients = ingredients;

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
