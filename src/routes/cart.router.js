import { Router } from 'express';
import cartController from '../controller/cart.controller.js';

const cartRouter = Router()

cartRouter.get("/", cartController.getUserCart)

export default cartRouter;