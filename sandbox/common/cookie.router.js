import { Router } from 'express';
const cookieRouter = Router()


cookieRouter.get('/cookieForm', (req, res) => {
    res.render("cookies/form")
})

cookieRouter.get('/getCookie', (req, res) => {

    res.send(req.cookies.lagalletita)

})

cookieRouter.post('/cookieForm', (req, res) => {
    const newItem = req.body;
    res.cookie("lagalletita", newItem.mailcito, { maxAge: 10000 }).send("<a href='/cookie/getCookie' >ver cookie</a>")
})


export default cookieRouter;