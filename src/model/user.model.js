import mongoose from 'mongoose'

const userCollection = 'usuarios'

const userSchema = {
    nombre: {
        type: String,
        required: [true, "el campo esta vacio"],
        minLength: [1, "el campo esta vacio"]
    },
    apellido: {
        type: String,
        required: [true, "el campo esta vacio"],
        minLength: [1, "el campo esta vacio"]
    },
    email: {
        type: String,
        required: [true, "el campo esta vacio"],
        minLength: [1, "el campo esta vacio"]
    },
    password: {
        type: String,
        required: [true, "el campo esta vacio"],
        minLength: [1, "el campo esta vacio"]
    }
}

export const userModel = mongoose.model(userCollection, userSchema)


