import { Router } from "express";
import { authMiddleware, controller } from "../di/UserDI.js";

const userRouter = Router();

userRouter.post("/register", controller.registerUser);
userRouter.post("/login", controller.loginUser);
userRouter.post("/logout", authMiddleware.handle.bind(authMiddleware), controller.logoutUser);

export default userRouter;