//express
import express from 'express';
// direcciones internas
import baseDirName from './dirname.js'

//routers
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import userRouter from './routes/user.router.js'

// servicios
import handlebars from 'express-handlebars'
// import { Server } from 'socket.io'
import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
//import passport from 'passport';
//import initializePassport from './config/passport.config.js'; 4
import { entorno } from "./config/config.js";
import mongoose from 'mongoose';





// mongoose config


// configurando express 
const expressService = express();

expressService.engine('handlebars', handlebars.engine())
expressService.set('views', baseDirName + '/views')
expressService.set('view engine', 'handlebars')
expressService.use(express.json());
expressService.use(express.urlencoded({ extended: true }))
expressService.use('/static', express.static('public'))
expressService.use(cookieParser())

// definicion de rutas
expressService.use('/api/product', productRouter)
expressService.use('/api/cart', cartRouter)
expressService.use('/api/user', userRouter)
expressService.use('/', viewsRouter) // default - puede que sea necesario hacer desaparecer



const server = expressService.listen(entorno.port, () => { console.log("servidor funcionando en: " + entorno.port); });
