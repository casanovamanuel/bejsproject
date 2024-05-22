import customRouter from './custom.router.js';

const dumbRouter = customRouter
// import { Router } from "express"

// const dumbRouter = Router()

let users = []

dumbRouter.get('/', [], (req, res) => {
    res.send(users)
})

dumbRouter.get('/private', ["USER"], (req, res) => {
    console.log("entre bien")
    res.send("todo lindo")
})

// dumbRouter.post('/login', [], (req, res) => {
//     const user = req.body
//     const resultToken = this.createToken(user)
//     res.send({ status: "success", payload: resultToken })
// })

// dumbRouter.post('/register', [], (req, res) => {
//     const user = req.body
//     users.push(user)
//     res.send({ status: "success", payload: user })
// })


export default dumbRouter.router



