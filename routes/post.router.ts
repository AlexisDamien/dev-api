import { Router } from "express";
import { PostController } from "../controller/post.controller";
import { authenticationMiddleware } from "../middlewares/authentication.Middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const postRouter: Router = Router();

postRouter.get("/", authenticationMiddleware, adminMiddleware, PostController.getAll);
postRouter.get("/:id", authenticationMiddleware, PostController.getById);

export default postRouter;

