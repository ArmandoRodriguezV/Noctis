import type { Request, Response } from 'express';
import { allResponses } from '../../../../shared/Responses.js';
import type { RegisterUserUc } from '../../application/RegisterUserUc.js';
import type { LogoutUserUc } from '../../application/LogoutUserUc.js';
import type { LoginUserUc } from '../../application/LoginUserUc.js';

export class UserController {
    constructor(
        private registerUserUc: RegisterUserUc,
        private logoutUserUc: LogoutUserUc,
        private loginUserUc: LoginUserUc
    ) {}

    registerUser = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            const session = await this.registerUserUc.exec(username, email, password);

            res.status(200).json(allResponses.success("Usuario creado correctamente", session));
        } catch (err) {
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }

    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const session = await this.loginUserUc.exec(email, password);

            if (!session) return res.status(401).json(allResponses.warning("Credenciales invalidas", 401))

            res.status(200).json(allResponses.success(`Bienvenido!`, session));
        } catch (err) {
            res.status(500).json(allResponses.error((err as Error).message));
        }
    }

    logoutUser = async (req: Request, res: Response) => {
        try {
            const id = req.user?.id!;
            await this.logoutUserUc.exec(id);

            res.status(200).json(allResponses.success("Sesión cerrada"));
        } catch (err) {
            res.status(500).json(allResponses.error((err as Error).message));
        }
    } 
}