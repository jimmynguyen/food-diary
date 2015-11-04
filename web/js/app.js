
angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));

(function(angular) {
	'use strict';
	
	angular.module('FoodDiary', ['ngRoute'])

	.controller('SearchController', function($scope, $route, $routeParams, $location, $http) {
		$scope.search = function() {
			$location.path('/results');
		}
	})

	.controller('ResultsController', function($scope, $rootScope, $route, $routeParams, $location, $http) {
		$('.loader').show();
	    $http.get("https://sheetsu.com/apis/c6ebe75a")
	    .success(function(data) {
	      $scope.recipes = data.result;
	      $('.loader').hide();
	      $rootScope.$apply();
	    });
	})

	.controller('DetailsController', function($scope, $rootScope, $route, $routeParams, $location, $http) {
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
		$scope.recipe_id = $location.path().substr($location.path().length-1);


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
	})

	// .controller('FigureTableEntryController', function($scope, $location, $routeParams) {
	// 	$scope.id = $routeParams.id;
	// 	$scope.isFigureTableEntryPage = $location.path().search("/figureTableEntry") > -1;
	// 	$('#footer').show();

	// 	$scope.goToWelcomePage = function() {
	// 		$location.path('/welcome/'+$scope.id);
	// 	}

	// 	$scope.$location = $location;
	// 	$scope.rowCount = 1;
	// 	$scope.addRow = function(i) {
	// 		$('#addr'+i).html("<td>"+ (i+1) +"</td><td><input name='name"+i+"' type='text' placeholder='Name' class='form-control input-md'  /> </td><td><input  name='mail"+i+"' type='text' placeholder='Mail'  class='form-control input-md'></td><td><input  name='mobile"+i+"' type='text' placeholder='Mobile'  class='form-control input-md'></td>");
	// 		$('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
	// 		$scope.rowCount++;
	// 	}
	// 	$scope.deleteRow = function(i) {
	// 		if(i>1) {
	// 			$("#addr"+(i-1)).html('');
	// 			$scope.rowCount--;
	// 		}
	// 	}
	// 	$scope.goTo = function(id1,id2) {
	// 		$(id1).fadeOut("slow",function() {
	// 			$(id2).fadeIn("slow");
	// 		});
	// 	}
	// 	$('#figureTableDiv0').fadeIn();
	// 	for (var i = 1; i <= 1; i++) {
	// 		$('#figureTableDiv'+i).hide();
	// 	}
	// })

	// .controller('DataSeriesEntryController', function($scope, $route, $routeParams, $location) {
	// 	$scope.id = $routeParams.id;
	// 	$scope.isDataSeriesEntryPage = $location.path().search("/dataSeriesEntry") > -1;
	// 	$('#footer').show();
	// 	$scope.$route = $route;
	// 	$scope.$location = $location;
	// 	$scope.$routeParams = $routeParams;
	// })

	// .controller('ResponseValueEntryController', function($scope, $route, $routeParams, $location) {
	// 	$scope.id = $routeParams.id;
	// 	$scope.isResponseValueEntryPage = $location.path().search("/responseValueEntry") > -1;
	// 	$scope.$route = $route;
	// 	$scope.$location = $location;
	// 	$scope.$routeParams = $routeParams;
	// })

	// .controller('PageNotFoundController', function($scope, $route, $routeParams, $location) {
	// 	$scope.id = $routeParams.id;
	// 	$('#footer').hide();
	// 	$scope.$route = $route;
	// 	$scope.$location = $location;
	// 	$scope.$routeParams = $routeParams;
	// })

	 // .controller('BookController', function($scope, $routeParams) {
	 //     $scope.name = "BookController";
	 //     $scope.params = $routeParams;
	 // })

	 // .controller('ChapterController', function($scope, $routeParams) {
	 //     $scope.name = "ChapterController";
	 //     $scope.params = $routeParams;
	 // })

	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'templates/search.html',
				controller: 'SearchController'
			})
		    .when('/results', {
		    	templateUrl: 'templates/results.html',
		    	controller: 'ResultsController'
		    })
		    .when('/details/:recipe_id', {
		    	templateUrl: 'templates/details.html',
		    	controller: 'DetailsController'
		    })
		    // .when('/responseValueEntry/:id', {
		    // 	templateUrl: 'assets/templates/responseValueEntry.html',
		    // 	controller: 'ResponseValueEntryController'
		    // })
		    // .when('/pageNotFound', {
		    // 	templateUrl: 'assets/templates/pageNotFound.html',
		    // 	controller: 'PageNotFoundController'
		    // })
		    .otherwise({
		        redirectTo: '/'
		    });

	//      .when('/Book/:bookId', {
			 //    templateUrl: 'book.html',
			 //    controller: 'BookController',
		  //    resolve: {
		  //            // I will cause a 1 second delay
		  //            delay: function($q, $timeout) {
		  //            var delay = $q.defer();
		  //            $timeout(delay.resolve, 1000);
		  //            return delay.promise;
		  //            }
		  //    }
		  //    })
		     // .when('/Book/:bookId/ch/:chapterId', {
		     // templateUrl: 'chapter.html',
		     // controller: 'ChapterController'
		     // });

		// configure html5 to get links working on jsfiddle
		// $locationProvider.html5Mode(true);
	});
})(window.angular);