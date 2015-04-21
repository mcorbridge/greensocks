/**
 * Created by Mike on 4/20/2015.
 */

/* global angular */
/* jslint node: true */
'use strict';

angular.module('data', [])

	.service('aboutMe', function(){
		this.text = "About Me";
	})

	.service('gulp', function(){
		this.text = "Gulp";
	})

	.service('java', function(){
		this.text = "Java";
	})

	.service('angularjs', function(){
		this.text = "AngularJS";
	})