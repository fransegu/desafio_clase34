import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({

    code : {
        type : String,
        unique: true,
        required: true,
    },

    purchase_datetime : {
        type : Date,
        default: Date.now,
    },

    amount : {
        type : Number,
    },

    purchaser : {
        type : String,
    }
});

export const ticketModel = mongoose.model("ticket",  ticketSchema);