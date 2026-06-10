import { LoginUserUc } from "../../application/LoginUserUc.js";
import { LogoutUserUc } from "../../application/LogoutUserUc.js";
import { RegisterUserUc } from "../../application/RegisterUserUc.js";
import { ValidateSessionUc } from "../../application/ValidateSessionUc.js";
import { UserController } from "../http/UserController.js";
import { SessionRepositorySQLite } from "../persistence/SessionRepositorySQLite.js";
import { UserRepositorySQLite } from "../persistence/UserRepositorySQLite.js";
import { AuthMiddleware } from "../security/AuthMiddleware.js";
import { WsAuth } from "../security/WsAuth.js";
import { WsClientsService } from "../ws/WsClientsService.js";

// Repositories
const userRepository = new UserRepositorySQLite();
const sessionRepository = new SessionRepositorySQLite();

// Use cases
const registerUserUc = new RegisterUserUc(userRepository, sessionRepository);
const validateSessionUc = new ValidateSessionUc(sessionRepository);
const logoutUserUc = new LogoutUserUc(sessionRepository);
const loginUserUc = new LoginUserUc(sessionRepository, userRepository);

// outputs
const controller = new UserController(registerUserUc, logoutUserUc, loginUserUc);
const wsAuth = new WsAuth(validateSessionUc);
const authMiddleware = new AuthMiddleware(validateSessionUc);
const wsClientsService = new WsClientsService();

export { controller, authMiddleware, wsAuth, wsClientsService };