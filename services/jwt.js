import { se } from "date-fns/locale";
import { response } from "express";
import jsonwebtoken from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET_KEY;

const token = {
    generate(user){
        const userForToken = {
            username : user.username,
            email: user.email
        }
        return jsonwebtoken.sign(userForToken, secret_key, {expiresIn: "1h"})
    }
}

export default token;


export const validate = (request, response, next) => {
    const token = request.headers?.authorization?.split(" ")[1]
    if (token){
        jsonwebtoken.verify(token, secret_key, (error, decoded) => {
            if (error){
                return response.status(401).json({ success: false, message: "Incorrect or expired token"})
            }
            request.decoded = decoded
            next()
        })
    }else{
        return response.status(401).json({ success: false, message: "No token provided"})
    }
}