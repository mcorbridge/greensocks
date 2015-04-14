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
	}])

	.controller('liftCtrl', ['$scope','$rootScope', function($scope, $rootScope){

		var timeLineMax = new TimelineMax({repeat:0, repeatDelay:1});

		$rootScope.$on('verticalScale', function(event, state) {
			retrieveBoxSequence();
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

		var boxes = ['.box1','.box2','.box3','.box4','.box5','.box6'];

		var boxNdx = 0;

		var dropLocation = 700;

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

		var openGripper = function(box){
			boxNdx++;
			if(boxNdx === boxes.length+1)
				return;

			timeLineMax
				.add(moveGrippers(0,0,0.25))
				.to(box, 1, {top:dropLocation, ease:Bounce.easeOut, delay:-0.2})
				.to('.lift', 1, {left:515, onComplete:retrieveBoxSequence});

			dropLocation = dropLocation - 100;
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



