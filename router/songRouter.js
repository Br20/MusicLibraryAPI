import { Router } from "express";
import { SongController } from "../controller/SongController.js";
import { validate } from "../services/jwt.js"

export const SongRouter = Router();

SongRouter.get("/", validate ,SongController.getAll)

SongRouter.get("/:id", SongController.getById)

SongRouter.post("/", SongController.create)

SongRouter.patch("/:id", SongController.update)

SongRouter.delete("/:id", SongController.delete) 



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11c3UiLCJlbWFpbCI6ImJyYWkubHVnb0BnbWFpbC5jb20iLCJpYXQiOjE3MjIzMTI1NjUsImV4cCI6MTcyMjMxNjE2NX0.cOVvkWbAYiiFL4XFXR9Io_yzSR8MWxxIvGUQ2uCWFnU