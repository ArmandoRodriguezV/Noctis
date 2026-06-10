import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import dotenv from 'dotenv';
import { wsAuth, wsClientsService } from '../modules/user/infrastructure/di/UserDI.js';
import { allResponses } from '../shared/Responses.js';
dotenv.config();

const WS_PORT = Number(process.env.WS_PORT);

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

export const bootstrapWs = () => {
    server.on('upgrade', async (req, socket, head) => {
        const session = await wsAuth.authWsClient(req);
        if (!session) {
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
            return;
        }

        wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
                const userId = session.owner;
                wsClientsService.add(userId!, ws);
                ws.on("close", () => {wsClientsService.remove(userId!)});
                ws.send(JSON.stringify(allResponses.success("Conexión establecida")));
                wss.emit("connection", ws, req);
            }
        );

    });

    server.listen(WS_PORT, () => {
        console.log(`🟢 WS Server run in port ${WS_PORT}`);
    });

};