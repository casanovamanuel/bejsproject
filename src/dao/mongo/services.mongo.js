import userManager from "./manager/user.manager.js"
import productManager from "./manager/product.manager.js"
import cartManager from "./manager/cart.manager.js";
import ticketManager from "./manager/ticket.manager.js";
import encryptionUtil from "../../util/encryption.util.js";
import { entorno } from "../../config/config.js";

import mongoose from "mongoose"

// mongoose.set('debug', true);

mongoose.connect(entorno.mongoUrl)

const userValidation = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(401).send({ status: "failed", messages: ["No esta autenticado"] })
        return false
    }
    const authToken = authHeader.split(' ')[1]
    try {
        const authorizedEmail = encryptionUtil.verify(authToken)
        if (!authorizedEmail) {
            res.status(401).send({ status: "failed", messages: ["No esta autenticado"] })
            return false
        }
        const response = await userManager.getUserByEmail(authorizedEmail.username)

        if (response.status === "failed") {
            res.status(401).send({ status: "failed", messages: ["No esta autenticado"] })
            return false
        }

        const user = response.user
        req.user = { id: user._id, email: user.email }
        return next()
    } catch (error) {
        res.status(401).send({ status: "failed", messages: ["No esta autenticado"] })
        return false
    }
}
const userAtuthorized = (role) => async (req, res, next) => {
    const response = await userManager.getUserByEmail(req.user.email)
    const user = response.user
    if (user.roles.includes(role)) { return next() }
    res.status(403).send({ status: "failed", messages: ["No puede realizar esta accion"] })
    return false
}

export const services = {
    userManager,
    productManager,
    cartManager,
    ticketManager,
    userValidation,
    userAtuthorized
}