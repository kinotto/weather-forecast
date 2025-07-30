const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

function generateData() {
  const data = { iterations: [] };
  for (let i = 1; i <= 10; i++) {
    const values = Array.from({ length: 10 }, () => Math.floor(Math.random() * 101));
    data.iterations.push({ step: i, values });
  }
  return data;
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  let intervalId = null;
  let currentType = 'temperature';

  function startSendingData() {
    if (intervalId) return;
    intervalId = setInterval(() => {
      const response = generateData();
      ws.send(JSON.stringify(response));
    }, 500);
  }

  function stopSendingData() {
    clearInterval(intervalId);
    intervalId = null;
  }

  ws.on('message', (message) => {
    const msg = message.toString();
    console.log('Received:', msg);

    if (['temperature', 'pressure', 'temperature2'].includes(msg)) {
      currentType = msg;
      stopSendingData();
      startSendingData();
    } else if (msg === 'pause') {
      stopSendingData();
    } else if (msg === 'resume') {
      startSendingData();
    }
  });

  ws.on('close', () => {
    stopSendingData();
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');