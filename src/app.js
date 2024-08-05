//express
import express from 'express';
// direcciones internas
import baseDirName from './dirname.js'
import logUtil from './util/logger.util.js';

//routers
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import userRouter from './routes/user.router.js'

// servicios
import handlebars from 'express-handlebars'
// import { Server } from 'socket.io'
import cookieParser from 'cookie-parser';
import { entorno } from "./config/config.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'




// configurando express 
const expressService = express();
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce API',
            version: '1.0.0',
        },
    },
    apis: ['/home/panda/Codigo/bejsproject/docs/User/User.yml'],
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)
expressService.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs))

expressService.engine('handlebars', handlebars.engine())
expressService.set('views', baseDirName + '/views')
expressService.set('view engine', 'handlebars')
// middlewares
expressService.use(express.json());
expressService.use(express.urlencoded({ extended: true }))
expressService.use('/static', express.static('public'))
expressService.use(cookieParser())
expressService.use(logUtil.loggerMiddleware)


// definicion de rutas
expressService.use('/api/product', productRouter)
expressService.use('/api/cart', cartRouter)
expressService.use('/api/user', userRouter)
expressService.use('/', viewsRouter) // default - puede que sea necesario hacer desaparecer

logUtil.logger.info('./docs/**/*.yml')
const server = expressService.listen(entorno.port, () => { logUtil.logger.info("servidor funcionando en: " + entorno.port); });
