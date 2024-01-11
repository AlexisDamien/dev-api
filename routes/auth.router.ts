import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const authRouter: Router = Router();

authRouter.post("/", AuthController.login);

export default authRouter;