import userModel from "../model/user.model.js";
import encryptionUtil from "../../../util/encryption.util.js";

const checkUser = (user) => {
    ////console.log("quiero chequear a: ", user)
    let errors = []
    if (!user.email) errors.push("no ingreso el correo electrónico")
    if (!user.nombre) errors.push("no ingreso el nombre")
    if (!user.apellido) errors.push("no ingreso el apellido")
    if (!user.password) errors.push("no ingreso la contraseña")
    return errors
}


const userManager = {
    getUserByEmail: async function (username) {
        try {
            const user = await userModel.findOne({ email: username }).lean()
            return user
        } catch (error) {
            //console.log(error);
            return { status: "failed", problems: [error] }
        }
    },

    saveUser: async function (user) {
        const errors = checkUser(user)
        if (errors.length > 0) {
            //console.log(errors);
            return { status: "failed", problems: errors }
        }

        try {
            if (await this.userExists(user)) {
                throw Error("el usuario ya existe")
            }
            user.password = encryptionUtil.hash(user.password)
            const createdUser = await userModel.create(user)
            return createdUser
        } catch (error) {
            //console.log(error);
            return { status: "failed", problems: [error] }
        }

    },
    updateUser: async function (user) {
        const errors = checkUser(user)
        if (errors.length() > 0) {
            //console.log(errors);
            return { status: "failed", problems: errors }
        }
        if (! await this.userExists(user)) return { status: "failed", problems: ["no existe el usuario"] }
        userModel.updateOne({ _id: user.id }, { $set: user })
    },
    userExists: async function (user) {
        const existent = await userModel.findOne({ email: user.email }).lean()
        const res = (existent !== null)
        //console.log("encontre : ", typeof existent, res);

        return res
    }

}

export default userManager