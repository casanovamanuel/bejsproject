import mongoose from 'mongoose'

const productCollection = 'productos'


const productSchema = {
    title: {
        type: String,
        required: [true, "el campo esta vacio"],
        minLength: [1, "el campo esta vacio"]
    },
    description: {
        type: String,
        required: [true, "el campo esta vacio"],
        minLength: [1, "el campo esta vacio"]
    },
    price: {
        type: Number,
        min: [1, "cantidad invalida"],
        required: [true, "el campo esta vacio"],
        minLength: [1, "el campo esta vacio"]
    },
    stock: {
        type: Number,
        min: [0, "cantidad invalida"],
        required: [true, "el campo esta vacio"]
    },
    category: {
        type: Number
    },
    thumbnail: [{
        type: String
    }]
}

const productModel = mongoose.model(productCollection, productSchema)

export default productModel


