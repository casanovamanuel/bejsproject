import { Router } from 'express';
const sessionRouter = Router()

const authMiddleware = (req, res, next) => {
    if (req.session?.user === "fulanito") { // esto es check user 
        return next()
    }
    res.status(401).send("<p>No se quien sos - logueate hermano/a/e</p><br/><a href='/session/login'>por aca</>")
    //@TODO: pasar esto a una vista
}


sessionRouter.get('/login', (req, res) => {
    res.render("session/form")
})

sessionRouter.get('/private', authMiddleware, (req, res) => {
    if (req.session.counter !== undefined) {
        req.session.counter++
        res.send("Hola " + req.session.user + " por vez " + req.session.counter)
    } else {
        req.session.counter = 0
        res.send("Bienvenido " + req.session.user)
    }

})

sessionRouter.post('/login', (req, res) => {
    const nombre = req.body.nombre;

    req.session.user = nombre
    res.redirect("/session/private")

})


export default sessionRouter;