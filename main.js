import { connect, send } from "./websocket.js";
import { redraw, drawCommand, drawCursor } from "./canvas.js";

const canvas = document.getElementById("canvas");

let userId = crypto.randomUUID();
let tool = "brush";
let color = "#ffffff";
let width = 5;

let commands = [];
let liveCommands = {};
let currentCommand = null;

connect(handleMessage);

function handleMessage(msg) {
  if (msg.type === "SYNC") {
    commands = msg.commands;
    redraw(commands);
  }

  if (msg.type === "DRAW_UPDATE") {
    liveCommands[msg.command.id] = msg.command;
    redraw([...commands, ...Object.values(liveCommands)]);
  }

  if (msg.type === "DRAW_COMMIT") {
    delete liveCommands[msg.command.id];
    commands.push(msg.command);
    redraw(commands);
  }

  if (msg.type === "UNDO" || msg.type === "REDO") {
    commands = msg.commands;
    redraw(commands);
  }

  if (msg.type === "CURSOR") {
    redraw(commands);
    drawCursor(msg.x, msg.y, msg.color);
  }
}

canvas.onmousedown = (e) => {
  currentCommand = {
    id: crypto.randomUUID(),
    userId,
    tool,
    color,
    width,
    points: [{ x: e.offsetX, y: e.offsetY }]
  };
};

canvas.onmousemove = (e) => {
  send("CURSOR", { x: e.offsetX, y: e.offsetY, color });

  if (!currentCommand) return;
  currentCommand.points.push({ x: e.offsetX, y: e.offsetY });
  send("DRAW_UPDATE", currentCommand);
};

canvas.onmouseup = () => {
  if (!currentCommand) return;
  send("DRAW_COMMIT", currentCommand);
  currentCommand = null;
};

document.getElementById("brush").onclick = () => tool = "brush";
document.getElementById("eraser").onclick = () => tool = "eraser";
document.getElementById("color").oninput = e => color = e.target.value;
document.getElementById("width").oninput = e => width = +e.target.value;

document.getElementById("undo").onclick = () => send("UNDO");
document.getElementById("redo").onclick = () => send("REDO");
