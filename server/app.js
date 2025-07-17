const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8989 });

const users = [];

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  console.log("✅ New client connected!");

  let index;

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'ADD_USER': {
        index = users.length;
        users.push({ name: data.name, id: index + 1 });
        ws.send(
          JSON.stringify({
            type: 'USERS_LIST',
            users,
          })
        );
        broadcast(
          {
            type: 'USERS_LIST',
            users,
          },
          ws
        );
        console.log(`👤 User added: ${data.name}`);
        break;
      }

      case 'ADD_MESSAGE':
        broadcast(
          {
            type: 'ADD_MESSAGE',
            message: data.message,
            author: data.author,
          },
          ws
        );
        console.log(`💬 Message from ${data.author}: ${data.message}`);
        break;

      default:
        break;
    }
  });

  ws.on('close', () => {
    users.splice(index, 1);
    broadcast(
      {
        type: 'USERS_LIST',
        users,
      },
      ws
    );
    console.log("❌ Client disconnected");
  });
});

console.log("✅ WebSocket server running on ws://localhost:8989");
