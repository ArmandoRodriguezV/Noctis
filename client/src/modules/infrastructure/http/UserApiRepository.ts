import { api } from "../../../shared/routes/Api";
import type { ApiResponse } from "../../../shared/routes/Response";
import { setToken } from "../../../shared/storage/storage";
import type { Session } from "../../domain/entities/Session";
import type { UserRepository } from "../../domain/repositories/UserRepository";

export class UserApiRepository implements UserRepository {
    async createNewUser(username: string, email: string, password: string): Promise<ApiResponse<Session>> {
        try {
            const res = await api.post<ApiResponse<Session>>("/user/register", { username, email, password });
            if (res.data.content?.token) setToken(res.data.content?.token);
            return res.data;
        } catch(err) {
            return err as ApiResponse<any>;
        }
    }

    async loginUser(email: string, password: string): Promise<ApiResponse<Session>> {
        try {
            const res = await api.post<ApiResponse<Session>>("/user/login", { email, password });
            if (res.data.content?.token) setToken(res.data.content?.token);
            return res.data;
        } catch(err) {
            return err as ApiResponse<any>;
        }
    }
}