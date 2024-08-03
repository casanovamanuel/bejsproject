import { Router } from 'express';
// import fs from 'fs'
import multer from 'multer'
import productController from '../controller/product.controller.js';
import userController from '../controller/user.controller.js';


const productRouter = Router()

function fileFilter(req, file, cb) {
    if (file.mimetype !== 'image/png') return cb(null, false)
    cb(null, true)
    // esto es un filtro de archivos, solo para ver como funciona
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './img/product/') //si ya se, debe haber una maner mas linda, despues lo mejoro
    },
    filename: function (req, file, cb) {
        const productId = req.body.productId
        if (!productId) return cb(new Error("faltan datos"), null)
        const date = Date.now()
        cb(null, 'p_' + productId + '_' + date)
    }
})

const uploader = multer({ storage, fileFilter })


productRouter.get(
    '/',
    userController.userValidation,
    userController.userAtuthorized("user"),
    productController.getProducts
)
productRouter.get(
    '/:id',
    userController.userValidation,
    userController.userAtuthorized("user"),
    productController.getProductById
)
productRouter.get(
    '/category/:id',
    userController.userValidation,
    userController.userAtuthorized("premium"),
    productController.getProductsByCategory
)

productRouter.post(
    '/',
    userController.userValidation,
    userController.userAtuthorized("admin"),
    productController.createProduct
)

productRouter.post(
    '/addPhoto',
    userController.userValidation,
    userController.userAtuthorized("admin"),
    uploader.single("photo"),
    productController.addPhoto
)

productRouter.get(
    '/getPhoto/:id',
    userController.userValidation,
    userController.userAtuthorized("user"),
    productController.getPhoto
)

productRouter.delete(
    '/deleteProduct',
    userController.userValidation,
    userController.userAtuthorized("admin"),
    productController.deleteProduct
)

productRouter.delete(
    '/deletePhoto',
    userController.userValidation,
    userController.userAtuthorized("admin"),
    productController.deletePhoto
)

productRouter.put('/',
    userController.userValidation,
    userController.userAtuthorized("admin"),
    productController.updateProduct
)


export default productRouter;