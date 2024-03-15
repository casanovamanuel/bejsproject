import mongoose from 'mongoose';

import { usuarioModel } from './model/user.model.js'

const conn = mongoose.connect(
        'mongodb+srv://panda:oh5BNkE7ye4X6dkL@cluster0.9nxlnax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then((value)=>{console.log("lalalala");})
.catch((error)=>{console.log(error);})

