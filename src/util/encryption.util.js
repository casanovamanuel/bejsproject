import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { entorno } from "../config/config.js";

const JWT_SECRET = entorno.secretJWT

const createHash = (password) => { return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) }
const isValidPassword = (password, storedPassword) => {
    //console.log(storedPassword, password);
    return bcrypt.compareSync(password, storedPassword)
}
const generateToken = (username) => {
    return jwt.sign({ username: username }, JWT_SECRET, { expiresIn: "1h" });
};

const verify = (token) => {
    return jwt.verify(token, JWT_SECRET, (error, credentials) => {
        if (error) {
            console.log(error);
            return false
        }

        return credentials
    })
}

export default { hash: createHash, validate: isValidPassword, generateToken, verify }
