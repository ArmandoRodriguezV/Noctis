import { useState } from "react"
import { loginUserUc } from "../../../infrastructure/di/UserDi";
import { useNotification } from "../../../../shared/context/NotificationCtx";
import type { ApiResponse } from "../../../../shared/routes/Response";
import { useNavigate } from "react-router-dom";
import { Router } from "../../../../shared/routes/Routes";

export default function useLoginUser() {
    const [load, setLoad] = useState<boolean>(false);
    const { pushNotification } = useNotification();
    const nav = useNavigate();

    const loginUser = async (email: string, password: string) => {
        setLoad(true);
        try {
            const res = await loginUserUc.exec(email, password);
            pushNotification(res as ApiResponse<void>);
            nav(Router.HOME);
        } catch(err){
            pushNotification(err as ApiResponse<void>);
        } finally {
            setLoad(false);
        }
    }

    return { loginUser, load }
}