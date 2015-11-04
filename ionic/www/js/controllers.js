angular.module('starter.controllers', ['ionic', 'ion-autocomplete'])

.controller('SignInCtrl', function($scope, $state) {
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tab.search');
  };
})

.controller('SearchCtrl', function($state, $scope, $rootScope, $location, $http, minTime, maxTime, minCost, maxCost, recipes, nutrients, ingredients, selectedItems, recipe_ingredients, recipe_nutrients, instructions) {
  $scope.search = function() {
    minTime.setProperty($('#minTime').val());
    maxTime.setProperty($('#maxTime').val());
    minCost.setProperty($('#minCost').val());
    maxCost.setProperty($('#maxCost').val());
    recipes.setProperty($scope.recipes);
    nutrients.setProperty($scope.nutrients);
    ingredients.setProperty($scope.ingredients);
    selectedItems.setProperty($scope.selectedItems);
    $state.go('tab.list');
  };

  $scope.searchString = "";
  $scope.searchList = function(event) {
    $scope.searchString = $('#search').val();
  }

  $scope.clearSearch = function() {
    $('#search').val("");
    $scope.searchString = "";
  }

  $scope.selectedItems = [];
  $scope.selectItem = function(item) {
    $scope.selectedItems.push(item);
    $scope.items.splice($scope.items.indexOf(item),1);
  }
  $scope.unselectItem = function(item) {
    $scope.items.push(item);
    $scope.selectedItems.splice($scope.selectedItems.indexOf(item),1);
  }

  $scope.setMinQuantity = function(item) {
    var value = $("#"+item.minQuantityId).val();
    if (parseFloat(value) >= 0) {
      $scope.selectedItems.splice($scope.selectedItems.indexOf(item),1);
      item.minQuantity = value;
      $scope.selectedItems.push(item);
    }
  }

  $scope.setMaxQuantity = function(item) {
    var value = $("#"+item.maxQuantityId).val();
    if (parseFloat(value) >= 0) {
      $scope.selectedItems.splice($scope.selectedItems.indexOf(item),1);
      item.maxQuantity = parseFloat(value);
      $scope.selectedItems.push(item);
    }
  }

  String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  String.prototype.toCamelCase = function() {
    return this.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }

  function getNamesAndType(arr,type) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      newArr.push({name: arr[i].name.capitalizeFirstLetter(),type: type, minQuantity: 0, maxQuantity: 0, minQuantityId: "min_"+arr[i].name.toCamelCase(), maxQuantityId: "max_"+arr[i].name.toCamelCase()});
    }
    return newArr;
  }
  
  Array.prototype.unique = function() {
      var a = this.concat();
      for(var i=0; i<a.length; ++i) {
          for(var j=i+1; j<a.length; ++j) {
              if(a[i] === a[j])
                  a.splice(j--, 1);
          }
      }

      return a;
  };

  $scope.items = [];
  $scope.recipes = null;
  $scope.nutrients = null;
  $scope.ingredients = null;

  // get recipes
  $http.get("https://sheetsu.com/apis/c6ebe75a")
  .success(function(data) {
    $scope.recipes = data.result;
    $scope.items = $scope.items.concat(getNamesAndType($scope.recipes,"recipe")).unique();
    $rootScope.$apply();
  });

  // get nutrients
  $http.get("https://sheetsu.com/apis/738b25b1")
  .success(function(data) {
    $scope.nutrients = data.result;
    $scope.items = $scope.items.concat(getNamesAndType($scope.nutrients,"nutrient")).unique();
    $rootScope.$apply();
  });

  // get all ingredients
  $http.get("https://sheetsu.com/apis/f8d2a320")
  .success(function(data) {
    $scope.ingredients = data.result;
    $scope.items = $scope.items.concat(getNamesAndType($scope.ingredients,"ingredient")).unique();
    $rootScope.$apply();
  });

  // get recipe_ingredients
  $http.get("https://sheetsu.com/apis/d96103aa")
  .success(function(data) {
    recipe_ingredients.setProperty(data.result);
  });

  // get recipe_nutrients
  $http.get("https://sheetsu.com/apis/51e3addb")
  .success(function(data) {
    recipe_ingredients.setProperty(data.result);
  });

  // get instructions
  $http.get("https://sheetsu.com/apis/dc989eff")
  .success(function(data) {
    recipe_ingredients.setProperty(data.result);
  });
})

.controller('ListCtrl', function($scope, $rootScope, $http, $timeout, $ionicFilterBar, minTime, maxTime, minCost, maxCost, recipes, nutrients, ingredients, selectedItems) {
  var filterBarInstance;

  function getRecipesByName(name) {
    var recipeArr = recipes.getProperty();
    for (var i = 0; i < recipeArr.length; i++) {
      if (recipeArr[i].name.toUpperCase() == name.toUpperCase()) {
        return recipeArr[i];
      }
    }
  }

  // get recipes
  function getRecipes() {
    $http.get("https://sheetsu.com/apis/c6ebe75a")
    .success(function(data) {
      $scope.recipes = data.result;
      $('.loader').hide();
      $rootScope.$apply();
    });

    // $scope.recipes = [];
    // for (var i = 0, item; i <= selectedItems.length; i++) {
    //   item = selectedItems[i];
    //   if (item.type == "recipe") {
    //     $scope.recipes.push(getRecipesByName(item.name));
    //   } else if (item.type == "nutrient") {

    //   } else if (item.type == "ingredient") {

    //   }
    // }

    // $scope.recipes = recipes;
    // $rootScope.$apply();
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
