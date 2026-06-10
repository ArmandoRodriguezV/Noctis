import type { IncomingMessage } from "http";
import type { ValidateSessionUc } from "../../application/ValidateSessionUc.js";

export class WsAuth {
    constructor(
        private validateSessionUc: ValidateSessionUc
    ) { }

    async authWsClient(req: IncomingMessage) {
        const url = new URL(req.url!, "http://localhost");

        const token = url.searchParams.get("token");
        if (!token) return;
        const session = await this.validateSessionUc.exec(token);
        if (!session) return;
        if (!session.active) return;

        return session;
    }
}