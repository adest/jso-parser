'use strict';

/* Controllers */


function JsonParserCtrl($scope, jsbeautify) {
	$scope.searchLabel = '';
	$scope.jsoInput = '';
	$scope.jso = {};
	$scope.jsoDisplay = [];
	$scope.json = {};

	$scope.sample1 = function() {
		var jsoString = "{toto: {titi: {tutu1:85, tutu2:'text', tutu3: 4}}}";
		$scope.jsoInput = jsoString;
		$scope.parse(jsoString);
	}
	$scope.parse = function(jso) {
		try {
			//var obj = JSON.parse(jso);
			var jsonFunction = new Function('return ' + jso + ';');
			var obj = jsonFunction();
			$scope.jso = obj;
			$scope.jsoDisplay = _jsonify(obj);
			$scope.json = js_beautify(JSON.stringify(obj), {
	      'indent_size': 2,
	      'indent_char': ' '
	    });
		} catch(err) {
			_clearModel();
			throw err;
		}
	}
	$scope.search = function () {
		var search = $scope.searchLabel;
		_search($scope.jsoDisplay, search);
	}
	$scope.clipboard = function() {
		if (window.clipboardData && clipboardData.setData) {
        clipboardData.setData('text', JSON.stringify($scope.jso));
    }
	}

	// privates
	var _clearModel = function() {
		$scope.jso = {};
		$scope.jsoDisplay = [];
	}

	var _jsonify = function(jso) {
		var result = [];
		if (typeof jso === "object") {
			var keys = Object.keys(jso);
			for (var properties in keys) {
				var item = {};
				var name = keys[properties];
				var value = jso[name];
				var hasChild = typeof value === "object";
				var isFunction = typeof value === "function";
				var isValidType = hasChild || typeof value === "number" || typeof value === "string";

				if (isFunction) {
					value = '<function>';
					isValidType = true;
				}

				if (isValidType) {
					var innerObj = {};
					
					if (hasChild) {
						innerObj = _jsonify(value);
						value = "";
					}

					item.name = name;
					item.hasChild = hasChild;
					item.value = value;
					item.obj = innerObj;
					result.push(item);
				}
			}
		}
		return result;
	}
	var _search = function(obj, search) {
		for (var index in obj) {
			var searchable = obj[index];
			var found = false;
			if (_isFound(searchable.name, search) || _isFound(searchable.value, search)) {
				found = true;
			}
			searchable.found = found;
			if (searchable.hasChild) {
				_search(searchable.obj, search);
			}
		}
	}
	var _isFound = function(text, search) {
		if (typeof text != 'string') {
			return false;
		}
		return text.indexOf(search) != -1;
	}
}
JsonParserCtrl.$inject = ['$scope', 'jsbeautify'];


function NextProjectCtrl($scope) {
};
NextProjectCtrl.$inject = ['$scope'];