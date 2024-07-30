import { User } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import token from "../services/jwt.js"
const saltRounds = 10;

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

    static register(request, response){
        const {username, email, password} = request.body;
        bcrypt.hash(password, saltRounds)
        .then(encryptedPass => {
            console.log(encryptedPass)
            const newUser = new User({username, email, encryptedPass})
            newUser.save()
            .then (data =>  response.status(201).json({ success: true, message: "User registered successfully", data: data  }))
        } )
        .catch (error => response.status(500).json({ success: false, message: error.message }))
    }


    static login(request, response){
        const {email, password} = request.body;
        User.findOne({ email: email })
        .then(user => {
            if (!user){
                return response.status(404).json({ success: false, message: "User not found" });
            }
            bcrypt.compare(password, user.password)
            .then(match => {
                if(match){
                    const tk = token.generate(user)
                    return response.status(200).json({ success: true, data: tk });
                }else{
                    return response.status(401).json({ success: false, message: "Incorrect email or password"})
                }
            })
            .catch(() => {
                return response.status(500).json({ success: false, message: "Login Rejected"})
            }) 
        })
        .catch(() => {
            return response.status(500).json({ success: false, message: "Login Rejected"})
        }) 
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
