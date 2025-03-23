const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname));

let receivedData = [];

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Gửi từng dữ liệu cũ một cách tuần tự để vẽ biểu đồ từ đầu
    receivedData.forEach(data => ws.send(data.toString()));

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        receivedData.push(message.toString());

        // Gửi số vừa nhận đến tất cả client
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, '0.0.0.0', () => {
    console.log("Server running at localhost:8080");
});
