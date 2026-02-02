const WebSocket = require("ws");
const {
  commands,
  addCommand,
  undo,
  redo
} = require("./drawing-state");

const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({
    type: "SYNC",
    commands
  }));

  ws.on("message", (data) => {
    const msg = JSON.parse(data);

    if (msg.type === "DRAW_UPDATE") {
      broadcast({
        type: "DRAW_UPDATE",
        command: msg.payload
      });
    }

    if (msg.type === "DRAW_COMMIT") {
      addCommand(msg.payload);
      broadcast({
        type: "DRAW_COMMIT",
        command: msg.payload
      });
    }

    if (msg.type === "UNDO") {
      undo();
      broadcast({
        type: "UNDO",
        commands
      });
    }

    if (msg.type === "REDO") {
      redo();
      broadcast({
        type: "REDO",
        commands
      });
    }

    if (msg.type === "CURSOR") {
      broadcast({
        type: "CURSOR",
        ...msg.payload
      });
    }
  });
});

function broadcast(msg) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(msg));
    }
  });
}

console.log("WebSocket server running on ws://localhost:3000");
