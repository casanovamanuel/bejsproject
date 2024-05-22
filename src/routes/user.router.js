import { Router } from 'express';
import passport from 'passport';


const userRouter = Router()


const checkUser = (req, res, next) => {
    const user = req.body;
    console.log("quiero chequear a: ", user)
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

userRouter.post('/register', checkUser, passport.authenticate('register', { failureRedirect: '/user/failedRegister' }), (req, res) => {
    res.redirect("/user/profile")
})

userRouter.get('/failedRegister', (req, res) => {
    res.send({ error: "fallo el registro" })
})

userRouter.get('/failedLogin', (req, res) => {
    res.send({ error: "Fallo el login" })
})



userRouter.get('/', (req, res) => {
    res.status(200).render('user/index')
})

userRouter.get('/register', (req, res) => {

    res.status(200).render('user/register')
})

userRouter.get('/login', (req, res) => {

    res.status(200).render('user/login')
})

userRouter.post('/login', passport.authenticate('login', { failureRedirect: "/user/failedLogin" }), async (req, res) => {
    let user = req.user;
    if (!user) {
        res.render("user/login", { error: "credenciales invalidas" })
    } else {
        res.redirect("/user/profile")
    }
})

userRouter.get('/profile', async (req, res) => {
    const user = req.user
    //console.log(req.session)
    if (user) {
        res.status(200).render('user/profile', { user: user })
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