import mongoose from 'mongoose'

const userCollection = 'usuarios'

const userSchema = {
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["user"],
        defaults: "user"
    }
}

const userModel = mongoose.model(userCollection, userSchema)
export default userModel


