// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'jett.ionic.filter.bar'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// .state('signin', {
	// 	url: '/sign-in',
	// 	templateUrl: 'templates/sign-in.html',
	// 	controller: 'SignInCtrl'
	// })

	.state('login', {
    	cache: false,
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'login_controller'
	})

	.state('signup', {
    	cache: false,
		url: '/signup',
		templateUrl: 'templates/signup.html',
		controller: 'signup_controller'
	})

	// setup an abstract state for the tabs directive
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

	.state('tab.search', {
    	cache: false,
		url: '/search',
		views: {
			'tab-search': {
				templateUrl: 'templates/tab-search.html',
				controller: 'tab_search_controller'
			}
		}
	})

	.state('tab.add_recipe', {
    	cache: false,
		url: '/add_recipe',
		views: {
			'tab-add_recipe': {
				templateUrl: 'templates/add_recipe.html',
				controller: 'add_recipe_controller'
			}
		}
	})

	.state('tab.myRecipes', {
    	cache: false,
		url: '/myRecipes',
		views: {
			'tab-myRecipes': {
				templateUrl: 'templates/tab-myRecipes.html',
				controller: 'tab_myRecipes_controller'
			}
		}
	})

	.state('tab.myRecipesDetails', {
    	cache: false,
		url: '/myRecipes/:recipe_id',
		views: {
			'tab-myRecipes': {
				templateUrl: 'templates/tab-myRecipes-details.html',
				controller: 'tab_details_controller'
			}
		}
	})

	.state('tab.results', {
    	cache: false,
		url: '/results',
		views: {
			'tab-search': {
				templateUrl: 'templates/tab-results.html',
				controller: 'tab_results_controller'
			}
		}
	})

	.state('tab.details', {
    	cache: false,
		url: '/results/:recipe_id',
		views: {
			'tab-search': {
				templateUrl: 'templates/tab-details.html',
				controller: 'tab_details_controller'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	// $urlRouterProvider.otherwise('/tab/dash');
	$urlRouterProvider.otherwise('/login');

	$ionicConfigProvider.tabs.position('bottom'); // other values: top
	$ionicConfigProvider.backButton.text('Back');
	$ionicConfigProvider.backButton.previousTitleText(false);

});