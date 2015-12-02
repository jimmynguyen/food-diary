angular.module('starter.services', [])

.service('database', function() {
	var database = {
		recipes: null,
		nutrients: null,
		ingredients: null,
		recipe_ingredients: null,
		recipe_nutrients: null,
		recipe_instructions: null
	};

	return database;
})
.service('sharedProperties', function () {
	var sharedProperties = {};

	return sharedProperties;
})
.service('current_user', function () {
	var current_user = {
		id: null
	};

	return current_user;
});