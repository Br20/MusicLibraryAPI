import mongoose from "mongoose";
import { format } from 'date-fns';

const currentDate = new Date()
const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
const initialDate = new Date("1958-08-04");

// MongoDB Schema
const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    album: {
        type: String,
        trim: true
    },
    genre: {
        type: [String],
    },
    releaseDate: {
        type: Date,
        required: true,
        min: [initialDate, `Date can't be earlier than ${initialDate}` ],
        max: [formattedCurrentDate, `Date can't be later than ${formattedCurrentDate}` ]
    },
    duration: {
        type: Number,
        required: true,
        min: [0, 'Duration cannot be 0']
    }
}, {timestamp: true})

// transform db response
songSchema.set("toJSON", {
    transform(doc, ret){
        delete ret.__v // version key
        ret.id = ret._id
        delete ret._id
    }
})


// Creating and exporting model
export const Song = mongoose.model("Song", songSchema)