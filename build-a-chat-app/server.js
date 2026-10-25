import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const server = http.createServer((req, res) => {
    fs.readFile("./public/index.html", (error, file) => {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(file, "utf-8");
    });
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {

    const username = new URL(req.url, "http://localhost").searchParams.get("username");
    
    socket.on("message", (message) => {
        const { username, text } = JSON.parse(message);
        const chatMessage = JSON.stringify({
            type: 'chat',
            username,
            text,
        });

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN){
                client.send(chatMessage);
            }
        });
    });

    socket.on("close", () => {
        const systemMessage = JSON.stringify({
            type: "system",
            text: `${username} left`
        });

        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(systemMessage);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
