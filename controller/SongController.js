import { Song } from "../model/SongModel.js";

export class SongController{
    static getAll(request, response){
        Song.find()
        .then(data =>  response.status(200).json({ success: true, message: "Listing all songs", data: data  }))
        .catch (error => response.status(500).json({ success: false, message: error.message }))
    }

    static getById(request, response){
        const id = request.params.id
        Song.findById(id)
        .then(data => {
            if (data)
                response.status(200).json({ success: true, message: "Showing song", data: data  })
            else
                response.status(404).json({ success: false, message: "Song not found"})
        })
        .catch(error => response.status(500).json({ success: false, message: error.message }))
    }

    static create(request, response){
        const {title, artist, album, genre, releaseDate, duration} = request.body;
        const newSong = new Song({title, artist, album, genre, releaseDate, duration})
            newSong.save()
            .then (data =>  response.status(201).json({ success: true, message: "Song created successfully", data: data  }))
            .catch (error => response.status(500).json({ success: false, message: error.message }))
    }

    static update(request, response){
        const allowedFields = [
            "title",
            "artist",
            "album",
            "genre",
            "releaseDate",
            "duration"
        ]
        const id = request.params.id
        const hasInvalidFields = !Object.keys(request.body).every((field) => allowedFields.includes(field))
        if (hasInvalidFields)
            response.status(400).json({ success: false, message: 'Invalid fields have been found'})
        Song.findByIdAndUpdate(id, request.body, {new: true, runValidators:true})
        .then(data => {
            if (data)
                response.status(200).json({ success: true, message: `Updated song ${id}`, data: data  })
            else
                response.status(404).json({ success: false, message: `Song ${id} not found `})
        })
        .catch (error => response.status(500).json({ success: false, message: error.message }))
    }

    verifyReqBody(body){
        

    }

    static delete(request, response){
        const id = request.params.id
        Song.findByIdAndDelete(id)
        .then(data => {
            if (data)
                response.status(204).json()
            else
                response.status(404).json({ success: false, message: `Song ${id} not found `})
        }) 
        .catch (error => response.status(500).json({ success: false, message: error.message }))
    }
}
