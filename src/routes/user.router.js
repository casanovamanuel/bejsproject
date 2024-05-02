import { Router } from 'express';
import { userModel } from '../model/user.model.js';
// import mongooseUtil from "../util/mongoose.util.js"
import passport from 'passport';


const userRouter = Router()
const checkUser = (req, res, next) => {
    const user = req.body;
    console.log("chequeando");
    let errors = []
    if (!user.email) errors.push("no ingreso el correo electrónico")
    if (!user.nombre) errors.push("no ingreso el nombre")
    if (!user.apellido) errors.push("no ingreso el apellido")

    if (!user.password) errors.push("no ingreso la contraseña")
    if (errors.length > 0) {
        res.status(400).render("user/register", { errorList: errors })
    } else {
        next()
    }
}

userRouter.post('/register', checkUser, passport.authenticate('register', { failureRedirect: '/failedRegister' }))

userRouter.get('/failedRegister', async (req, res) => {
    res.status(400).send({ error: "fallo el registro" })
})




userRouter.get('/', (req, res) => {
    res.status(200).render('user/index')
})

userRouter.get('/register', (req, res) => {

    res.status(200).render('user/register')
})
/* 
userRouter.post('/register', checkUser, async (req, res) => {
    const user = req.body;

    const existentUser = await userModel.findOne({ email: user.email }).exec()

    if (existentUser) { return res.status(400).render("user/register", { errorList: ["El usuario ya existe   -.- "] }) }
    userModel.create(user)
        .then((data) => {
            req.session.user = data._id
            res.status(200).redirect("/user/profile")
        })
        .catch((insertionError) => {
            console.log(mongooseUtil.handleErrors(insertionError)); //estos son errores para mi
            res.status(500).render("user/register", { errorList: ["No se pudo ingresar el usuario"] })
        })
})
 */
userRouter.get('/login', (req, res) => {

    res.status(200).render('user/login')
})

userRouter.post('/login', async (req, res) => {
    let credentials = req.body;
    const user = await userModel.findOne(credentials).exec()
    if (user) {
        req.session.user = user._id
        res.status(200).redirect("/user/profile")
    } else {
        res.status(401).redirect("/user")
    }

})

userRouter.get('/profile', async (req, res) => {
    const userId = req.session.user

    if (userId) {
        const dbUser = await userModel.findById(userId).exec()
        //console.log(dbUser);
        const loggedUser = { // no le gusta recibir el usuario directamente , quiero ver esto
            nombre: dbUser.nombre,
            apellido: dbUser.apellido,
            nacimiento: dbUser.nacimiento,
            email: dbUser.email
        }
        res.status(200).render('user/profile', { user: loggedUser })
    } else {
        res.status(401).redirect("/user")
    }
})

userRouter.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) console.log(err)
    })

    res.status(200).redirect('/user')
})
export default userRouter;