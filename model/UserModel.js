import mongoose from "mongoose";

// MongoDB Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    }
}, {timestamp: true})

// transform db response
userSchema.set("toJSON", {
    transform(doc, ret){
        delete ret.__v 
        ret.id = ret._id
        delete ret._id
        //delete ret.password
    }
})


// Creating and exporting model
export const User = mongoose.model("User", userSchema)