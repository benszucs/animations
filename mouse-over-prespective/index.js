// Target the DOM elements
const container = document.getElementById('container');
const inner = document.getElementById('inner');

// Mouse
const mouse = {
  _x: 0,
  _y: 0,
  x: 0,
  y: 0,
  updatePosition: function(event) {
    let e = event || window.event;
    this.x = e.clientX - this._x;
    this.y = (e.clientY - this._y) * -1;
  },
  setOrigin: function(element) {
    this._x =  element.offsetLeft + Math.floor(element.offsetWidth/2);
    this._y =  element.offsetTop + Math.floor(element.offsetHeight/2);
  },
  show: function() { return '(' + this.x + ', ' + this.y + ')'; }
};

// Track the mouse position relative to the center of the container.
mouse.setOrigin(container);

// ------------------------------------------------------------------------

let counter = 0;
let updateRate = 10;
const isTimeToUpdate = function() {
  // updates something every 10 frames?
  return counter++ % updateRate === 0;
};

// ------------------------------------------------------------------------

// Handler Functions: these functions handle the events as they happen.
// We want to decide what happens when the cursor enters, moves over, and leaves the container, so each of those has a handler.
const onMouseEnterHandler = function(event) {
  // Update Function: We haven’t coded this yet but its goal will be to update the 3D rotation of our #inner div.
  // update(event);
};

const onMouseLeaveHandler = function() {
  inner.style = "";
};

const onMouseMoveHandler = function(event) {
  // Time to Update Function: This is another function we haven’t coded yet but it will return true when an update is required.
  // This is a way to reduce the number of calls to the update() function and improve the performance of our script.
  if (isTimeToUpdate()) {
    update(event);
  }
};

// ------------------------------------------------------------------------

const update = function(event) {
  mouse.updatePosition(event);
  updateTransformStyle (
    (mouse.y / inner.offsetHeight/2).toFixed(2),
    (mouse.x / inner.offsetWidth/2).toFixed(2)
  );
};

const updateTransformStyle = function(x, y) {
  let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
  inner.style.transform = style;
  inner.style.webkitTransform = style;
  inner.style.mozTransform = style;
  inner.style.msTransform = style;
  inner.style.oTransform = style;
};

// ------------------------------------------------------------------------

// Event Handlers
container.onmouseenter = onMouseEnterHandler;
container.onmouseleave = onMouseLeaveHandler;
container.onmousemove = onMouseMoveHandler;
