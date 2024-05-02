import bcrypt from 'bcrypt'


const createHash = (password) => { bcrypt.hashSync(password, bcrypt.genSaltSync(10)) }
const isValidPassword = (storedPassword, password) => { bcrypt.compareSync(password, storedPassword) }


export default { hash: createHash, validate: isValidPassword }