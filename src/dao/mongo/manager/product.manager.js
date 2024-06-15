import productModel from "../model/product.model.js";


const productManager = {
    getAll: async function () {
        try {
            const products = await productModel.find()
            return products
        } catch (error) { // eto no ta bien
            console.log(error);
            return null
        }
    },

    getProductById: async function (productId) {

        try {
            const product = await productModel.findById(productId)
            return product
        } catch (error) { // eto no ta bien
            console.log(error);
            return null
        }

    },
    getProductsByType: async function (productType) {
        const products = await productModel.findById({ type: productType })

        try {
            const products = await productModel.findById({ type: productType })
            return products
        } catch (error) { // eto no ta bien
            console.log(error);
            return null
        }
    }

}

export default productManager