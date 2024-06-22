import DAOService from "../dao/factory.js"


const cartManager = DAOService.services.cartManager
const productManager = DAOService.services.productManager

const userValidation = DAOService.services.userValidation
const userAtuthorized = DAOService.services.userAtuthorized

const cartController = {

    getUserCart: async function (req, res) {

        const userId = req.user.id

        const response = await cartManager.getUserCart(userId)
        if (response.status === "failed") {
            console.log(response.error);
            res.status(500).send({ status: "failed", error: "no se pudo obtener el carrito" })
            return false
        }
        return res.status(200).send({ status: "success", cart: response.cart })


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
        res.status(201).send(response)

    },
    removeProduct: async function (req, res) {
        const user = req.user
        const response = await cartManager.getUserCart(user.id)

        if (response.status === "failed") return res.status(400).send(response)
        console.log(req.body);
        const { productId } = req.body
        const responseProduct = await productManager.getProductById(productId)
        if (responseProduct.status === "failed") return res.status(400).send(responseProduct)

        const removedResponse = await cartManager.removeProduct(user.id, productId)
        if (removedResponse.status === "failed") return res.status(400).send(removedResponse)
        res.status(200).send(removedResponse)

    },
    checkoutCart: async function (req, res) {

        const user = req.user
        const responseCart = cartManager.getUserCart(user.id)
        if (responseCart.status === "failed") return res.status(400).send(responseCart)

        const cartId = responseCart.cart.id
        const response = await cartManager.checkoutCart(cartId)
        if (response.status === "failed") return res.status(400).send(response)
        return res.status(200).send(response)
    },
    userValidation,
    userAtuthorized
    // necesito mejorar esto urgente
}

export default cartController