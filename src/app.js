import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import userRouter from './routes/user.router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionRouter from './routes/session.router.js';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './config/passport.config.js';


const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const port = 8080
const mongoConnectionUrl = "mongodb://localhost:27017/ecommerce"
// mongoose config
mongoose.set('debug', true);
mongoose.pluralize(null); // si hay cosas molestas esta es una .... y no anda
mongoose.connect(mongoConnectionUrl)


// express setings 
const expressService = express();

expressService.engine('handlebars', handlebars.engine())
expressService.set('views', __dirname + '/views')
expressService.set('view engine', 'handlebars')


expressService.use(express.json());
expressService.use(express.urlencoded({ extended: true }))
expressService.use('/static', express.static('public'))
expressService.use(cookieParser())
expressService.use(session(
    {
        store: MongoStore.create({
            mongoUrl: "mongodb://localhost:27017/ecommerce",
            ttl: 2 * 60 // 2 minutos
        }),
        secret: 'misecretitomuysecreto',
        resave: false,
        saveUninitialized: false
    }
))

//uso de passport
initializePassport()
expressService.use(passport.initialize())
expressService.use(passport.session())


expressService.use('/api/product', productRouter)
expressService.use('/api/cart', cartRouter)
expressService.use('/user', userRouter)
expressService.use('/session', sessionRouter)
expressService.use('/', viewsRouter)

const server = expressService.listen(8080, () => { console.log("servidor funcionando"); });
//const listener = expressService.listen(8090, ()=>{console.log("escuchando");} );

const io = new Server(server)
io.on("connection", (socket) => {
    console.log("conectado: ", socket.id)
    socket.on("checkin", (data) => {
        console.log(data);
    })

})


expressService.set('socketServer', io) // ayuda!!!

