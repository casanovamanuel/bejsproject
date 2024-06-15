import mongoose from 'mongoose'

const cartCollection = 'carritos'


const cartSchema = {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    products: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'usuarios'
            },
            ammount: Number,
            price: Number
        }]
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel


