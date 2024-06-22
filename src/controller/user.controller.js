import DAOService from "../dao/factory.js"
import encryptionUtil from "../util/encryption.util.js"

let userManager = DAOService.services.userManager
const userValidation = DAOService.services.userValidation

const userController = {
    login: async function (req, res) {
        const { email, password } = req.body
        if (!email || !password) return res.status(401).send({ status: "failed", messages: ["datos incompletos"] })
        if (!isEmail(email)) return res.status(401).send({ status: "failed", messages: ["formato de correo invalido"] })
        const response = await userManager.getUserByEmail(email)
        if (response.status === "failed") return res.status(401).send({ status: "failed", messages: ["credenciales invalidas"] })
        const user = response.user
        if (encryptionUtil.validate(password, user.password)) {
            const validToken = encryptionUtil.generateToken(email)
            res.status(200).send({ status: "success", token: validToken })
        } else {
            res.status(401).send({ status: "failed", messages: ["credenciales invalidas"] })
        }
        return true
    },
    register: async function (req, res) {
        const { email, nombre, apellido, password, passwordrepeat } = req.body
        if (password !== passwordrepeat) {
            return res.status(400).send({ status: "failed", messages: ["las contraseñas no coinciden"] })
        }
        const user = { email, nombre, apellido, password }

        const response = await userManager.saveUser(user)
        if (response.status === "failed") return res.status(400).send({ status: "failed", messages: response.messages })
        const validToken = encryptionUtil.generateToken(email)
        res.status(201).send({ status: "success", token: validToken })
        return true
    },
    wellfareCheck: async function (req, res) {

        return res.status(200).send({ status: "success", usuario: req.user.email })
    },
    userValidation
}

export default userController