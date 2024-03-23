import { Router } from 'express';
import fs from 'fs'
import ProductManager from '../manager/ProductManagerFile.js'
import uploader from '../util/multer.js'

const productRouter = Router()
const manager = ProductManager;
    
productRouter.get('/', (req,res) => {
    manager.getProducts().then( (retValue) => {
        res.json(retValue)
    } );
    
} )

productRouter.get('/:id', (req,res) => {
    const id = req.params.id
    manager.getProductById(id).then( (retValue) => {
        res.json(retValue)
    } );
    
} )

productRouter.post('/', uploader.array('thumbnails',4), (req,res) => {
    let product = req.body;
    product.thumbnail = req.files
    manager.addProduct(product).then( ()=>{
        res.json({message:"recibido!!!"})
    }).catch((err) => {
        console.log(err);
        req.files.forEach( (elem) => {
            fs.unlinkSync(elem.path)
            
        } )
        res.send(err.message)
    })
    
    
    
} )


export default productRouter;