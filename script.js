const clearButton = document.getElementById("clear");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");

let color = "black";
let strokeSize = 10;

window.addEventListener("DOMContentLoaded", () => {
  sizeEl.textContent = strokeSize;
});

window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  //resizing
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  //variables
  let painting = false;

  //functions
  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function endPosition() {
    painting = false;
    ctx.beginPath();
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function draw(e) {
    if (!painting) {
      return;
    }

    e.preventDefault();
    ctx.lineWidth = strokeSize;
    ctx.lineCap = "round";

    // ctx.lineTo(e.clientX, e.clientY);
    if (e.type == "touchmove") {
      ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.type == "mousemove") {
      ctx.lineTo(e.clientX, e.clientY);
    }

    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.beginPath();

    // ctx.moveTo(e.clientX, e.clientY);
    if (e.type == "touchmove") {
      ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.type == "mousemove") {
      ctx.moveTo(e.clientX, e.clientY);
    }
  }

  //event listeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("touchstart", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("touchend", endPosition);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchmove", draw);
  clearButton.addEventListener("click", clearCanvas);
});

decreaseBtn.addEventListener("click", () => {
  strokeSize -= 5;
  if (strokeSize < 5) {
    strokeSize = 5;
  }
  sizeEl.textContent = strokeSize;
});

increaseBtn.addEventListener("click", () => {
  strokeSize += 5;
  if (strokeSize > 50) {
    strokeSize = 50;
  }
  sizeEl.textContent = strokeSize;
});

colorEl.addEventListener("change", (e) => {
  color = e.target.value;
});
