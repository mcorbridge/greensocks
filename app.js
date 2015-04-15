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

	.controller('angularImageCrtl', ['$scope', '$rootScope','commonService', function($scope, $rootScope, commonService){

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

	.controller('buttonsCtrl', ['$scope','$rootScope','commonService', function($scope, $rootScope, commonService){


		$scope.moveTo = function(){
			$rootScope.$emit('moveTo', 'moveTo');
			commonService.action('moveTo');
		}

		$scope.moveBack = function(){
			$rootScope.$emit('moveBack', 'moveBack');
			commonService.action('moveBack');
		}

		$scope.verticalScale = function(){
			$rootScope.$emit('verticalScale', 'verticalScale');
		}

		$scope.parallel = function(){
			$rootScope.$emit('parallel', 'parallel');
		}

		$scope.levelOneDrop = function(){
			$rootScope.$emit('levelOneDrop', 'levelOneDrop');
		}
	}])

	.controller('liftCtrl', ['$scope','$rootScope', '$window', function($scope, $rootScope, $window){

		var screenWidth = $window.screen.availWidth;
		var screenHeight = $window.screen.availHeight;

		var timeLineMax = new TimelineMax({repeat:0, repeatDelay:1});

		$rootScope.$on('verticalScale', function(event, state) {
			retrieveBoxSequence();
		});

		$rootScope.$on('levelOneDrop', function(event, state) {
			levelOneDrop();
		});

		$rootScope.$on('levelTwoDrop', function(event, state) {
			levelTwoDrop();
		});

		$rootScope.$on('levelThreeDrop', function(event, state) {
			levelThreeDrop();
		});


		var doOpenGripper = function(){
			openGripper(boxes[boxNdx]);
		}

		var functAnimation = function(){
			var tl = new TimelineMax();
			tl.to(".redBox", 1, {x:550, rotation:360})
				//add second tween at time of 0 seconds
				.to(".blueBox", 1, {x:550, rotation:360}, 0)
				.to(".yellowBox", 1, {rotation:360}, 0)
				.to(".blackBox", 1, {rotation:360}, 0)
				.to(".redBox", 1, {scale:2, opacity:0}, 'wally')
				.to(".blueBox", 1, {scale:2, rotation:0, opacity:0}, 'wally')
				.to(".yellowBox", 3, {scale:2, rotation:0, opacity:0},'wally')
				.to(".blackBox", 3, {scale:2, rotation:0, opacity:0},'wally');
			return tl;
		};

		var boxes = ['.box1','.box2','.box3','.box4','.box5','.box6','.box7'];

		var boxNdx = 0;

		var levelOneDropLocation = 500;

		var moveGrippers = function(Lpos, Rpos, rate){
			var tl = new TimelineMax();
				tl.to(".Lgripper", rate, {x:Lpos})
				tl.to(".Rgripper", rate, {x:Rpos},0)
		return tl;
		}

		var retrieveBoxSequence = function(){
			TweenMax.to(boxes[boxNdx], 1, {css:{visibility:"visible"}});
			timeLineMax
				.to('.lift', 1, {top:-1000, ease:Elastic.easeOut})
				.to('.lift', 0.5, {top:-900})
				.add(moveGrippers(14,-13,1))
				.to('.lift', 1, {top:-1600})
				.add(TweenMax.to(boxes[boxNdx],1,{top:135, delay:-1}))
				.to('.lift', 1, {left:100})
				.add(TweenMax.to(boxes[boxNdx],1,{left:163, delay:-1, onComplete:doOpenGripper}))
				.timeScale(2);
		};

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

		var openGripper = function(box){
			boxNdx++;
			if(boxNdx === boxes.length+1)
				return;

			timeLineMax
				.add(moveGrippers(0,0,0.25))
				.to(box, 1, {top:dropLocation, ease:Bounce.easeOut, delay:-0.2})
				.to('.lift', 1, {left:515, onComplete:retrieveBoxSequence});

			//dropLocation = dropLocation - 100;
		}

		var levelOneXoffset = 1800;
		var levelTwoXoffset = 1800;
		var levelThreeXoffset = 1800;

		var levelOneBoxOffset = screenWidth-1223;
		var dropNdx = 0;

		var liftDropComplete = function(){
			if(dropNdx === 0){
				console.log('levelOneDrop:');
				boxNdx++;
				levelOneDrop();
			}else if(dropNdx === 1) {
				console.log('levelTwoDrop:');
				levelTwoDrop();
				dropNdx++;
			}else if(dropNdx === 2) {
				console.log('levelThreeDrop:');
				levelThreeDrop();
				dropNdx = 0;
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
				.timeScale(2);;

			 levelOneBoxOffset = levelOneBoxOffset + 150;
			 levelOneXoffset = levelOneXoffset - 150;
		 }

		var levelTwoDrop = function(){
			timeLineMax
				.to('.lift', 1, {x:screenWidth-740})
				.to('.lift', 1, {y:screenHeight-170})
				.add(moveGrippers(14,-14,1))
				.to('.lift', 1, {y:screenHeight-950})
				.to('.lift', 1, {x:screenWidth-levelTwoXoffset})
				.to('.lift', 1, {y:screenHeight-700})
				.add(moveGrippers(0,0,0.25))
				.to('.lift', 1, {y:screenHeight-950, onComplete:liftDropComplete});

			levelTwoXoffset = levelTwoXoffset - 150;
		}

		var levelThreeDrop = function(){
			timeLineMax
				.to('.lift', 1, {x:screenWidth-740})
				.to('.lift', 1, {y:screenHeight-170})
				.add(moveGrippers(14,-14,1))
				.to('.lift', 1, {y:screenHeight-950})
				.to('.lift', 1, {x:screenWidth-levelThreeXoffset})
				.to('.lift', 1, {y:screenHeight-900})
				.add(moveGrippers(0,0,0.25))
				.to('.lift', 1, {y:screenHeight-950, onComplete:liftDropComplete});

			levelThreeXoffset = levelThreeXoffset - 150;
		}

		$rootScope.$on('parallel', function(event, state) {
			var tl = new TimelineMax()
			tl.to(".redBox", 1, {x:550, rotation:360})
			//add second tween at time of 0 seconds
			.to(".blueBox", 1, {x:550, rotation:360}, 0)
			.to(".yellowBox", 1, {rotation:360}, 0)
			.to(".blackBox", 1, {rotation:360}, 0)
			.to(".redBox", 1, {scale:2, opacity:0}, 'wally')
			.to(".blueBox", 1, {scale:2, rotation:0, opacity:0}, 'wally')
			.to(".yellowBox", 3, {scale:2, rotation:0, opacity:0},'wally')
			.to(".blackBox", 3, {scale:2, rotation:0, opacity:0},'wally')
		});



	}])

	.service('commonService',function(){
		this.action = function(arg){
			return arg;
		};
	})



