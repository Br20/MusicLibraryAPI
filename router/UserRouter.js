import { Router } from "express";
import { UserController } from "../controller/UserController.js";
export const UserRouter = Router();

UserRouter.get("/", UserController.getAll)

UserRouter.get("/:id", UserController.getById)

UserRouter.post("/register", UserController.register)

UserRouter.post("/login", UserController.login)

UserRouter.patch("/:id", UserController.update)

UserRouter.delete("/:id", UserController.delete) 