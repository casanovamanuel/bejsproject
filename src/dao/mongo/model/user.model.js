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
    roles: [{
        type: String,
        enum: ["user"], // esto deberia ser una lista en la DB
        defaults: "user"
    }]
}


const userModel = mongoose.model(userCollection, userSchema)
export default userModel


