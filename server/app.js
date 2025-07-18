const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8989 });

let users = [];  // ✅ Keep global user list
let messages = []; // ✅ Store messages

// ✅ Broadcast helper
const broadcast = (data) => {
  console.log("📢 Broadcasting:", data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  console.log("✅ New client connected!");

  let currentUser = null;

  // ✅ Send existing messages to the new client
  ws.send(
    JSON.stringify({
      type: 'INITIAL_MESSAGES',
      messages
    })
  );

  // ✅ Listen for messages
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log("📩 Server received:", data);

    switch (data.type) {
      case 'ADD_USER': {
        // ✅ Assign a unique ID
        const newUser = { name: data.name, id: Date.now() };
        currentUser = newUser;
        users.push(newUser);

        console.log("👥 Current users:", users);

        // ✅ Send updated user list to ALL
        broadcast({ type: 'USERS_LIST', users });
        console.log(`👤 User added: ${data.name}`);
        break;
      }

      case 'ADD_MESSAGE': {
        const newMessage = {
          id: Date.now(),
          message: data.message,
          author: data.author,
          timestamp: new Date().toISOString()
        };
        messages.push(newMessage);

        broadcast({ type: 'ADD_MESSAGE', ...newMessage });
        console.log(`💬 Message from ${data.author}: ${data.message}`);
        break;
      }

      case 'EDIT_MESSAGE': {
        messages = messages.map(msg =>
          msg.id === data.id ? { ...msg, message: data.newMessage, edited: true } : msg
        );

        broadcast({ type: 'EDIT_MESSAGE', id: data.id, newMessage: data.newMessage });
        console.log(`✏️ Message edited (ID: ${data.id})`);
        break;
      }

      case 'DELETE_MESSAGE': {
        messages = messages.filter(msg => msg.id !== data.id);

        broadcast({ type: 'DELETE_MESSAGE', id: data.id });
        console.log(`🗑️ Message deleted (ID: ${data.id})`);
        break;
      }

      default:
        console.warn("⚠️ Unknown message type:", data.type);
        break;
    }
  });

  // ✅ On disconnect, remove user and broadcast updated list
  ws.on('close', () => {
    console.log("❌ Client disconnected");

    if (currentUser) {
      users = users.filter(u => u.id !== currentUser.id);
      console.log("👥 After disconnect:", users);

      broadcast({ type: 'USERS_LIST', users });
    }
  });
});

console.log("✅ WebSocket server running on ws://localhost:8989");
