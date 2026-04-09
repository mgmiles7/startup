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

  wss.on('connection', (socket) => {
    socket.isAlive = true;
    socket.id = uuid.v4();
    connections.set(socket.id, socket);

    socket.on('message', function message(data) {
        const text = JSON.parse(data);
        if (text.type === "join"){
          if (users.has(text.value.username)){
            users.get(text.value.username).add(socket);
          } else {
            users.set(text.value.username, new Set());
            users.get(text.value.username).add(socket);
          }
          
        }
        let recipient = users.get(text.value.with);
        recipient.forEach((r) => r.send(data));
      });
    socket.on('close', () => {
      
      connections.delete(socket.id);
      for (let [username, set] of users) {
        set.delete(socket);
        if (set.size === 0){
          users.delete(username);
          const message = JSON.stringify({
            type: 'disconnet',
            value: { username } 
          })
          recipient.forEach((r) => r.send(message));
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

module.exports = { peerProxy };