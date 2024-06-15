import DAOService from "../dao/factory.js"
import encryptionUtil from "../util/encryption.util.js"

const isEmail = (email) => {
    const mailRegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
    return mailRegExp.test(email)
}
const isPasswordFormat = (password) => {
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/
    return mailRegExp.test(password)
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

let userManager = DAOService.services.userManager

const userController = {
    login: async function (req, res) {
        const { email, password } = req.body
        if (!isEmail(email)) return res.status(401).send({ status: "correo invalido" })
        const user = await userManager.getUserByEmail(email)
        if (!user) return res.status(401).send({ status: "failed", messages: ["credenciales invalidas"] })

        if (encryptionUtil.validate(password, user.password)) {
            const validToken = encryptionUtil.generateToken(email)
            res.status(200).send({ status: "success", token: validToken })
        } else {
            res.status(401).send({ status: "failed", messages: ["credenciales invalidas"] })
        }


    },
    register: async function (req, res) {
        const { email, nombre, apellido, password, passwordrepeat } = req.body
        if (password !== passwordrepeat) {
            return res.status(400).send({ status: "failed", messages: ["las contraseeñas no coinciden"] })
        }
        const user = { email, nombre, apellido, password }

        userManager.saveUser(user)
            .then((user) => {
                res.status(201).send({ status: "success", user: user.email })
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ status: "failed", messages: "No se registro el usuario" })
            })

    },
    wellfareCheck: async function (req, res) {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            res.status(401).send({ status: "failed", messages: ["No esta autenticado"] })
            return false
        }
        const authToken = authHeader.split(' ')[1]
        const authorizedEmail = encryptionUtil.verify(authToken)
        if (!authorizedEmail) {
            res.status(401).send({ status: "failed", messages: ["No se puede identificar al usuario"] })
            return false
        }
        req.user = await userManager.getUserByEmail(authorizedEmail.username)
        res.status(200).send({ status: "success", usuario: req.user.email })
        return true
    }

}

export default userController