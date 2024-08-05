import mongoose from 'mongoose'

const userCollection = 'usuarios'
// const documentSchema = {
//     name: String,
//     reference: {
//         type: String,
//         enum: ["comprobanteIdentidad", "comprobanteDomicilio", "comprobanteCuenta"]
//     },
//     url: String
// }
// lo iba a hacer mucho mas complicado, no vale la pena XD


const userSchema = {
    nombre: {
        type: String,
        required: [true, "el campo esta vacio"]
    },
    apellido: {
        type: String,
        required: [true, "el campo esta vacio"]
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
        default: "user"
    }],
    last_connection: {
        type: Date
    },
    profileAvatar: {
        type: String,
        default: ""
    },
    identityProof: {
        type: String,
        default: ""
    },
    addressProof: {
        type: String,
        default: ""
    },
    accountProof: {
        type: String,
        default: ""
    },
    enabled: {
        type: Boolean,
        default: false
    }
}


const userModel = mongoose.model(userCollection, userSchema)
export default userModel


