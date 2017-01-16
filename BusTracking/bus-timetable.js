//Constants
var DIRECTION_LEFT = 1;
var DIRECTION_DOWN = 2;
var DIRECTION_RIGHT = 3;
var DIRECTION_UP = 4;

var timerContainer;
var speed = 10;
//data containers
var stops = [new stop(1, 100, 50), 
			 new stop(2, 300, 100), 
			 new stop(3, 300, 150)];
			 
var routes = [new route(0, 0, 0, 500, 100, DIRECTION_RIGHT, 
				[new turningPoint(100, 0, DIRECTION_DOWN), 
				 new turningPoint(100, 100, DIRECTION_RIGHT),
				 new turningPoint(300, 100, DIRECTION_DOWN), 
				 new turningPoint(300, 300, DIRECTION_RIGHT), 
				 new turningPoint(500, 300, DIRECTION_UP)],
				[stops[0], 
				 stops[1], 
				 stops[2]]), 
			 new route(1, 100, 100, 800, 300, DIRECTION_DOWN,
				[new turningPoint(100, 300, DIRECTION_RIGHT), 
				 new turningPoint(300, 300, DIRECTION_UP), 
				 new turningPoint(300, 100, DIRECTION_RIGHT), 
				 new turningPoint(500, 100, DIRECTION_DOWN), 
				 new turningPoint(500, 300, DIRECTION_RIGHT)], 
				 [])
				//[new stop(1, 100, 50), 
				 //new stop(2, 50, 100)])
			];
			 
var busses = [new bus(0, routes[0], 0), 
			  new bus(1, routes[1], 0), 
			  new bus(2, routes[0], 1000), 
			  new bus(3, routes[0], 500)]; 
var viewingBusTimetable = -1;

function turningPoint(x, y, direction, hasBeenVisited) {
	this.x = x;
	this.y = y;
	this.direction = direction;
}

function stop(id, x, y) {
	this.id = id;
	this.x = x;
	this.y = y;
}

function you(x, y, atStop) {
	this.x = x;
	this.y = y;
	this.atStop = atStop;
}

function route(id, startX, startY, endX, endY, startDirection, turningPoints, stops) {
	this.turningPoints = turningPoints;
	this.stops = stops;
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	this.startDirection = startDirection;
	this.id = id;
}

function bus(id, route, delay) {
	this.id = id;
	this.x = route.startX;
	this.y = route.startY;
	this.route = route;
	this.direction = route.startDirection;
	this.isAtStop = false;
	this.waitedFor = 0;
	this.shouldWaitFor = 100;
	this.htmlID = "bus-" + id;
	this.delay = delay;
	this.delayCounter = 0;
}

function showBusRoute(id) {
	for (var i =0; i < routes.length; i++) {
		
	}
}


function moveBus(bus) {
	if (bus.delay != 0 && bus.delayCounter != bus.delay) {
		bus.delayCounter += 1;
		return;
	}
	
	if (!bus.isAtStop) {
		switch (bus.direction) {
			case DIRECTION_LEFT:
				bus.x -= 1;
				break;
			case DIRECTION_DOWN:
				bus.y += 1;
				break;
			case DIRECTION_RIGHT:
				bus.x += 1;
				break;
			case DIRECTION_UP: 
				bus.y -=1;
				break;
		}
		
		//check if bus has reached the end of it it's route
		if (bus.x == bus.route.endX && bus.y == bus.route.endY) {
			bus.x = bus.route.startX;
			bus.y = bus.route.startY;
			bus.direction = bus.route.startDirection;
		}
		
		//check to see if the bus needs to change direction 
		for (var i = 0; i < bus.route.turningPoints.length; i++) {
			if (!bus.route.turningPoints[i].hasBeenVisited && 
				 bus.route.turningPoints[i].x == bus.x && 
				 bus.route.turningPoints[i].y == bus.y) {
				bus.direction = bus.route.turningPoints[i].direction;
			}
		}
		
		//make the bus stop if it reaches one of its stops 
		for (var i = 0; i < bus.route.stops.length; i++) {
			if (bus.route.stops[i].x == bus.x && bus.route.stops[i].y == bus.y) {
				bus.isAtStop = true;
			}
		}
		
		//move the bus visibily 
		$("#bus-" + bus.id).css( {"left": bus.x + "px", "top" : bus.y + "px" });
	} else { 
		bus.waitedFor += 1;
		if (bus.waitedFor == bus.shouldWaitFor) {
			bus.isAtStop = false;
			bus.waitedFor = 0;
		}
	}
}

function renderBusses(bus) {
	$("#city-map").append('<div class="bus" id="bus-' + bus.id  + '" style="left:' + bus.x + 'px; top:' + bus.y + 'px;"><i class="fa fa-bus" aria-hidden="true"></i>' + bus.id + '</div>');
}

function renderStops(stop) {
	$("#city-map").append('<p id="stop-' + stop.id + '" class="stop" style="left: ' + stop.x + 'px;top: ' + stop.y + 'px;">' + stop.id + '</p>');
}

function renderRoad(startX, startY, direction, endX, endY) {
	var left; 
	var top; 
	var width = 5;
	var height = 5;
	switch (direction) {
		case DIRECTION_LEFT:
			left = endX;
			top = endY;
			width = startX - endX;
			break;
		case DIRECTION_DOWN:
			left = startX;
			top = startY;
			height = endY - startY;
			break;
		case DIRECTION_RIGHT:
			left = startX;
			top = startY;
			width = endX - startX;
			break;
		case DIRECTION_UP:
			left = endX;
			top = endY;
			height = startY - endY;
			break;
	}
	$("#city-map").append('<div class="road" style="left:' + left + 'px;top:' + top + 'px;width:' + width + 'px;height:' + height + 'px;"></div>');
}

function renderRoutes(route) {
	console.log("rendering route: " + route.id);
	renderRoad(route.startX, route.startY, route.startDirection, route.turningPoints[0].x, route.turningPoints[0].y);
	for (var i = 0; i < route.turningPoints.length - 1; i++) {
		renderRoad(route.turningPoints[i].x, route.turningPoints[i].y, route.turningPoints[i].direction, route.turningPoints[i + 1].x, route.turningPoints[i + 1].y);
	}
	renderRoad(route.turningPoints[route.turningPoints.length -1].x, route.turningPoints[route.turningPoints.length - 1].y, route.turningPoints[route.turningPoints.length - 1].direction, route.endX, route.endY);
}

function infoForRoute(bus) {
	$("#route-stops").empty();
	$("#bus-id").empty();
	$("#bus-id").append(bus.id);
	$("#route-stops").append('Start of route: ' + bus.route.startX + ', ' + bus.route.startY + '</br>');
	$("#route-stops").append('End of route: ' + bus.route.endX + ', ' + bus.route.endY + '</br>');
	for (var i = 0; i < bus.route.stops.length; i++) {
		$("#route-stops").append('<li>Stop ' + (i + 1) + ': ' + bus.route.stops[i].id + ' (' + bus.route.stops[i].x + ', ' + bus.route.stops[i].y + ')</li>');
	}
}

function moveBusses() {
	for (var i = 0; i < busses.length; i++) {
		moveBus(busses[i]);
	}
}

$(function() {
	var busRouteShown = false;
	var stopTimetableShown = false;
	busses.forEach(renderBusses);
	stops.forEach(renderStops);
	routes.forEach(renderRoutes);
	timerContainer = setInterval(moveBusses, speed);
	
	$(".bus").click(function() {
		if (stopTimetableShown) {
			stopTimetableShown = false;
			$("#stop-timetable").hide();
		}
		if (!busRouteShown) {
			$("#bus-route").show();
			busRouteShown = true;
		}	
		for (var i = 0; i < busses.length; i++) {
			if (busses[i].htmlID == $(this).attr('id')) {
				infoForRoute(busses[i]);
			}
		}
		
	});
	$(".stop").click(function() {
		if (busRouteShown) {
			busRouteShown = false;
			$("#bus-route").hide();
		}
		stopTimetableShown = !stopTimetableShown;
		if (stopTimetableShown)
			$("#stop-timetable").show();
		else 
			$("#stop-timetable").hide();
	});
	
});