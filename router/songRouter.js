import { Router } from "express";
export const songRouter = Router();

songRouter.get("/", (request, response) => {
    response.send("Listing all songs")
})
songRouter.get("/:id", (request, response) => {
    const { id } = request.params;
    response.send("Showing song " + id);
})
songRouter.post("/", (request, response) => {
    response.send("Creating new song")
})
songRouter.patch("/:id", (request, response) => {
    const { id } = request.params;
    response.send("Updating  song " + id)
})
songRouter.delete("/:id", (request, response) => {
    const { id } = request.params;
    response.send("Deleting song " + id)
}) 
    

