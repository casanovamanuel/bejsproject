import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import productRouter from './routes/product.router.js'


const __filename = fileURLToPath( 'file:///home/panda/Codigo/bejsproject/src/app.js' ) 
// a netbeans no le gusta import.meta.url nu se porque

const __dirname = dirname(__filename)

const port = 8080
const expressService = express();

expressService.use(express.json());
expressService.use(express.urlencoded({extended:true}))
expressService.use(express.static(__dirname + '/public'))

expressService.use('/api/product', productRouter)
//expressService.use('/api/cart', productRouter)

expressService.listen(8080, ()=>{console.log("servidor funcionando");} );

