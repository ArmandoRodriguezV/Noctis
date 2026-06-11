import { useState } from "react";
import { createNewUserUc } from "../../../infrastructure/di/UserDi";
import { useNotification } from "../../../../shared/context/NotificationCtx";
import type { ApiResponse } from "../../../../shared/routes/Response";

interface CreateUserDTO {
    username: string;
    email: string;
    password: string
}

export default function useCreateUser() {
    const [load, setLoad] = useState(false);
    const { pushNotification } = useNotification();

    const createNewUser = async (dto: CreateUserDTO) => {
        setLoad(true);
        try {
            const res = await createNewUserUc.exec(dto.username, dto.email, dto.password);
            pushNotification(res as ApiResponse<void>);
            return res;
        } catch(err) {
            pushNotification(err as ApiResponse<void>);
        } finally {
            setLoad(false);
        }
    }

    return { createNewUser, load }
}