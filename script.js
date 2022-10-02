const clearButton = document.getElementById("clear");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const colorContainer = document.querySelector(".color-container");

let color = "#000000";
let strokeSize = 20;
let x = undefined;
let y = undefined;
window.addEventListener("DOMContentLoaded", () => {});

window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const undo = document.getElementById("undo");
  const save = document.getElementById("save");

  //resizing
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  sizeEl.textContent = strokeSize;
  colorEl.value = color;
  colorContainer.style.backgroundColor = color;
  //variables
  let painting = false;
  let pathsry = [];
  let points = [];

  //functions
  function startPosition(e) {
    painting = true;
    points = [];
    ctx.beginPath();
    if (e.type == "touchstart") {
      ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
      ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      points.push(e.touches[0].clientX, e.touches[0].clientY, strokeSize, color);
    } else if (e.type == "mousedown") {
      ctx.lineTo(e.clientX, e.clientY);
      ctx.moveTo(e.clientX, e.clientY);
      x = e.clientX;
      y = e.clientY;
      points.push(e.clientX, e.clientY, strokeSize, color);
    }

    ctx.lineWidth = strokeSize;
    ctx.strokeStyle = color;
    ctx.stroke();

    draw(e);
  }

  function endPosition() {
    painting = false;
    x = undefined;
    y = undefined;
    pathsry.push(points);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pathsry = [];
    points = [];
  }

  function drawPaths() {
    // delete everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw all the paths in the paths array
    pathsry.forEach((path) => {
      for (let i = 4; i < path.length; i += 4) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = path[i + 2];
        ctx.strokeStyle = path[i + 3];
        ctx.moveTo(path[i], path[i + 1]);
        ctx.lineTo(path[i + 4], path[i + 5]);
        ctx.stroke();
      }
    });
  }

  function Undo() {
    // remove the last path from the paths array
    pathsry.splice(-1, 1);
    // draw all the paths in the paths array
    drawPaths();
  }

  function draw(e) {
    if (!painting) {
      return;
    }

    e.preventDefault();

    ctx.beginPath();
    ctx.lineWidth = strokeSize;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";

    ctx.moveTo(x, y);
    points.push(x, y, strokeSize, color);

    // ctx.lineTo(e.clientX, e.clientY);
    if (e.type == "touchmove") {
      ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else if (e.type == "mousemove") {
      ctx.lineTo(e.clientX, e.clientY);
      x = e.clientX;
      y = e.clientY;
    }
    points.push(x, y, strokeSize, color);
    ctx.stroke();

    //ctx.beginPath();

    // ctx.moveTo(e.clientX, e.clientY);
  }

  //event listeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("touchstart", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("touchend", endPosition);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchmove", draw);
  clearButton.addEventListener("click", clearCanvas);
  undo.addEventListener("click", Undo);

  save.addEventListener("click", function (e) {
    const link = document.createElement("a");
    link.download = "download.jpg";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  });
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
  colorContainer.style.backgroundColor = color;
});
