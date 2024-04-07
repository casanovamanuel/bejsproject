import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import userRouter from './routes/user.router.js'
import handlebars from 'express-handlebars'

const __filename = fileURLToPath( 'file:///home/panda/Codigo/bejsproject/src/app.js' ) 
// a netbeans no le gusta import.meta.url nu se porque .... la gente de apache lo esta solucionando

const __dirname = dirname(__filename)

const port = 8080
const expressService = express();  

expressService.engine('handlebars', handlebars.engine())
expressService.set('views', __dirname+'/views')
expressService.set('view engine', 'handlebars')


expressService.use(express.json());
expressService.use(express.urlencoded({extended:true}))
expressService.use('/static',express.static('public'))

expressService.use('/api/product', productRouter)
expressService.use('/api/cart', cartRouter)
expressService.use('/', viewsRouter)
expressService.use('/user', userRouter)
//expressService.use('/api/cart', productRouter)  //@TODO: esto falta!!!!

expressService.listen(8080, ()=>{console.log("servidor funcionando");} );

