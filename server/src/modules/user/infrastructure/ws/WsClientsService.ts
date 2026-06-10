import { WebSocket } from "ws";
import { allResponses } from "../../../../shared/Responses.js";

export class WsClientsService {
    private clients = new Map<number, WebSocket>();

    add(userId: number, ws: WebSocket) {
        this.clients.set(userId, ws);
    }

    remove(userId: number) {
        this.clients.delete(userId);
    }

    send(userId: number, data: any) {
        const client = this.clients.get(userId);
        
        if (!client || client.readyState !== WebSocket.OPEN) {
            return false;
        }
        
        client.send(JSON.stringify(allResponses.success("System", data)));
        
        return true;
    }
}