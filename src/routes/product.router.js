import { Router } from 'express';
import fs from 'fs'
import ProductManager from '../manager/ProductManagerFile.js'
import uploader from '../util/multer.js'



const productRouter = Router()
const manager = ProductManager;

productRouter.get('/', (req, res) => {
    manager.getProducts().then((retValue) => {


        res.json(retValue)
    }).catch((err) => { console.log(err) });

})

productRouter.get('/:id', (req, res) => {
    const id = req.params.id

    manager.getProductById(id)
        .then((retValue) => {
            res.json(retValue)
        })
        .catch((err) => console.log(err))

})

productRouter.post('/', uploader.array('thumbnails', 4), (req, res) => {
    let product = req.body;
    product.thumbnail = (req.files === undefined) ? [] : req.files;
    manager.addProduct(product).then(() => {
        const ss = req.app.get("socketServer")
        ss.sockets.emit("refreshProduts", {})
        res.json({ message: "recibido!!!" })
    }).catch((err) => {
        req.files.forEach((elem) => {
            fs.unlinkSync(elem.path)
        })
        res.json({ message: err.message })
    })
})

productRouter.put('/', uploader.array('thumbnails', 4), (req, res) => {
    let product = req.body;

    product.thumbnail = (req.files === undefined) ? [] : req.files;

    let oldProduct = {}
    manager.getProductById(product.code)
        .then((res) => { oldProduct = res })
        .catch((err) => console.log(err))

    manager.updateProduct(product).then(() => {
        oldProduct.thumbnail.forEach((elem) => {
            fs.unlinkSync(elem.path)
        })
        const ss = req.app.get("socketServer")
        ss.sockets.emit("refreshProduts", {})
        res.json({ message: "recibido!!!" })
    }).catch((err) => {
        req.files.forEach((elem) => {
            fs.unlinkSync(elem.path)
        })
        res.json({ message: err.message })
    })
})

productRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    manager.deleteProduct(id)
        .then((ret) => {
            ret.thumbnail.forEach((elem) => {
                fs.unlinkSync(elem.path)
            })
            const ss = req.app.get("socketServer")
            ss.sockets.emit("refreshProduts", {})
            res.json({ message: "producto borrado" })
        })
        .catch((err) => {
            console.log(err);
            res.json({ message: err.message })
        })
})

export default productRouter;