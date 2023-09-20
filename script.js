const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");
let balls = 1;
canvas.height = innerHeight;
canvas.width = innerWidth;
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

addEventListener("mousemove", (event) => {
  console.log(event.x, event.y);
  mouse.x = event.x;
  mouse.y = event.y;
});
let center = { x: mouse.x, y: mouse.y };
let angle = 0;
class Circle {
  constructor(distanceFromCenter, radius, color) {
    this.x = innerWidth / 2 + distanceFromCenter * Math.cos(angle);
    this.y = innerHeight / 2 + distanceFromCenter * Math.sin(angle);
    this.radius = radius;
    this.distanceFromCenter = distanceFromCenter;
    this.color = color;
  }
  update() {
    this.y += 1;
    angle += 1000;
    this.draw();
  }
  draw() {
    pen.beginPath();
    pen.fillStyle = this.color;
    pen.arc(
      innerWidth / 2 + this.distanceFromCenter * Math.cos(angle),
      innerHeight / 2 + this.distanceFromCenter * Math.sin(angle),
      this.radius,
      0,
      Math.PI * 2,
      true
    );
    pen.fill();
    pen.closePath();
  }
}
let circles = [];
function init() {
  pen.fillStyle = "rgba(0,0,0,1)";
  pen.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balls; i++) {
    const distanceFromCenter = i * 5;
    const circle = new Circle(
      distanceFromCenter,
      5,
      `hsl(${255 * Math.sin(i * 0.02)},100%,50%)`
    );
    circles.push(circle);
  }
}
window.addEventListener("resize", () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
});
function animate() {
  window.requestAnimationFrame(animate);
  pen.fillStyle = "rgba(0,0,0,0.1)";
  pen.fillRect(0, 0, canvas.width, canvas.height);

  circles.forEach((elem) => {
    elem.update();
  });
}
// window.addEventListener("mousemove", (event) => {
//   mouse.x = event.clientX;
//   mouse.y = event.clientY;
//   angle = Math.atan(mouse.x - center.x / mouse.y - center.y);
// });
init();
setInterval(() => {
  center = { x: mouse.x, y: mouse.y };
  circles = [];
  balls++;
  for (let i = 0; i < balls; i++) {
    const distanceFromCenter = i * 5;
    const circle = new Circle(
      distanceFromCenter,
      2,
      `hsl(${255 * Math.sin(i * 0.02)},100%,50%)`
    );
    circles.push(circle);
  }
}, 100);
animate();
