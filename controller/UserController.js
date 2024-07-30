import { User } from "../model/UserModel.js";

export class UserController{
    static getAll(request, response){
        User.find()
        .then(data =>  response.status(200).json({ success: true, message: "Listing all users", data: data  }))
        .catch (error => response.status(500).json({ success: false, message: error.message }))
    }

    static getById(request, response){
        const id = request.params.id
        User.findById(id)
        .then(data => {
            if (data)
                response.status(200).json({ success: true, message: "Showing user", data: data  })
            else
                response.status(404).json({ success: false, message: "User not found"})
        })
        .catch(error => response.status(500).json({ success: false, message: error.message }))
    }

    static create(request, response){
        const {username, email, password} = request.body;
        const newUser = new User({username, email, password})
            newUser.save()
            .then (data =>  response.status(201).json({ success: true, message: "User created successfully", data: data  }))
            .catch (error => response.status(500).json({ success: false, message: error.message }))
    }

    static update(request, response){
        const allowedFields = [
            "username",
            "email",
            "password"
        ]
        const id = request.params.id
        const hasInvalidFields = !Object.keys(request.body).every((field) => allowedFields.includes(field))
        if (hasInvalidFields)
            response.status(400).json({ success: false, message: 'Invalid fields have been found'})
        User.findByIdAndUpdate(id, request.body, {new: true, runValidators:true})
        .then(data => {
            if (data)
                response.status(200).json({ success: true, message: `Updated user ${id}`, data: data  })
            else
                response.status(404).json({ success: false, message: `User ${id} not found `})
        })
        .catch (error => response.status(500).json({ success: false, message: error.message }))
    }

    verifyReqBody(body){
        

    }

    static delete(request, response){
        const id = request.params.id
        User.findByIdAndDelete(id)
        .then(data => {
            if (data)
                response.status(204).json()
            else
                response.status(404).json({ success: false, message: `User ${id} not found `})
        }) 
        .catch (error => response.status(500).json({ success: false, message: error.message }))
    }
}
