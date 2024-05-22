import { Router } from 'express';
import fs from 'fs'
import uploader from '../util/multer.js'
import productModel from '../model/product.model.js';
import mongooseErrorHandler from '../util/mongoose.util.js'; //ya lo voy usar



const productRouter = Router()
const checkUsuario = () => { }



productRouter.get('/', (req, res) => {
    console.log(productModel.prototype);
    productModel.find()
        .then((list) => {

            res.status(200).send({ result: "success", payload: list })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ result: "error", payload: {} })
        })
})

productRouter.get('/:id', (req, res) => {
    const id = req.params.id
    productModel.findOne({ _id: id })
        .then((elemento) => {
            res.status(200).send({ result: "success", payload: elemento })
        })
        .catch((error) => {
            res.status(500).send({ result: "error", payload: {} })
        })

})

productRouter.post('/', uploader.array('thumbnail', 4), async (req, res) => {
    let product = req.body;
    product.thumbnail = (req.files === undefined) ? [] : req.files.map((file) => file.path);
    productModel.create(product)
        .then(() => { res.send({ message: "recibido coorectamente" }) })
        .catch((error) => {
            req.files.forEach((thumbnailFile) => {
                fs.unlink(thumbnailFile.path, (err => { if (err) console.log(err) }))
            })
            let errorMessages = []
            for (const property in error.errors) {

                errorMessages.push(property + " => " + error.errors[property].message)
            }
            res.status(400).send(errorMessages)
        })

    //return newProduct
})

productRouter.put('/:id', uploader.array('thumbnail', 4), (req, res) => {
    let product = req.body;
    const productId = req.params.id
    product.thumbnail = (req.files === undefined) ? [] : req.files.map((file) => file.path);
    productModel.findByIdAndUpdate({ _id: productId }, product, { runValidators: true })
        .then((oldProduct) => {
            oldProduct.thumbnail.map((path) => fs.unlink(path, (err) => { if (err) console.log(err) }))
            res.status(201).send({ message: "modificado correctamente" })
        })
        .catch((error) => {
            product.thumbnail.map((path) => fs.unlink(path, (err) => { if (err) console.log(err) }))
            let errorMessages = []
            for (const property in error.errors) {
                errorMessages.push(property + " => " + error.errors[property].message)
            }
            res.status(400).send(errorMessages)
        })

})

productRouter.delete('/:id', (req, res) => {

    const query = { _id: req.params.id }
    const doomedProduct = productModel.findOne(query);
    productModel.deleteOne(query)
        .then((elem) => {
            doomedProduct.thumbnail.map((elem) => { fs.unlink(path, (err) => { if (err) console.log(err) }) })
            res.status(202).send({ message: "elemento borrado" })
        })
        .catch((error) => {

        })


})

export default productRouter;