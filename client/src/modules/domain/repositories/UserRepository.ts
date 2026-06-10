import type { ApiResponse } from "../../../shared/routes/Response";
import type { Session } from "../entities/Session";

export interface UserRepository {
    createNewUser(username: string, email: string, password: string): Promise<ApiResponse<Session>>;
}