import { Router } from 'express';
//import fs from 'fs'
//import uploader from '../util/multer.js'
import productController from '../controller/product.controller.js';


const productRouter = Router()
const checkUsuario = () => { }



productRouter.get('/', productController.getProducts)

productRouter.get('/:id', productController.getProductById)

// productRouter.post('/', productController.createProduct())

// productRouter.put('/:id', productController.modifyProduct())

// productRouter.delete('/:id', productController.deleteProduct())

export default productRouter;