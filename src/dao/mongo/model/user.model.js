import mongoose from 'mongoose'

const userCollection = 'usuarios'
const documentSchema = {
    name: String,
    reference: {
        type: String,
        enum: ["comprobanteIdentidad", "comprobanteDomicilio", "comprobanteCuenta"]
    },
    url: String
}
const userSchema = {
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: [true, "el campo esta vacio"]
    },
    password: {
        type: String
    },
    roles: [{
        type: String,
        enum: ["user", "admin", "premium"],
        defaults: "user"
    }],
    last_connection: {
        type: Date
    },
    documents: [{
        type: documentSchema
    }]


}


const userModel = mongoose.model(userCollection, userSchema)
export default userModel


