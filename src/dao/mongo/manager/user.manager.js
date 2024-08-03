import userModel from "../model/user.model.js";
import encryptionUtil from "../../../util/encryption.util.js";
import logUtil from "../../../util/logger.util.js";


const isEmail = (email) => {
    const mailRegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
    return mailRegExp.test(email)
}
const isPasswordFormat = (password) => {
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,30}$/
    return passwordRegExp.test(password)
}

const checkUser = (user) => {
    let errors = []
    if (!user.email) errors.push("no ingreso el correo electrónico")
    if (!isEmail(user.email)) errors.push("correo eletronico invalido")
    if (!user.nombre) errors.push("no ingreso el nombre")
    if (!user.apellido) errors.push("no ingreso el apellido")
    if (!user.password) errors.push("no ingreso la contraseña")
    if (!isPasswordFormat(user.password)) errors.push("el password ingresado no cumple con las normas")
    return (errors)
}

const userManager = {
    getUserByEmail: async function (username) {
        try {
            const user = await userModel.findOne({ email: username }).lean()
            if (!user) return { status: "failed", messages: ["no existe el usuario"] }
            return { status: "success", user: user }
        } catch (error) {
            logUtil.logger.warn(error);
            return { status: "failed", messages: ["no existe el usuario"] }
        }
    },

    saveUser: async function (user) {
        const errors = checkUser(user)
        if (errors.length > 0) {
            return { status: "failed", messages: errors }
        }

        try {
            if (await this.userExists(user)) {
                return { status: "failed", messages: ["el usuario ya existe"] }
            }
            user.password = encryptionUtil.hash(user.password)
            const createdUser = await userModel.create(user)
            return { status: "success", user: createdUser }
        } catch (error) {
            logUtil.logger.warn(error);
            return { status: "failed", messages: ["no se pudo registrar el usuario"] }
        }

    },
    updateUser: async function (user) {
        const errors = checkUser(user)
        if (errors.length() > 0) {
            return { status: "failed", messages: errors }
        }
        try {
            if (! await this.userExists(user)) return { status: "failed", messages: ["no existe el usuario"] }
            const updatedUser = await userModel.findByIdAndUpdate({ _id: user.id }, { $set: user }, { new: true })
            return { status: "success", user: updatedUser }
        } catch (error) {
            logUtil.logger.warn(error);
            return { status: "failed", messages: ["no se pudo actualizar el usuario"] }
        }
    },

    userExists: async function (user) {
        try {
            return await userModel.countDocuments({ email: user.email }) > 0 // buscando optimizar
        } catch (error) {
            logUtil.logger.warn(error);
            return false
        }

    },
    loginUser: async function (user) {

        try {
            const response = await this.getUserByEmail(user.email)
            if (response.status === "failed") return response
            if (encryptionUtil.validate(user.password, response.user.password)) {
                user = response.user
                user.last_connection = new Date()
                await userModel.findByIdAndUpdate({ _id: user._id }, { $set: user })
                const validToken = encryptionUtil.generateToken(user.email)
                return { status: "success", token: validToken }
            } else {
                return { status: "failed", messages: ["credenciales invalidas"] }
            }
        } catch (error) {
            logUtil.logger.warn("explote aca", error);
            return { status: "failed", messages: ["credenciales invalidas"] }
        }
    }

}

export default userManager