const { WebSocketServer, WebSocket } = require('ws');
const uuid = require('uuid');

function messageProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });
  });

  let connections = new Map();
  let users = new Map();
  let socketToUser = new Map();

  wss.on('connection', (socket) => {
    socket.isAlive = true;
    socket.id = uuid.v4();
    connections.set(socket.id, socket);
    socket.with = null;
    socket.username = null;

    socket.on('message', function message(data) {
        const text = JSON.parse(data.toString());
        console.log(text.type);
        console.log(text);
        if (text.type === "join"){
            handleJoin(socket, text);
        } else if (TextDecoderStream.type === "message"){
          handleMessage(socket, text);
        }
      });
    socket.on('close', () => {
      let recipient = users.get(socket.with);
      const message = JSON.stringify({
            type: 'disconnect',
            value: { username: socket.username } 
          })
      if (recipient){
      recipient.forEach((r) => r.send(message));
      }
      connections.delete(socket.id);
      for (let [username, set] of users) {
        set.delete(socket);
        if (set.size === 0){
          users.delete(username);
          
        }
      }
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    connections.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

function handleJoin(socket, msg){
  const { from } = msg;

  socketToUser.set(socket, from);

  if (!users.has(from)){
    users.set(from, new Set());
  }

  users.get(from).add(socket);
}

function handleMessage(socket, msg){
  const 
}

module.exports = { messageProxy };