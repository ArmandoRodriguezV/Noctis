import type { Request, Response, NextFunction } from 'express';
import type { ValidateSessionUc } from "../../application/ValidateSessionUc.js";
import { allResponses } from '../../../../shared/Responses.js';

export class AuthMiddleware {
    constructor(
        private validateSesionUc: ValidateSessionUc
    ) {}

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json(allResponses.warning("Sin autorización", 401));
            const token = authHeader.replace("Bearer ", "");
            const session = await this.validateSesionUc.exec(token);

            if (!session) return res.status(401).json(allResponses.warning("Sin autorización", 401));

            req.session = session;
            req.user = { id: session.owner! }

            next();
        } catch(err) {
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }
}