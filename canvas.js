const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export function drawCommand(cmd) {
  ctx.strokeStyle = cmd.tool === "eraser" ? "blue" : cmd.color;
  ctx.lineWidth = cmd.width;
  ctx.lineCap = "round";

  ctx.beginPath();
  cmd.points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
}

export function redraw(commands) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  commands.forEach(drawCommand);
}

export function drawCursor(x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
}
