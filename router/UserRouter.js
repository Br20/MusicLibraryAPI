import { Router } from "express";
import { UserController } from "../controller/UserController.js";
export const UserRouter = Router();

UserRouter.get("/", UserController.getAll)

UserRouter.get("/:id", UserController.getById)

UserRouter.post("/", UserController.create)

UserRouter.patch("/:id", UserController.update)

UserRouter.delete("/:id", UserController.delete) 