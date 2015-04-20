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

		var liftBottomY = -1830+screenHeight;
		var liftBottomX = (screenWidth/2) - (225/2);
		var tabX = (screenWidth/2) - (40/2);

		var iconMap = [
			{name:'gulp', value:0, div:'.box1'},
			{name:'java', value:1, div:'.box2'},
			{name:'angularjs', value:2, div:'.box3'},
			{name:'bower', value:3, div:'.box4'},
			{name:'nodejs', value:4, div:'.box5'},
			{name:'android', value:5, div:'.box6'},
			{name:'jira', value:6, div:'.box7'},
			{name:'jdo', value:7, div:'.box8'},
			{name:'greensock', value:8, div:'.box9'},
			{name:'git', value:9, div:'.box10'},
			{name:'firebase', value:10, div:'.box11'},
			{name:'flex', value:11, div:'.box12'},
			{name:'sass', value:12, div:'.box13'},
			{name:'appEngine', value:13, div:'.box14'},
			{name:'air', value:14, div:'.box15'},
			{name:'jquery', value:15, div:'.box16'},
			{name:'gradle', value:16, div:'.box17'},
			{name:'mongodb', value:17, div:'.box18'}
		];

		$scope.startSequence = function(){
			TweenMax.to('.start',0.5,{css:{alpha:0}});
			TweenMax.to('.start',0,{css:{visibility:'hidden'}, delay:1});
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
		};

		var moveGrippersBottom = function(Lpos, Rpos, rate){
			rotate_0 = rotate_0 * -1;
			rotate_1 = rotate_1 * -1;
			var tl = new TimelineMax();
			tl
				.to(".LgripperBottom", rate, {x:Lpos},'grab')
				.to(".RgripperBottom", rate, {x:Rpos},'grab')
				.to('.LgearBottom', 1,{rotation:rotate_0},'grab')
				.to('.RgearBottom', 1,{rotation:rotate_1},'grab');
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

			TweenMax.to('.lift', 0, {css:{visibility:"visible", y:-400}});
			TweenMax.to('.liftBottom', 0, {css:{visibility:"visible",x:liftBottomX, y:liftBottomY}});
			TweenMax.to('.header', 0, {css:{visibility:"visible", y:-300}});
			TweenMax.to('.tab', 0, {css:{visibility:"visible", left:tabX}});
			TweenMax.to('.start', 0, {css:{visibility:"visible", left:(screenWidth/2 - 222/2), top:(screenHeight/2 - 300/2)}});
		}



		var liftDropComplete = function(){
			var tl = new TimelineMax({repeat:0, repeatDelay:1});
			if(boxNdx === 17){
				tl
				.to('.lift', 1, {y:-300})
				.to('.liftBottom', 1, {y:liftBottomY-(screenHeight+30)})
				.add(moveGrippersBottom(44,-44,1))
				.to('.liftBottom', 1, {y:liftBottomY-(screenHeight-280)})
				.to('.header',1,{y:0, delay:-1})
				.add(moveGrippersBottom(0,0,1))
				.to('.liftBottom', 1, {y:liftBottomY})
				.to('.tab',1,{css:{alpha:0}, delay:-1.5});

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

			// item currently in placement does not respond to mouse events
			if(currentBox !== null){
				if(currentBox.box === iconItem.div)
					return;
			}

			TweenMax.to(iconItem.div, 0.25,{scale:1});

			if(isPlaced){
				currentItem = item;
				isPlaced = false;
				tlMax
					.to('.lift',1,{y:15})
					.add(moveGrippers(14,-14,1))
					.to('.lift', 1, {x:currentBox.liftX, y:currentBox.dropLocation-130})
					.add(TweenMax.to(currentBox.box, 1,{top:currentBox.dropLocation, left:currentBox.boxOffset, delay:-1}))
					.add(moveGrippers(0,0,1))
					.add(TweenMax.to(currentBox.box, 0.1,{boxShadow:'none', onComplete:continuePlacement}))
			}else{
				currentBox = arrBoxCoords[n];
				isSelecting = true;
				TweenMax.to(currentBox.box, 0, {boxShadow:"10px 10px 10px"})
				tlMax
					.add(moveGrippers(0,0,1))
					.to('.lift', 1, {x:currentBox.liftX, y:currentBox.dropLocation-130})
					.add(moveGrippers(14,-14,1))
					.to('.lift', 1,{x:-400, y:0})
					.add(TweenMax.to(currentBox.box, 1,{top:132, left:176, delay:-1}))
					.add(moveGrippers(0,0,1))
					.to('.lift', 1, {y:-300, onComplete:setIsSelecting})
					.timeScale(2);

				isPlaced = true;
			}
		}

		var continuePlacement = function(){
			$scope.clickIcon(currentItem);
		}

		$scope.doScale = function(item, direction){

			for(var n=0;n<iconMap.length;n++){
				var iconItem = iconMap[n];
				if(item === iconItem.name){
					break;
				}
			}

			// item currently in placement does not respond to mouse events
			if(currentBox !== null){
				if(iconItem.div === currentBox.box)
					return;
			}

			if(direction === 'up'){
				TweenMax.to(iconItem.div, 0.25,{scale:1.25})
				TweenMax.to(iconItem.div, 0, {boxShadow:"10px 10px 10px"})
			}else{
				TweenMax.to(iconItem.div, 0.25,{scale:1})
				TweenMax.to(iconItem.div, 0, {boxShadow:"none"})
			}
		}

		 // --------------------- start the ball rolling -----------------------------
		setIconLocation();


	}])





