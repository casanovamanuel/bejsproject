import { Router } from "express";

const router = Router()

router.get("/", (req,res)=>{
    
    res.render('index',{title: "Este es el titulo", style:"index.css"})

})

export default router