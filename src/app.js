import express from 'express';
import ProductManager from './ProductManagerFile.js';
const expressService = express();

expressService.get('/saludo', (req,res) => {
    res.send("aca te saludan")
})

expressService.get('/bienvenida', (req,res) => {
    res.send("<h1 style=\"color:blue;\"> Bienvenido </h1>")
});


const frutillas = {code: "1", title: "frutilla" , description: "fruta roja" , price: 1, thumbnail:"frutilla.png", stock:10};
const limones   = {code: "2", title: "limon", description: "fruta amarilla" , price: 1, thumbnail:"limon.png", stock:10};
const sandias   = {code: "3", title: "sandia", description: "fruta verde Redonda. muy grande" , price: 1, thumbnail:"sandia.png", stock:10};
const bananas   = {code: "4", title: "banana", description: "fruta amarilla. sin carozo" , price: 1, thumbnail:"banana.png", stock:10};
const uvas      = {code: "5", title: "uva", description: "fruta redonda chiquita" , price: 1, thumbnail:"uva.png", stock:10};
const melones   = {code: "6", title: "melon", description: "fruta amarilla Redonda. famosa por el coctel" , price: 1, thumbnail:"melon.png", stock:10};
const peras     = {code: "7", title: "pera", description: "fruta amarilla panzona" , price: 1, thumbnail:"pera.png", stock:10};
const tomates   = {code: "8", title: "tomate", description: "fruta roja, comun en salsa" , price: 1, thumbnail:"tomate.png", stock:10};
const mangos    = {code: "9", title: "mango", description: "fruta naranja Redonda. cascara lisa" , price: 1, thumbnail:"mango.png", stock:10};
const naranjas  = {code: "10", title: "naranja", description: "fruta naranja, color y nombre coinciden" , price: 1, thumbnail:"naranja.png", stock:10};



expressService.listen(8080, ()=>{console.log("servidor funcionando");} );

