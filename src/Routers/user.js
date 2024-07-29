import { Router } from "express";
import { createUser, loginUser } from "../Controllers/user.js";

const userRouter = Router();

userRouter.route("/register").post(createUser);

userRouter.route("/login").post(loginUser);

export default userRouter;