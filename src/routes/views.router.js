import { Router } from "express";

const router = Router()

router.get("/", (req, res) => {

    res.render('index', { title: "Este es el titulo", style: "index.css" })

})

router.get("/productList", (req, res) => {

    res.render('productlist', { title: "Lista de Productos", style: "index.css" })

})


export default router