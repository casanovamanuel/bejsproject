import { Router } from 'express';
import userController from '../controller/user.controller.js';


const userRouter = Router()


userRouter.post('/login', userController.login)
userRouter.post('/register', userController.register)
userRouter.get("/wellfare", userController.userValidation, userController.wellfareCheck)
userRouter.put(
    "/updateUser",
    userController.userValidation,
    userController.userAtuthorized("admin"),
    userController.update
)


export default userRouter;