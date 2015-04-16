/* global angular */
/* jslint node: true */
'use strict';

angular.module('app', [])

	.config([ function() {
		console.log('app config');
	}])

	.run([ function() {
		console.log('app run');
	}])

	.controller('angularImageCrtl', ['$scope', '$rootScope', function($scope, $rootScope){

		$scope.foo = 'foo';

		$scope.$watch('foo', function(newValue, oldValue) {
			console.log('----> ' + $scope.foo);
		});

		$rootScope.$on('moveTo', function(event, state) {
			doForward();
		});

		$rootScope.$on('moveBack', function(event, state) {
			doReverse();
		});

		function doForward(){
			TweenMax.to('.angularImage',2,{delay:0.25, x:600, ease:Bounce.easeOut});
		}

		function doReverse(){
			TweenMax.to('.angularImage',2,{delay: 0.25, x:0, ease:Bounce.easeOut});
		}

	}])

	.controller('buttonsCtrl', ['$scope','$rootScope', function($scope, $rootScope){

		$scope.levelOneDrop = function(){
			$rootScope.$emit('levelOneDrop', 'levelOneDrop');
		}

		$scope.levelTwoDrop = function(){
			$rootScope.$emit('levelTwoDrop', 'levelTwoDrop');
		}

		$scope.levelThreeDrop = function(){
			$rootScope.$emit('levelThreeDrop', 'levelThreeDrop');
		}

	}])

	.controller('liftCtrl', ['$scope','$rootScope', '$window', function($scope, $rootScope, $window){

		var screenWidth = $window.screen.availWidth;
		var screenHeight = $window.screen.availHeight;

		var levelOneXoffset = 1800;
		var levelTwoXoffset = 1800;
		var levelThreeXoffset = 1800;

		var levelOneBoxOffset = screenWidth-1223;
		var levelTwoBoxOffset = screenWidth-1223;
		var levelThreeBoxOffset = screenWidth-1223;

		var levelOneDropLocation = 500;
		var levelTwoDropLocation = 400;
		var levelThreeDropLocation = 300;

		var boxes = ['.box1','.box2','.box3','.box4','.box5','.box6','.box7'];
		var dropNdx = 0;
		var boxNdx = 0;

		var timeLineMax = new TimelineMax({repeat:0, repeatDelay:1});


		$rootScope.$on('levelOneDrop', function(event, state) {
			levelOneDrop();
		});

		$rootScope.$on('levelTwoDrop', function(event, state) {
			levelTwoDrop();
		});

		$rootScope.$on('levelThreeDrop', function(event, state) {
			levelThreeDrop();
		});


		var moveGrippers = function(Lpos, Rpos, rate){
			var tl = new TimelineMax();
				tl.to(".Lgripper", rate, {x:Lpos})
				tl.to(".Rgripper", rate, {x:Rpos},0)
		return tl;
		}

		var setIconLocation = function(){
			TweenMax.to('.box1', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box2', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box3', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box4', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box5', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box6', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box7', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
		}

		setIconLocation();

		var liftDropComplete = function(){
			boxNdx++;
			if(dropNdx === 0){
				levelOneDrop();
			}else if(dropNdx === 1) {
				levelTwoDrop();
			}else if(dropNdx === 2) {
				levelThreeDrop();
			}
		}

		 var levelOneDrop = function(){
			var box = boxes[boxNdx];
			timeLineMax
				.to('.lift', 1, {x:screenWidth-740})
				.to('.lift', 1, {y:screenHeight-170})
				.add(moveGrippers(14,-14,1))
				.to('.lift', 1, {y:screenHeight-950})
				.add(TweenMax.to(box, 1,{top:screenHeight-820, delay:-1}))
				.to('.lift', 1, {x:screenWidth-levelOneXoffset})
				.add(TweenMax.to(box, 1,{left:levelOneBoxOffset, delay:-1}))
				.add(moveGrippers(0,0,0.25))
				.add(TweenMax.to(box, 1, {top:levelOneDropLocation, ease:Bounce.easeOut}))
				.to('.lift', 0, {onComplete:liftDropComplete})
				.timeScale(1);

			 dropNdx++;
			 levelOneBoxOffset = levelOneBoxOffset + 150;
			 levelOneXoffset = levelOneXoffset - 150;
		 }

		var levelTwoDrop = function(){
			var box = boxes[boxNdx];
			timeLineMax
				.to('.lift', 1, {x:screenWidth-740})
				.to('.lift', 1, {y:screenHeight-170})
				.add(moveGrippers(14,-14,1))
				.to('.lift', 1, {y:screenHeight-950})
				.add(TweenMax.to(box, 1,{top:screenHeight-820, delay:-1}))
				.to('.lift', 1, {x:screenWidth-levelTwoXoffset})
				.add(TweenMax.to(box, 1,{left:levelTwoBoxOffset, delay:-1}))
				.add(moveGrippers(0,0,0.25))
				.add(TweenMax.to(box, 1, {top:levelTwoDropLocation, ease:Bounce.easeOut}))
				.to('.lift', 0, {onComplete:liftDropComplete});

			dropNdx++;
			levelTwoBoxOffset = levelTwoBoxOffset + 150;
			levelTwoXoffset = levelTwoXoffset - 150;
		}

		var levelThreeDrop = function(){
			var box = boxes[boxNdx];
			timeLineMax
				.to('.lift', 1, {x:screenWidth-740})
				.to('.lift', 1, {y:screenHeight-170})
				.add(moveGrippers(14,-14,1))
				.to('.lift', 1, {y:screenHeight-950})
				.add(TweenMax.to(box, 1,{top:screenHeight-820, delay:-1}))
				.to('.lift', 1, {x:screenWidth-levelThreeXoffset})
				.add(TweenMax.to(box, 1,{left:levelThreeBoxOffset, delay:-1}))
				.add(moveGrippers(0,0,0.25))
				.add(TweenMax.to(box, 1, {top:levelThreeDropLocation, ease:Bounce.easeOut}))
				.to('.lift', 0, {onComplete:liftDropComplete});

			dropNdx = 0;
			levelThreeBoxOffset = levelThreeBoxOffset + 150;
			levelThreeXoffset = levelThreeXoffset - 150;
		}




	}])





