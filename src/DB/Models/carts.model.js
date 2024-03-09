import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({

    products : [
        {
            product : {
                type : mongoose.SchemaTypes.ObjectId,
                ref: 'products',
            },
            quantity: {
                type: Number,
                // required: true,
            },
            _id: false,
        }   
    ],
    totalProducts : {
        type : Number,
        default : 0,
    },
    totalPrice : {
        type : Number,
        default : 0,
    }
});

export const cartsModel = mongoose.model("Carts", cartsSchema);