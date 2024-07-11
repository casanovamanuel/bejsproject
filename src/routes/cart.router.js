import { Router } from 'express';
import cartController from '../controller/cart.controller.js';
import userController from '../controller/user.controller.js';

const cartRouter = Router()

cartRouter.get("/",
    userController.userValidation,
    userController.userAtuthorized("user"),
    cartController.getUserCart
)

cartRouter.post("/addProduct",
    userController.userValidation,
    userController.userAtuthorized("user"),
    cartController.addProduct
)

cartRouter.post("/checkoutCart",
    userController.userValidation,
    userController.userAtuthorized("user"),
    cartController.checkoutCart
)

cartRouter.delete("/removeProduct",
    userController.userValidation,
    userController.userAtuthorized("user"),
    cartController.removeProduct
)



export default cartRouter;