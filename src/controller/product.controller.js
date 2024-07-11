import DAOService from "../dao/factory.js"

const productManager = DAOService.services.productManager

const productController = {
    getProducts: async function (req, res) {
        const response = await productManager.getAll()
        if (response.status === "failed") return res.status(400).send(response)
        res.status(200).send(response)
    },
    getProductById: async function (req, res) {
        const productId = req.params.id
        const response = await productManager.getProductById(productId)
        if (response.status === "failed") return res.status(400).send(response)
        res.status(200).send(response)
    },


}

export default productController