import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = "secretoparaeltoken"

const createHash = (password) => { return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) }
const isValidPassword = (storedPassword, password) => { return bcrypt.compareSync(password, storedPassword) }
const generateToken = (email) => {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
};

const verify = (token) => { return jwt.verify(token, JWT_SECRET) }

export default { hash: createHash, validate: isValidPassword, generateToken, verify }


