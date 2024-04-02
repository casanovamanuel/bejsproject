import { Router } from 'express';

const userRouter = Router()
let usersList = []

userRouter.get('/', (req,res) => {
        const jsonUsers = JSON.stringify(usersList)
        res.render('user/index',{users: usersList})
} )

userRouter.get('/register', (req,res) => {
        res.render('user/register')
} )

userRouter.post('/',  (req,res) => {
    let user = req.body;
    usersList.push(user)
    res.render('user/received', {received: user})
} )

export default userRouter;