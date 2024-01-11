import { Router } from "express";
import authRouter from "./auth.router";
import postRouter from "./post.router";

const router: Router = Router();
router.use("/login", authRouter);
router.use("/post", postRouter);

export default router;