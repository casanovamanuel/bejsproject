import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import userRouter from './routes/user.router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'



const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const port = 8080
const expressService = express();

expressService.engine('handlebars', handlebars.engine())
expressService.set('views', __dirname + '/views')
expressService.set('view engine', 'handlebars')


expressService.use(express.json());
expressService.use(express.urlencoded({ extended: true }))
expressService.use('/static', express.static('public'))

expressService.use('/api/product', productRouter)
expressService.use('/api/cart', cartRouter)
expressService.use('/user', userRouter)
expressService.use('/', viewsRouter)

const server = expressService.listen(8080, () => { console.log("servidor funcionando"); });
//const listener = expressService.listen(8090, ()=>{console.log("escuchando");} );

const io = new Server(server)
io.on("connection", (socket) => {

    socket.on("checkin", (data) => {
        console.log(data);
    })

})


expressService.set('socketServer', io)