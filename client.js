const WebSocket = require('ws');

const ws = new WebSocket('ws://192.168.1.180:8080');

ws.on('open', () => {
    console.log('✅ Connected to server');

    let index = 0;
    const data = Array(10000).fill(0).map(() => Math.floor(Math.random() * 10));

    const sendNumber = () => {
        if (index < data.length) {
            ws.send(data[index].toString());
            console.log(`📤 Sent: ${data[index]}`);
            index++;

            setTimeout(sendNumber, 10); // Gửi mỗi số sau 10ms
        } else {
            ws.close();
            console.log("🔌 Finished sending all data.");
        }
    };

    sendNumber();
});

ws.on('error', (error) => {
    console.error("❌ WebSocket Client Error:", error);
});

ws.on('close', () => console.log('🔌 Connection closed'));
