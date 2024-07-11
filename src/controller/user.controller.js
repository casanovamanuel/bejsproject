import DAOService from "../dao/factory.js"



const userManager = DAOService.services.userManager
const userValidation = DAOService.services.userValidation
const userAtuthorized = DAOService.services.userAtuthorized
// creo que tengo que mejorar los nombres de los metodos
const userController = {
    login: async function (req, res) {
        const { email, password } = req.body
        if (!email || !password) return res.status(401).send(response)

        const response = await userManager.loginUser({ email, password })
        if (response.status === "failed") return res.status(401).send(response)
        res.status(200).send(response)
        return true
    },
    register: async function (req, res) {
        const { email, nombre, apellido, password } = req.body

        const user = { email, nombre, apellido, password }

        const response = await userManager.saveUser(user)
        if (response.status === "failed") return res.status(400).send(response)
        return res.status(201).send(response)
    },
    update: async function (req, res) {
        const { email, nombre, apellido, password } = req.body
        const user = { email, nombre, apellido, password }
        const response = await userManager.updateUser(user)
        if (response.status === "failed") return res.status(400).send(response)
        return res.status(200).send(response)
    },
    wellfareCheck: async function (req, res) {

        return res.status(200).send({ status: "success", usuario: req.user.email })
    },
    userValidation,
    userAtuthorized
}

export default userController