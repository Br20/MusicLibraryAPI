
export class SongController{
    static getAll(request, response){
        response.send("Listing all songs")
    }

    static getById(request, response){
        response.send("Showing song " + request.params.id)
    }

    static create(request, response){
        response.send("Creating new song")
    }

    static update(request, response){
        response.send("Updating song " + request.params.id)
        return 
    }

    static delete(request, response){
        response.send("Deleting song " + request.params.id)
    }
}