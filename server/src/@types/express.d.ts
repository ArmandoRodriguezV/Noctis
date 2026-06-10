import { Session } from "../domain/entities/Session";
import type { User } from "../modules/user/domain/entities/User.ts";

declare global {
    namespace Express {
        interface Request {
            session?: Session;
            user?: User
        }
    }
}