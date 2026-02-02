const commands = [];
const redoStack = [];

function addCommand(cmd) {
  commands.push(cmd);
  redoStack.length = 0;
}

function undo() {
  if (commands.length === 0) return;
  redoStack.push(commands.pop());
}

function redo() {
  if (redoStack.length === 0) return;
  commands.push(redoStack.pop());
}

module.exports = {
  commands,
  addCommand,
  undo,
  redo
};
