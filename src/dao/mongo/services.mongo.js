import userManager from "./manager/user.manager.js"
import productManager from "./manager/product.manager.js"
import cartManager from "./manager/cart.manager.js";
import encryptionUtil from "../../util/encryption.util.js";

import { entorno } from "../../config/config.js";

import mongoose from "mongoose"

mongoose.set('debug', true);
mongoose.connect(entorno.mongoUrl)

const userVerification = async (role) => async (req, res, next) => {
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
    if (req.user.role !== role) {
        res.status(403).send({ status: "failed", messages: ["No tiene permitido acceder a este punto"] })
        return false
    }
    next()
}

export const services = {
    userManager,
    productManager,
    cartManager,
    userVerification
}