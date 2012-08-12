'use strict';

/* Directives */

// 'collapse'
function CollapseFactory() {
	var directiveDefinitionObject = {
		restrict: 'A',
		// This HTML will replace the zippy directive.
		replace: false,
		transclude: true,
		scope: { title:'@title', isLeaf: '@isLeaf'},
		template: 
			'<span class="title is-leaf-{{isLeaf}}">' +'{{title}}' +'</span>' +
			'<span class="body" ng-transclude></span>',

		// The linking function will add behavior to the template
		link: function(scope, element, attrs) {
			// Title element
			var title = angular.element(element.children()[0]),
			// Opened / closed state
			opened = false;

			// Clicking on title should open/close the zippy
			title.bind('click', toggle);
			 
			// Toggle the closed/opened state
			function toggle() {
				opened = !opened;
				element.removeClass(opened ? 'closed' : 'opened');
				element.addClass(opened ? 'opened' : 'closed');
			}

			// Init 
			toggle();
		}
	}
	return directiveDefinitionObject;
}
//CollapseFactory.$inject = ['module1', 'module2'];

// 'version'
function VersionFactory(version) {
	return function(scope, elm, attrs) {
      elm.text(version);
    };
}
VersionFactory.$inject = ['version'];

// 'app name'
function AppNameFactory(appName) {
	return function(scope, elm, attrs) {
      elm.text(appName);
    };
}
AppNameFactory.$inject = ['appName'];


angular.module('myApp.directives', []).
  directive('appVersion', VersionFactory).
  directive('appName', AppNameFactory).
  directive('collapse', CollapseFactory);
