import { Router } from "express";
import { SongController } from "../controller/SongController.js";
import { validate } from "../services/jwt.js"

export const SongRouter = Router();

SongRouter.get("/", SongController.getAll)

SongRouter.get("/:id", SongController.getById)

SongRouter.post("/", validate, SongController.create)

SongRouter.patch("/:id", validate, SongController.update)

SongRouter.delete("/:id", validate, SongController.delete) 

