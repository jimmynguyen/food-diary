angular.module('starter.services', [])

.service('minTime', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
})
.service('maxTime', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
})
.service('minCost', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
})
.service('maxCost', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
})
.service('recipes', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
})
.service('nutrients', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
})
.service('ingredients', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
})
.service('selectedItems', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
})
.service('recipe_ingredients', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
})
.service('recipe_nutrients', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
})
.service('instructions', function () {
	var property = null;

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
});
