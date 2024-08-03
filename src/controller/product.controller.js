import DAOService from "../dao/factory.js"
import fs from 'fs'


const productManager = DAOService.services.productManager

const unlinkPhoto = function (photoId, logger) {
    if (!photoId) return false

    try {
        fs.unlinkSync('./img/product/' + photoId)
        return true
    } catch (error) {
        logger.warn("no se pudo borrar la imagen: ", photoId)
        return false
    }
}

const productController = {
    getProducts: async function (req, res) {
        const response = await productManager.getAll()
        if (response.status === "failed") return res.status(400).send(response)
        res.status(200).send(response)
    },
    getProductById: async function (req, res) {
        const productId = req.params.id
        const response = await productManager.getProductById(productId)
        if (response.status === "failed") return res.status(400).send(response)
        res.status(200).send(response)
    },

    getProductsByCategory: async function (req, res) {
        const categoryId = req.params.id
        const response = await productManager.getProductsByCategory(categoryId)
        if (response.status === "failed") return res.status(400).send(response)
        res.status(200).send(response)
    },

    createProduct: async function (req, res) {
        const { title, description, price, stock, category } = req.body
        const response = await productManager.saveProduct({ title, description, price, stock, category })
        if (response.status === "failed") return res.status(400).send(response)
        res.status(201).send(response)
    },

    addPhoto: async function (req, res) {
        const productId = req.body.productId
        if (!productId) return res.status(400).send({ status: "failed", messages: ["faltan datos"] })
        if (!req.file) return res.status(400).send({ status: "failed", messages: ["el archivo de imagen no esta soportado o falta"] })
        const filename = req.file.filename
        const response = await productManager.addPhoto(productId, filename)
        if (response.status === "failed") return res.status(400).send(response)
        res.status(201).send(response)
    },

    getPhoto: async function (req, res) {
        const photoId = req.params.id
        const photo = fs.realpathSync('./img/product/' + photoId) // necesito algo mejor, y lo aprendido en clase no me cae muy bien 
        fs.access(photo, fs.constants.R_OK, (err) => {
            if (err) {
                return res.status(400).send({ status: "failed", messages: ["la imagen no existe"] })
            } else {
                return res.sendFile(photo, { headers: { 'Content-Type': 'image/png' } })
            }
        })
    },



    deleteProduct: async function (req, res) {
        if (!req.body.productId) return res.status(400).send({ status: "failed", messages: ["faltan datos"] })
        const productId = req.body.productId
        const response = await productManager.deleteProduct(productId)
        if (response.status === "failed") return res.status(400).send(response)
        const photos = response.photos  // esto es un abuso, lo voy a solucionar
        let allPhotosFound = true
        photos.forEach(element => {
            if (!unlinkPhoto(element, req.logger)) allPhotosFound = false
        });
        delete response.photos
        if (!allPhotosFound) {
            req.logger.warn("no se pudieron borrar todas las fotos: ", photos)
        }
        res.status(200).send(response)
    },

    deletePhoto: async function (req, res) {
        if (!req.body.photoId) return res.status(400).send({ status: "failed", messages: ["faltan datos"] })
        const filenameRegexp = /p_\w+_\w+/
        const photoId = req.body.photoId
        if (!filenameRegexp.test(photoId)) return res.status(400).send({ status: "failed", messages: ["la imagen no existe"] })
        const productId = photoId.split('_')[1]
        const response = await productManager.deletePhoto(productId, photoId)
        if (response.status === "failed") return res.status(400).send(response)
        if (unlinkPhoto(photoId, req.logger)) {
            return res.status(200).send(response)
        } else {
            return res.status(400).send({ status: "failed", messages: ["la imagen no existe"] })
        }
    },

    updateProduct: async function (req, res) {

        if (!req.body.productId) return res.status(400).send({ status: "failed", messages: ["no se encontro el id"] })
        const productId = req.body.productId
        const { title, description, price, stock, category } = req.body
        if (!title && !description && !price && !stock && !category) return res.status(400).send({ status: "failed", messages: ["faltan datos"] })
        const response = await productManager.updateProduct(productId, { title, description, price, stock, category })
        if (response.status === "failed") return res.status(400).send(response)
        res.status(200).send(response)
    }



}
export default productController