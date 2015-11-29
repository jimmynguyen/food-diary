angular.module('starter.controllers', ['ionic'])

.controller('login_controller', function($scope, $state, $http, current_user) {
	
	/*
	 * Define scope functions
	 */

	$scope.login = function(user) {
		$http.post('https://enigmatic-brook-4902.herokuapp.com/users/login', user)
		.success(function(user) {
			if (user.length > 0) {
				current_user = user;
				$scope.user.email = "";
				$scope.user.password = "";
				$state.go('tab.search');
			} else  {
				$scope.login_message = "Incorrect login credentials";
			}
		});
	};
	$scope.loginAsGuest = function() {
		current_user = null;
		$state.go('tab.search');
	}
	$scope.signup = function() {
		$state.go('signup');
	};

	/*
	 * Hide loader
	 */

	$('.loader').hide();

	/*
	 * Initialize variables
	 */

	$scope.user = {
		email: "",
		password: ""
	};
	$scope.login_message = null;
})

.controller('signup_controller', function($scope, $state, $http) {

	/*
     * Define js functions
     */

    function isValidEmail(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	}
	function isEmailAvailable(email) {
		var isAvailable = true;
		for (var i = 0; i < $scope.emails.length; i++) {
			if ($scope.emails[i].email == email) {
				isAvailable = false;
				break;
			}
		}
		return isAvailable;
	}

	/*
	 * Define scope functions
	 */

	$scope.getEmails = function() {
		$http.get('https://enigmatic-brook-4902.herokuapp.com/users/getEmails')
		.success(function(data) {
			$scope.emails = data;
		});
	}
	$scope.register = function(user) {
		if (false == isValidEmail(user.email)) {
			$scope.register_message = "Please enter a valid email";
		} else if (false == isEmailAvailable(user.email)) {
			$scope.register_message = "An account with this email already exists. Please use a different email";
		} else if (false == (user.password == user.password_confirmation)) {
			$scope.register_message = "The passwords do not match";
		} else {
			$http.post('https://enigmatic-brook-4902.herokuapp.com/users/create', user)
			.success(function(data) {
				if (false == data.error) {
					$state.go('login');
				}
			});	
		}
	};

	/*
	 * Show loader
	 */

	$('.loader').hide();

	/*
	 * Initialize variables
	 */

	$scope.register_message = null;
	$scope.getEmails();

	/*
	 * Hide loader
	 */

	$('.loader').hide();
})

.controller('tab_search_controller', function($state, $scope, $http, database, sharedProperties, current_user) {

	/*
	 * Define prototype functions
	 */

	Array.prototype.unique = function() {
		var a = this.concat();
		for(var i=0; i<a.length; ++i) {
			for(var j=i+1; j<a.length; ++j) {
				if(a[i] === a[j]) {
					a.splice(j--, 1);
				}
			}
		}
		return a;
	};
	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
	String.prototype.toCamelCase = function() {
		return this.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
		}).replace(/\s+/g, '');
	}

	/*
	 * Define scope functions
	 */

	$scope.isDatabaseLoaded = function() {
		return database.ingredients !== null
			&& database.nutrients !== null
			&& database.recipes !== null
			&& database.recipe_ingredients !== null
			&& database.recipe_instructions !== null
			&& database.recipe_nutrients !== null;
	}
	$scope.getItems = function(arr,type) {
		var new_arr = [];
		for (var i = 0; i < arr.length; i++) {
			new_arr.push({
				id: type+arr[i].id,
				name: arr[i].name.capitalizeFirstLetter(),
				type: type,
				operator: "E", // initialize operator to equal
				quantity: null,
				units: $scope.getUnits(parseInt(arr[i].id),type)
			});
		}
		return new_arr;
	}
	$scope.getUnits = function(id,type) {
		var units = null;
		if (type == "N") {
			for (var i = 0; i < database.recipe_nutrients.length; i++) {
				if (parseInt(database.recipe_nutrients[i].nutrient_id) == id
					//&& units.indexOf(database.recipe_nutrients[i].units) < 0
					&& database.recipe_nutrients[i].units !== "NULL") {
					units = database.recipe_nutrients[i].units;
				}
			}
		}
		return units;
	}
	$scope.loadItems = function() {
		if ($scope.isDatabaseLoaded()) {
			$scope.items = $scope.items.concat($scope.getItems(database.ingredients,"I")).unique();
			$scope.items = $scope.items.concat($scope.getItems(database.nutrients,"N")).unique();
			$('.loader').hide();
		}
	}
	$scope.clearSearch = function() {
		$('#search').val("");
		$scope.searchString = "";
	}
	$scope.searchList = function(event) {
		$scope.searchString = $('#search').val();
	}
	$scope.selectItem = function(item) {
		$scope.selectedItems.push(item);
		$scope.items.splice($scope.items.indexOf(item),1);
	}
	$scope.unselectItem = function(item) {
		$scope.items.push(item);
		$scope.selectedItems.splice($scope.selectedItems.indexOf(item),1);
	}
	$scope.isNumber = function(id) {
		var character = $('#'+id).val().substring($('#'+id).val().length-1);
  		if (false == (!isNaN(parseFloat(character)) && isFinite(character))) {
  			$('#'+id).val($('#'+id).val().substring(0,$('#'+id).val().length-1));
  		}
	}
	$scope.search = function() {
		sharedProperties.selectedItems = $scope.selectedItems;
		$state.go('tab.results');
	};

	/*
	 * Show loader
	 */

	$('.loader').show();

	/*
	 * Initialize variables
	 */

	$scope.items = [];
	$scope.selectedItems = [];
	$scope.searchString = "";

	/*
	 * Preload database from Web API
	 */

	// get recipes
	$http.get("https://enigmatic-brook-4902.herokuapp.com/recipes")
	.success(function(data) {
		database.recipes = data;
		$scope.loadItems();
	});
	// get nutrients
	$http.get("https://enigmatic-brook-4902.herokuapp.com/nutrients")
	.success(function(data) {
		database.nutrients = data;
		$scope.loadItems();
	});
	// get all ingredients
	$http.get("https://enigmatic-brook-4902.herokuapp.com/ingredients")
	.success(function(data) {
		database.ingredients = data;
		$scope.loadItems();
	});
	// get recipe_ingredients
	$http.get("https://enigmatic-brook-4902.herokuapp.com/recipe_ingredients")
	.success(function(data) {
		database.recipe_ingredients = data;
		$scope.loadItems();
	});
	// get recipe_nutrients
	$http.get("https://enigmatic-brook-4902.herokuapp.com/recipe_nutrients")
	.success(function(data) {
		database.recipe_nutrients = data;
		$scope.loadItems();
	});
	// get instructions
	$http.get("https://enigmatic-brook-4902.herokuapp.com/recipe_instructions")
	.success(function(data) {
		database.recipe_instructions = data;
		$scope.loadItems();
	});
})

.controller('tab_results_controller', function($scope, $location, $http, $timeout, $ionicFilterBar, database, sharedProperties, current_user) {

	/*
	 * Define js functions
	 */

	function intersect(arr1, arr2) {
		var arr3 = [];
		if (arr1.length <= 0) {
			arr3 = arr2;
		} else if (arr2.length <= 0) {
			arr3 = arr1;
		} else {
			for (var i = 0; i < arr1.length; i++) {
				if (arr2.indexOf(arr1[i]) >= 0) {
					arr3.push(arr1[i]);
				}
			}	
		}
		return arr3;
	}
	function getRecipes() {
		// separate nutrients and ingredients
		var selectedNutrients = [];
		var selectedIngredients = [];
		var selectedNutrients_ids = [];
		var selectedIngredients_ids = [];
		var selectedItems = sharedProperties.selectedItems;
		// If no items are selected, assume they want to see all recipes
		if (selectedItems.length > 0) {
			for (var i = 0; i < selectedItems.length; i++) {
				var item = selectedItems[i];
				if (item.type === 'N') {
					selectedNutrients.push(item);
					selectedNutrients_ids.push(parseInt(item.id.substring(1)));
				} else if (item.type === 'I') {
					selectedIngredients.push(item);
					selectedIngredients_ids.push(parseInt(item.id.substring(1)));
				}
			}

			// get recipes that include all selected ingredients
			var recipe_ingredients = database.recipe_ingredients;
			var anyIngredients_recipeIds = [];
			for (var i = 0; i < recipe_ingredients.length; i++) {
				if (selectedIngredients_ids.indexOf(parseInt(recipe_ingredients[i].ingredient_id)) >= 0
					&& anyIngredients_recipeIds.indexOf(parseInt(recipe_ingredients[i].recipe_id)) < 0) {

					var containsAllIngredientsSelected = true;

					for (var j = 0; j < selectedIngredients_ids.length; j++) {

						// not equal to overall ingredient id (don't want to check again)
						if (selectedIngredients_ids[j] != parseInt(recipe_ingredients[i].ingredient_id)) {

							var isIngredientFound = false;

							// finding entry where ingredient is associated with recipe
							for (var k = 0; k < recipe_ingredients.length; k++) {

								// check if same recipe AND same ingredient
								if (parseInt(recipe_ingredients[i].recipe_id) == parseInt(recipe_ingredients[k].recipe_id)
									&& selectedIngredients_ids[j] == parseInt(recipe_ingredients[k].ingredient_id)) {
									isIngredientFound = true;
									break;
								}
							}

							if (false == isIngredientFound) {
								containsAllIngredientsSelected = false;
								break;
							}
						}
					}

					// add recipe if it contains all ingredients
					if (containsAllIngredientsSelected) {
						anyIngredients_recipeIds.push(parseInt(recipe_ingredients[i].recipe_id));
					}
				}
			}

			// get recipes that include all selected nutrients
			var recipe_nutrients = database.recipe_nutrients;
			var anyNutrients_recipeIds = [];
			for (var i = 0; i < recipe_nutrients.length; i++) {
				var nutrient_id = parseInt(recipe_nutrients[i].nutrient_id);
				var nutrient_quantity = parseFloat(recipe_nutrients[i].quantity);
				var recipe_id = parseInt(recipe_nutrients[i].recipe_id);
				var index = selectedNutrients_ids.indexOf(nutrient_id);
				// if current nutrient is a selected nutrient
				if (index >= 0) {
					// if the quantity is not null
					if ($scope.isQuantitySufficient(selectedNutrients[index].operator,
											 parseFloat(selectedNutrients[index].quantity),
											 nutrient_quantity))
					{

						// check that all nutrients selected are contained in the recipe
						var containsAllNutrientsSelected = true;

						for (var j = 0; j < selectedNutrients_ids.length; j++) {

							// not equal to overall nutrient id (don't want to check again)
							if (selectedNutrients_ids[j] != nutrient_id) {

								var isNutrientFound = false;

								// finding entry where nutrient is associated with recipe
								for (var k = 0; k < recipe_nutrients.length; k++) {

									// check if same recipe AND same nutrient
									if (recipe_id == parseInt(recipe_nutrients[k].recipe_id)
										&& selectedNutrients_ids[j] == parseInt(recipe_nutrients[k].nutrient_id)
										&& $scope.isQuantitySufficient(selectedNutrients[j].operator,
																parseFloat(selectedNutrients[j].quantity),
																parseFloat(recipe_nutrients[k].quantity))) {
										isNutrientFound = true;
										break;
									}
								}

								if (false == isNutrientFound) {
									containsAllNutrientsSelected = false;
									break;
								}
							}
						}

						// add recipe if it contains all nutrients at correct quantities
						if (containsAllNutrientsSelected) {
							anyNutrients_recipeIds.push(parseInt(recipe_nutrients[i].recipe_id));	
						}
					}
				}
			}

			// find intersection (i.e. recipes that satisfy both the ingredient requirement AND the nutrient requirement)
			var recipe_ids = intersect(anyNutrients_recipeIds,anyIngredients_recipeIds);

			$scope.recipes = [];
			for (var i = 0; i < database.recipes.length; i++) {
				if (recipe_ids.indexOf(parseInt(database.recipes[i].id)) >= 0) {
					$scope.recipes.push(database.recipes[i]);
				}
			}
		} else {
			$scope.recipes = database.recipes;
		}

		var recipes = [];
		for (var i = 0; i < $scope.recipes.length; i++) {
			recipes.push({
				id: $scope.recipes[i].id,
				name: $scope.recipes[i].name,
				cost: parseFloat($scope.recipes[i].cost),
				cost_str: $scope.recipes[i].cost,
				time: parseFloat($scope.recipes[i].time),
				time_str: $scope.recipes[i].time
			});
		}
		$scope.recipes = recipes;
	}

	/*
	 * Define scope functions
	 */

	$scope.isQuantitySufficient = function(operator,desired_quantity,actual_quantity) {
		var isSufficient = false;

		if (desired_quantity !== null) {
			// check quantity depending on operator
			if (operator == 'L') {
				if (actual_quantity < desired_quantity) {
					isSufficient = true;
				}
			} else if (operator == 'E') {
				if (actual_quantity == desired_quantity) {
					isSufficient = true;
				}
			} else if (operator == 'G') {
				if (actual_quantity > desired_quantity) {
					isSufficient = true;
				}
			}
		}
		return isSufficient;
	}
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
	$scope.viewDetails = function(id) {
		$location.path('/tab/results/'+id.toString());
	}

	/*
	 * Show loader
	 */

	$('.loader').show();

	/*
	 * Initialize variables
	 */

	var filterBarInstance;
	$scope.orderBy = 'name';
	getRecipes();

	/*
	 * Hide loader
	 */

	$('.loader').hide();
})

.controller('tab_details_controller', function($scope, $stateParams, $http, database, current_user) {

	/*
	 * Define js functions 
	 */

	function getItemById(id, arr){
		for (var i=0; i < arr.length; i++) {
			if (parseInt(arr[i].id) === parseInt(id)) {
				return arr[i];
			}
		}
	}
	function getItemByRecipeId(recipe_id,items) {
		for (var i = items.length-1; i >= 0; i--) {
			if (parseInt(items[i].recipe_id) !== parseInt(recipe_id)) {
				items.splice(i,1);
			}
		}
		return items;
	}

	/*
	 * Define scope functions
	 */

	$scope.loadData = function() {
		$scope.recipe = getItemById($stateParams.recipe_id, database.recipes);
		$scope.getIngredients($stateParams.recipe_id);
		$scope.getInstructions($stateParams.recipe_id);
		$scope.getNutrients($stateParams.recipe_id);
	}
	$scope.getIngredients = function(recipe_id) {
		var recipe_ingredients = database.recipe_ingredients.slice();
		var ingredients = getItemByRecipeId(recipe_id,recipe_ingredients);
		for (var i = 0; i < ingredients.length; i++) {
			ingredients[i].name = getItemById(ingredients[i].ingredient_id,database.ingredients).name;
		}
		$scope.ingredients = ingredients;
	}
	$scope.getInstructions = function(recipe_id) {
		var recipe_instructions = database.recipe_instructions.slice();
		var instructions = getItemByRecipeId(recipe_id,recipe_instructions);
		$scope.instructions = [];
		for (var i = 0; i < instructions.length; i++) {
			$scope.instructions.push({
				description: instructions[i].description,
				step_number: parseInt(instructions[i].step_number)
			});
		}
	}
	$scope.getNutrients = function(recipe_id) {
		var recipe_nutrients = database.recipe_nutrients.slice();
		var nutrients = getItemByRecipeId(recipe_id,recipe_nutrients);
		for (var i = 0; i < nutrients.length; i++) {
			nutrients[i].name = getItemById(nutrients[i].nutrient_id,database.nutrients).name;
		}
		$scope.nutrients = nutrients;
	}

	/*
	 * Show loader
	 */

	$('.loader').show();

	/*
	 * Initialize variables
	 */

	$scope.loadData();

	/*
	 * Hide loader
	 */

	$('.loader').hide();
});