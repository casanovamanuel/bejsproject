import { Router } from 'express';
import fs from 'fs'
import CartManager from '../manager/CartManagerFile.js'

const cartRouter = Router()
const manager = CartManager;
    
cartRouter.get('/', (req,res) => {
    manager.getItems().then( (retValue) => {
        res.json(retValue)
    } );
    
} )

cartRouter.get('/:id', (req,res) => {
    const id = req.params.id
    manager.getItemById(id).then( (retValue) => {
        res.json(retValue)
    } );
    
} )

cartRouter.post('/', (req,res) => {
    const newItem = req.body;
    newItem.quantity = Math.round(newItem.quantity)
    newItem.productId = Math.round(newItem.productId)
    manager.addItem(newItem).then( ()=>{
        res.json({message:"recibido!!!"})
    }).catch((err) => {
        
        res.json({message: err.message})
    })
} )

cartRouter.delete('/:id', (req,res) => {
    const id = req.params.id
    manager.deleteItem(id)
    .then( (ret) => {
        
        res.json({message: "producto borrado"})
    })
    .catch((err) => {
        console.log(err);
        res.json({message: err.message})
     })
})

export default cartRouter;