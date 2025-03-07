const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname));

// Lưu trữ dữ liệu đã nhận
let receivedData = [];

wss.on('connection', (ws) => {
    console.log('🔗 Client connected');

    // Gửi toàn bộ dữ liệu cũ cho client mới kết nối
    ws.send(JSON.stringify(receivedData));

    ws.on('message', (message) => {
        console.log(`📩 Received: ${message}`);

        // Lưu số vào mảng
        receivedData.push(message.toString());

        // Gửi dữ liệu đến tất cả client đang kết nối
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('🔌 Client disconnected');
    });
});

server.listen(8080, '0.0.0.0', () => {
    console.log("✅ Server running at http://192.168.1.180:8080");
});
