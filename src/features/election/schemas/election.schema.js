import mongoose from "mongoose";

export const ElectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    candidates: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})