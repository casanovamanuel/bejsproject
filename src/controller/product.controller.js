import DAOService from "../dao/factory.js"

let productManager = DAOService.services.productManager

const productController = {
    getProducts: async function (req, res) {
        const allProducts = await productManager.getAll()
        res.status(200).send({ status: "proceso exitoso", products: allProducts })
    },
    getProductById: async function (req, res) {
        const productId = req.params.id
        productManager.getProductById(productId)
            .then((data) => {
                res.status(200).send({ status: "success", product: data })
            })
            .catch((error) => {
                res.status(400).send({ status: "failure", causes: error })
            })
    },
    // getProductsByType: async function (req, res) {

    // }

}

export default productController