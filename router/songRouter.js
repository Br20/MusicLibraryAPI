import { Router } from "express";
import { SongController } from "../controller/SongController.js";
export const SongRouter = Router();

SongRouter.get("/", SongController.getAll)

SongRouter.get("/:id", SongController.getById)

SongRouter.post("/", SongController.create)

SongRouter.patch("/:id", SongController.update)

SongRouter.delete("/:id", SongController.delete) 
    

