import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    const interval = setInterval(() => {
        const message = `Уведомление: ${new Date().toLocaleTimeString()}`;
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    }, 5000);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Server starts on http://localhost:3000');
});