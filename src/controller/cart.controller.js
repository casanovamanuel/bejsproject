import DAOService from "../dao/factory.js"


const cartManager = DAOService.services.cartManager

const userManager = DAOService.services.userManager

const cartController = {
    createCart: async function (req, res) {
        const userMail = 'casanova_manuel@yahoo.com'
        const user = await userManager.getUserByEmail(userMail)
        const cart = { userId: user._id, products: [] }
        cartManager.createCart(cart)
            .then((data) => {
                res.status(201).send({ status: "success", cart: data })
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ status: "failed", error: "no se pudo crear el carrito" })
            })

    },
    getUserCart: async function (req, res) {
        const { userId } = req.body

        cartManager.getUserCart(userId)
            .then((data) => {
                res.status(200).send({ status: "success", cart: data })
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ status: "failed", error: "no se pudo obtener el carrito" })
            })

    },
    addProduct: async function (req, res) {
        const { cartId, product, ammount } = req.body

        cartManager.addProduct(cartId, product, ammount)
            .then((data) => {
                res.status(201).send({ status: "success", cart: data })
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ status: "failed", error: "no se pudo agregar el producto" })
            })
    },
    removeProduct: async function (req, res) {
        const { cartId, product } = req.body

        cartManager.removeProduct(cartId, product)
            .then((data) => {
                res.status(201).send({ status: "success", cart: data })
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ status: "failed", error: "no se pudo quitar el producto" })
            })
    },
    checkoutCart: async function (req, res) {//// este va a ser el dolor de cabeza
        const { cartId } = req.body

        cartManager.checkoutCart(cartId)
            .then((data) => {
                res.status(201).send({ status: "success", cart: data })
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ status: "failed", error: "no se pudo agregar el producto" })
            })
    },
}

export default cartController