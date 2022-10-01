const clearButton = document.getElementById("clear");
const canvascontainer = document.querySelector(".container");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
let dragging = false;
let color = "#000";
let size = 20;

window.addEventListener("DOMContentLoaded", () => {
  sizeEl.textContent = size;
});

function getMousePosition(e) {
  var mouseX = ((e.offsetX * canvas.width) / canvas.clientWidth) | 0;
  var mouseY = ((e.offsetY * canvas.height) / canvas.clientHeight) | 0;
  return { x: mouseX, y: mouseY };
}

context.mozImageSmoothingEnabled = false;
context.imageSmoothingEnabled = false;

/* CLEAR CANVAS */
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

clearButton.addEventListener("click", clearCanvas);

const putPoint = function (e) {
  e.preventDefault();
  e.stopPropagation();
  if (dragging) {
    context.lineTo(getMousePosition(e).x, getMousePosition(e).y);
    context.lineWidth = size;
    context.strokeStyle = color;
    context.stroke();
    context.beginPath();
    context.arc(getMousePosition(e).x, getMousePosition(e).y, size / 2, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.beginPath();
    context.moveTo(getMousePosition(e).x, getMousePosition(e).y);
  }
};

const engage = function (e) {
  dragging = true;
  putPoint(e);
};
const disengage = function () {
  dragging = false;
  context.beginPath();
};

canvas.addEventListener("mousedown", engage);
canvas.addEventListener("mousemove", putPoint);
canvas.addEventListener("mouseup", disengage);
document.addEventListener("mouseup", disengage);
canvas.addEventListener("contextmenu", disengage);

canvas.addEventListener(
  "touchstart",
  function (e) {
    dragging = true;
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  },
  false
);
canvas.addEventListener(
  "touchmove",
  function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  },
  false
);
canvas.addEventListener("touchend", disengage, false);

decreaseBtn.addEventListener("click", () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  sizeEl.textContent = size;
});

increaseBtn.addEventListener("click", () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }
  sizeEl.textContent = size;
});

colorEl.addEventListener("change", (e) => {
  color = e.target.value;
});
