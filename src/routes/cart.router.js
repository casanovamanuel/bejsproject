import { Router } from 'express';
import cartController from '../controller/cart.controller.js';

const cartRouter = Router()

cartRouter.get("/",
    cartController.userValidation,
    cartController.userAtuthorized("user"),
    cartController.getUserCart)

cartRouter.post("/addProduct",
    cartController.userValidation,
    cartController.userAtuthorized("user"),
    cartController.addProduct)

cartRouter.post("/checkoutCart",
    cartController.userValidation,
    cartController.userAtuthorized("user"),
    cartController.checkoutCart)

cartRouter.delete("/removeProduct",
    cartController.userValidation,
    cartController.userAtuthorized("user"),
    cartController.removeProduct)



export default cartRouter;