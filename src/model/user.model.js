import mongoose from 'mongoose'

const usuariosCollection = 'usuarios'

const usuarioSchema = {
    nombre: String,
    apellido: String,
    email: String
}

export const usuarioModel = mongoose.model(usuariosCollection, usuarioSchema)


