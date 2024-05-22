import { Router } from "express";
import encryptionUtil from "../../util/encryption.util.js";



const checkRoles = (roles) => (req, res, next) => {
    //si no requiere ningun rol lo dejo pasar
    if (roles.length === 0) return next()

    // si hay roles levanto el rol del usuario de los headers    
    const authHeaders = req.headers.authorization

    // si llegó aca sin un token entonces nunca se logueó
    if (!authHeaders) return res.status(401).send("no se quien sos")

    // obtengo al usuario desde el token
    const signedToken = authHeaders.split(" ")[1]
    let userName = encryptionUtil.verify(signedToken)

    // comparo los roles, y si no tiene el rol adecuado lo echo a patadas
    if (!roles.include(user.role)) return res.status(403).send("no podes entrar aca")

    // esta todo bien entonces paso al siguiente paso con el usuario cargado 
    req.user = user
    next()
}

const customRouter = {
    router: Router(),
    get: function (path, roles, ...callbacks) {
        console.log(roles)
        this.router.get(path, checkRoles(roles), callbacks)
    },
    createToken: function (user) {
        const token = encryptionUtil.generateToken(user)
        return token
    },
    getRouter: function () {
        return this.router;
    }
}

export default customRouter



