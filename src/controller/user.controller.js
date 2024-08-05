import DAOService from "../dao/factory.js"
import fs from 'fs'


const unlinkFile = async function (path, filename, logger) {
    if (!filename || filename === "." || filename === "..") return false
    try {
        await fs.promises.unlink(path + filename) // ya se que sincronico no esta bueno, pero ya lo solucionare
        return true
    } catch (error) {
        logger.warn("no se pudo borrar: ", path + filename)
        return false
    }
}

const fileExists = async function (path, filename) {
    return (await fs.promises.access(path + filename, fs.constants.R_OK)).isFile()
}

const userManager = DAOService.services.userManager
const userValidation = DAOService.services.userValidation
const userAtuthorized = DAOService.services.userAtuthorized
// creo que tengo que mejorar los nombres de los metodos
const userController = {
    login: async function (req, res) {
        const { email, password } = req.body
        if (!email || !password) return res.status(401).send({ status: "failed", messages: ["faltan datos"] })

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
        const userResponse = await userManager.getUserByEmail(req.user.email)
        if (userResponse.status === "failed") return res.status(400).send(userResponse)

        const user = userResponse.user
        return res.status(200).send({ status: "success", usuario: { email: user.email, nombre: user.nombre, apellido: user.apellido, roles: user.roles } })
    },
    deleteUser: async function (req, res) {
        if (!req.params.id) return res.status(400).send({ status: "failed", messages: ["faltan datos"] })
        const userId = req.params.id
        const userResponse = await userManager.getUserById(userId)
        if (userResponse.status === "failed") return res.status(400).send(userResponse)
        const user = userResponse.user

        const response = await userManager.deleteUser(userId)
        if (response.status === "failed") return res.status(400).send(response)
        await unlinkFile('./img/profile/', user.profileAvatar, req.logger)
        await unlinkFile('./img/document/', user.identityProof, req.logger)
        await unlinkFile('./img/document/', user.addressProof, req.logger)
        await unlinkFile('./img/document/', user.accountProof, req.logger)
        return res.status(200).send(response)
    },

    setAvatar: async function (req, res) {
        const userId = req.user.id
        if (!req.file) return res.status(400).send({ status: "failed", messages: ["el archivo de imagen no esta soportado o falta"] })
        const userResponse = await userManager.getUserById(userId)
        if (userResponse.status === "failed") return res.status(400).send(userResponse)

        const response = await userManager.setAvatar(userId, req.file.filename)
        if (response.status === "failed") {
            await unlinkFile('./img/profile/', req.file.filename, req.logger)
            return res.status(400).send(response)
        }

        await unlinkFile('./img/profile/', userResponse.user.profileAvatar, req.logger)
        return res.status(200).send(response)
    },

    getAvatar: async function (req, res) {
        const avatarId = req.params.id
        if (!avatarId) return res.status(400).send({ status: "failed", messages: ["faltan datos"] })
        const avatarFullPath = fs.realpathSync('./img/profile/' + avatarId) // necesito algo mejor, y lo aprendido en clase no me cae muy bien 
        fs.access(avatarFullPath, fs.constants.R_OK, (err) => {
            if (err) {
                return res.status(400).send({ status: "failed", messages: ["la imagen no existe"] })
            } else {
                return res.sendFile(avatarFullPath, { headers: { 'Content-Type': 'image/png' } })
            }
        })
    },

    setDocuments: async function (req, res) {
        const userId = req.user.id
        const userResponse = await userManager.getUserById(userId)
        if (userResponse.status === "failed") return res.status(400).send(userResponse)

        // obtengo el usuario para ver los archivos anteriores
        const user = userResponse.user
        let messages = []
        // subo los archios que esten en req.files, si no estan ni los miro, no se suben
        if (req.file.identityProof) {
            const response = await userManager.setIdentityProof(userId, req.file.identityProof.filename)
            if (response.status === "success") {
                await unlinkFile('./img/document/', user.identityProof, req.logger)
                messages.push("se ha actualizado el documento de identidad")
            } else {
                await unlinkFile('./img/document/', req.file.identityProof.filename, req.logger)
                messages.push("no se ha podido subir el documento de identidad")
            }
        }
        if (req.file.addressProof) {
            const response = await userManager.setAddressProof(userId, req.file.addressProof.filename)
            if (response.status === "success") {
                await unlinkFile('./img/document/', user.identityProof, req.logger)
                messages.push("se ha actualizado el documento de domicilio")
            } else {
                await unlinkFile('./img/document/', req.file.identityProof.filename, req.logger)
                messages.push("no se ha podido subir el documento de domicilio")
            }
        }
        if (req.file.accountProof) {
            const response = await userManager.setAccountProof(userId, req.file.accountProof.filename)
            if (response.status === "success") {
                await unlinkFile('./img/document/', user.identityProof, req.logger)
                messages.push("se ha actualizado el documento de cuenta")
            } else {
                await unlinkFile('./img/document/', req.file.identityProof.filename, req.logger)
                messages.push("no se ha podido subir el documento de cuenta")
            }
        }

        return res.status(200).send({ status: "success", messages: messages })
    },

    getDocument: async function (req, res) {
        const documentId = req.params.id
        if (!documentId) return res.status(400).send({ status: "failed", messages: ["faltan datos"] })
        const documentRegexp = /^d_\w+_\w+$/
        if (!documentRegexp.test(documentId)) return res.status(400).send({ status: "failed", messages: ["el documento no es valido"] })
        const documentFullPath = fs.realpathSync('./img/document/' + documentId) // necesito algo mejor, y lo aprendido en clase no me cae muy bien 
        fs.access(documentFullPath, fs.constants.R_OK, (err) => {
            if (err) {
                return res.status(400).send({ status: "failed", messages: ["el archivo no existe"] })
            } else {
                return res.sendFile(documentFullPath, { headers: { 'Content-Type': 'application/pdf' } })
            }
        })
    },

    premium: async function (req, res) {
        const userResponse = await userManager.getUserById(req.user.id)
        if (userResponse.status === "failed") return res.status(400).send(userResponse)

        const user = userResponse.user
        if (user.roles.includes("premium")) {
            user.roles = user.roles.filter((element) => element !== "premium")
        } else {
            if (
                fileExists('./img/document/', user.identityProof) &&
                fileExists('./img/document/', user.addressProof) &&
                fileExists('./img/document/', user.accountProof)) {
                user.roles.push("premium")
                const response = await userManager.updateUser(req.user.id, user)
                if (response.status === "failed") return res.status(400).send(response)
            } else {
                return res.status(400).send({ status: "failed", messages: ["el usuario no cuenta con los documentos necesarios"] })
            }
        }

        return res.status(200).send({ status: "success", messages: ["se actualizo correctamente el rol"] })
    },

    getUsers: async function (req, res) {
        const usersResponse = await userManager.getUsers()
        if (usersResponse.status === "failed") return res.status(400).send(usersResponse)
        return res.status(200).send(usersResponse)
    },

    removeInactiveUsers: async function (req, res) {
        const usersResponse = await userManager.deleteInactiveUsers()
        if (usersResponse.status === "failed") return res.status(400).send(usersResponse)
        return res.status(200).send(usersResponse)
    },

    userValidation,
    userAtuthorized
}

export default userController