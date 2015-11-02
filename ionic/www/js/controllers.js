angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $state) {
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tab.search');
  };
})

.controller('SearchCtrl', function($scope, $location, filterBy) {
  $scope.search = function() {
    filterBy.setProperty($('input[name="filterBy"]:checked').val());
    $location.path('/tab/list');
  };
})

.controller('ListCtrl', function($scope, $rootScope, $http, $timeout, $ionicFilterBar, filterBy) {
  if (filterBy.getProperty() !== null) {
    $scope.filterBy = "'"+filterBy.getProperty()+"'";
  } else {
    $scope.filterBy = "'name'";
  }

  var filterBarInstance;

  // get recipes
  function getRecipes() {
    $http.get("https://sheetsu.com/apis/c6ebe75a")
    .success(function(data) {
      $scope.recipes = data.result;
      $('.loader').hide();
      $rootScope.$apply();
    });
  }
  getRecipes();

  $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.recipes,
      update: function (filteredItems, filterText) {
        $scope.recipes = filteredItems;
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
      getRecipes();
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  };
})

.controller('ItemDetailCtrl', function($scope, $stateParams, $http, $rootScope) {
  function searchId(id, arr){
    for (var i=0; i < arr.length; i++) {
        if (arr[i].id.toString() === id) {
          return arr[i];
        }
    }
  }

  function getRecipeIngredients(recipe_id,recipe_ingredients) {
    for (var i = recipe_ingredients.length-1; i >= 0; i--) {
      if (recipe_ingredients[i].recipe_id.toString() !== recipe_id) {
        recipe_ingredients.splice(i,1);
      }
    }
    return recipe_ingredients;
  }

  function getRecipeInstructions(recipe_id,recipe_instructions) {
    for (var i = recipe_instructions.length-1; i >= 0; i--) {
      if (recipe_instructions[i].recipe_id.toString() !== recipe_id) {
        recipe_instructions.splice(i,1);
      }
    }
    return recipe_instructions;
  }

  $scope.all_ingredients = null;
  $scope.recipe_ingredients = null;
  $scope.recipes = null;
  $scope.instructions = null;
  $scope.recipe_id = $stateParams.recipe_id;


  // get recipes
  $http.get("https://sheetsu.com/apis/c6ebe75a")
  .success(function(data) {
    $scope.recipes = data.result;
    $scope.recipe = searchId($scope.recipe_id,$scope.recipes);
    // remove loader
    if ($scope.instructions !== null 
        && $scope.all_ingredients !== null 
        && $scope.recipe_ingredients !== null 
        && $scope.recipes !== null) {
      $('.loader').hide();
      $rootScope.$apply();
    }
  });

  // get all ingredients
  $http.get("https://sheetsu.com/apis/f8d2a320")
  .success(function(data) {
    $scope.all_ingredients = data.result;
    if ($scope.recipe_ingredients !== null) {
      for (var i = 0; i < $scope.recipe_ingredients.length; i++) {
        $scope.recipe_ingredients[i].name = searchId($scope.recipe_ingredients[i].ingredient_id,$scope.all_ingredients).name;
      }
      $scope.ingredients = $scope.recipe_ingredients;
    }
    // remove loader
    if ($scope.instructions !== null 
        && $scope.all_ingredients !== null 
        && $scope.recipe_ingredients !== null 
        && $scope.recipes !== null) {
      $('.loader').hide();
      $rootScope.$apply();
    }
  });

  // get recipe_ingredients
  $http.get("https://sheetsu.com/apis/d96103aa")
  .success(function(data) {
    $scope.recipe_ingredients = getRecipeIngredients($scope.recipe_id,data.result);
    if ($scope.all_ingredients !== null) {
      for (var i = 0; i < $scope.recipe_ingredients.length; i++) {
        $scope.recipe_ingredients[i].name = searchId($scope.recipe_ingredients[i].ingredient_id,$scope.all_ingredients).name;
      }
      $scope.ingredients = $scope.recipe_ingredients;
    }
    // remove loader
    if ($scope.instructions !== null 
        && $scope.all_ingredients !== null 
        && $scope.recipe_ingredients !== null 
        && $scope.recipes !== null) {
      $('.loader').hide();
      $rootScope.$apply();
    }
  });

  // get recipe_instructions
  $http.get("https://sheetsu.com/apis/dc989eff")
  .success(function(data) {
    $scope.instructions = getRecipeInstructions($scope.recipe_id,data.result);
    // remove loader
    if ($scope.instructions !== null 
        && $scope.all_ingredients !== null 
        && $scope.recipe_ingredients !== null 
        && $scope.recipes !== null) {
      $('.loader').hide();
      $rootScope.$apply();
    }
  });

});
