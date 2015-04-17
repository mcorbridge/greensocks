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

		$scope.doRotation = function(){
			$rootScope.$emit('rotate', 'rotate');
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

		var levelOneDropLocation = 600;
		var levelTwoDropLocation = 450;
		var levelThreeDropLocation = 300;

		var boxes = ['.box1','.box2','.box3','.box4','.box5','.box6','.box7','.box8','.box9','.box10','.box11','.box12','.box13','.box14','.box15','.box16','.box17','.box18'];
		var dropNdx = 0;
		var boxNdx = 0;

		var animationSpeed = 10;

		var timeLineMax = new TimelineMax({repeat:0, repeatDelay:1});

		var arrBoxCoords = [];

		var isBuilding = true;

		var isSelecting = false;

		var isPlaced = false;

		var iconMap = [
			{name:'gulp', value:0},
			{name:'java', value:1},
			{name:'angularjs', value:2},
			{name:'bower', value:3},
			{name:'nodejs', value:4},
			{name:'android', value:5},
			{name:'jira', value:6},
			{name:'jdo', value:7},
			{name:'greensock', value:8},
			{name:'git', value:9},
			{name:'firebase', value:10},
			{name:'flex', value:1},
			{name:'sass', value:12},
			{name:'appEngine', value:13},
			{name:'air', value:14},
			{name:'jquery', value:15},
			{name:'gradle', value:16},
			{name:'mongodb', value:17}
		];

		$scope.startSequence = function(){
			levelOneDrop();
		}


		$rootScope.$on('levelOneDrop', function(event, state) {
			levelOneDrop();
		});

		$rootScope.$on('levelTwoDrop', function(event, state) {
			levelTwoDrop();
		});

		$rootScope.$on('levelThreeDrop', function(event, state) {
			levelThreeDrop();
		});

		var rotate_0 = 90;
		var rotate_1 = -90;

		var moveGrippers = function(Lpos, Rpos, rate){
			rotate_0 = rotate_0 * -1;
			rotate_1 = rotate_1 * -1;
			var tl = new TimelineMax();
				tl
				.to(".Lgripper", rate, {x:Lpos},'grab')
				.to(".Rgripper", rate, {x:Rpos},'grab')
				.to('.Lgear', 1,{rotation:rotate_0},'grab')
				.to('.Rgear', 1,{rotation:rotate_1},'grab');
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
			TweenMax.to('.box8', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box9', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box10', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box11', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box12', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box13', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box14', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box15', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box16', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box17', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
			TweenMax.to('.box18', 0, {css:{visibility:"visible",left:screenWidth-162, top:screenHeight-50}});
		}

		setIconLocation();

		var liftDropComplete = function(){

			if(boxNdx === 17){

				//timeLineMax
					//.to('.lift', 20, {y:-300, delay:10})

				isBuilding = false;
				return;
			}

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
				.timeScale(animationSpeed);

			var coords = {box:boxes[boxNdx], boxOffset:levelOneBoxOffset, dropLocation:levelOneDropLocation, liftX:screenWidth-levelOneXoffset};
			arrBoxCoords.push(coords);

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

			var coords = {box:boxes[boxNdx], boxOffset:levelTwoBoxOffset, dropLocation:levelTwoDropLocation, liftX:screenWidth-levelTwoXoffset};
			arrBoxCoords.push(coords);

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

			var coords = {box:boxes[boxNdx], boxOffset:levelThreeBoxOffset, dropLocation:levelThreeDropLocation, liftX:screenWidth-levelThreeXoffset};
			arrBoxCoords.push(coords);

			dropNdx = 0;
			levelThreeBoxOffset = levelThreeBoxOffset + 150;
			levelThreeXoffset = levelThreeXoffset - 150;
		};

		var setIsSelecting = function(){
			isSelecting = false;
		}

		var currentBox = null;
		var currentItem = null;

		$scope.clickIcon = function(item){
			var tlMax = new TimelineMax({repeat:0, repeatDelay:1});

			if(isBuilding)
				return;

			if(isSelecting)
				return;

			for(var n=0;n<iconMap.length;n++){
				var iconItem = iconMap[n];
				if(item === iconItem.name){
					break;
				}
			}

			if(isPlaced){
				currentItem = item;
				isPlaced = false;
				tlMax
					.add(moveGrippers(14,-14,1))
					.to('.lift', 1, {x:currentBox.liftX, y:currentBox.dropLocation-130})
					.add(TweenMax.to(currentBox.box, 1,{top:currentBox.dropLocation, left:currentBox.boxOffset, delay:-1}))
					.add(moveGrippers(0,0,1))
					.to('.lift', 0, {onComplete:continuePlacement})
			}else{
				currentBox = arrBoxCoords[n];
				isSelecting = true;
				tlMax
					.add(moveGrippers(0,0,1))
					.to('.lift', 1, {x:currentBox.liftX, y:currentBox.dropLocation-130})
					.add(moveGrippers(14,-14,1))
					.to('.lift', 1,{x:-400, y:0})
					.add(TweenMax.to(currentBox.box, 1,{top:132, left:176, delay:-1}))
					.add(moveGrippers(0,0,1))
					.to('.lift', 0, {onComplete:setIsSelecting})
					.timeScale(2);

				isPlaced = true;
			}
		}

		var continuePlacement = function(){
			$scope.clickIcon(currentItem);
		}


	}])





