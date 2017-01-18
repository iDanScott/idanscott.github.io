function bus(id, route) {
  this.id = id;
  this.route = route;
  this.x = route.startX;
  this.y = route.startY;
  this.isAtStop = false;
  this.waitTimer = 0;
  this.shouldWait = 100;
}