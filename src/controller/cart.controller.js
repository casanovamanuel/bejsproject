import DAOService from "../dao/factory.js"


const cartManager = DAOService.services.cartManager
const productManager = DAOService.services.productManager
const ticketManager = DAOService.services.ticketManager

const cartController = {

    getUserCart: async function (req, res) {

        const userId = req.user.id

        const response = await cartManager.getUserCart(userId)
        if (response.status === "failed") return res.status(500).send(response)
        return res.status(200).send(response)


    },
    addProduct: async function (req, res) {

        const { productId, ammount } = req.body
        if (!productId || !ammount) return res.status(400).send({ status: "failed", messages: ["faltan datos"] })
        if (!Number(ammount)) return res.status(400).send({ status: "failed", messages: ["la cantidad debe ser un numero"] })
        if (ammount < 1) return res.status(400).send({ status: "failed", messages: ["la cantidad debe ser mayor a 0"] })


        const responseProduct = await productManager.getProductById(productId)
        if (responseProduct.status === "failed") return res.status(400).send(responseProduct)

        const response = await cartManager.addProduct(req.user, productId, ammount)
        if (response.status === "failed") return res.status(400).send(response)
        return res.status(201).send(response)

    },
    removeProduct: async function (req, res) {
        const user = req.user
        const response = await cartManager.getUserCart(user.id)

        if (response.status === "failed") return res.status(400).send(response)

        const { productId } = req.body
        const responseProduct = await productManager.getProductById(productId)
        if (responseProduct.status === "failed") return res.status(400).send(responseProduct)

        const removedResponse = await cartManager.removeProduct(user.id, productId)
        if (removedResponse.status === "failed") return res.status(400).send(removedResponse)
        res.status(200).send(removedResponse)

    },
    checkoutCart: async function (req, res) {

        const user = req.user
        const responseCart = await cartManager.getUserCart(user.id)
        if (responseCart.status === "failed") return res.status(400).send(responseCart)

        const cart = responseCart.cart
        const response = await cartManager.checkoutCart(cart)
        if (response.status === "failed") return res.status(400).send(response)
        req.logger.info({ message: "response checkout: ", payload: response })

        const ticketResponse = await ticketManager.createTicket(responseCart.cart)
        if (ticketResponse.status === "failed") return res.status(400).send(ticketResponse)
        return res.status(200).send(ticketResponse)
    }
}

export default cartController