import passport from "passport";
import local from "passport-local"
import encryptionUtil from "../src/util/encryption.util.js";
import { userModel } from "../model/user.model.js";

const LocalStrategy = local.Strategy
const strategyConfig = { passReqToCallback: true, usernameField: "email" }


//const existentUser = await userModel.findOne({ email: user.email }).exec()

const initializePassport = () => {
    passport.use('register', new LocalStrategy(strategyConfig, async (req, username, password, done) => {
        //const { nombre, apellido, email, password } = req.body
        try {
            let user = await userModel.findOne({ email: username })
            if (user) {
                return done(null, false) // no se registro el usuario porque existia
            }
            const newUser = req.body
            newUser.password = encryptionUtil.hash(password)
            const newDBUser = await userModel.create(newUser)
            return done(null, newDBUser)
        } catch (error) {
            return done("No se pudo registrar - " + error)
        }
    }))
    passport.use('login', new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        //const { nombre, apellido, email, password } = req.body
        try {
            let user = await userModel.findOne({ email: username })

            if (!user || !encryptionUtil.validate(user.password, password)) { return done("Credenciales invalidas") }

            return done(null, user)
        } catch (error) {
            console.log("miremos este error por afuera", error)
            return done("credenciales invalidas")
        }
    }))

    passport.serializeUser((user, done) => { return done(null, user._id) })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id).lean() //lean es tu tema se mongoose y de como devuelve los objetos
            done(null, user)
        }
        catch {
            done("usuario desconocido", false)
        }



    })
}

export default initializePassport

