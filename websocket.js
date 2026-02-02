let socket;

export function connect(onMessage) {
  socket = new WebSocket("ws://localhost:3000");

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  socket.onerror = (err) => {
    console.error("WebSocket error", err);
  };

  socket.onmessage = (e) => {
    onMessage(JSON.parse(e.data));
  };
}

export function send(type, payload) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return; // ✅ silently ignore
  }

  socket.send(JSON.stringify({ type, payload }));
}
