import productModel from "../model/product.model.js";


const productManager = {
    getAll: async function () {
        try {
            const products = await productModel.find()
            return { status: "success", products: products }
        } catch (error) { // eto no ta bien
            console.log(error);
            return { status: "failed", messages: ["no se pudo obtener los productos"] }
        }
    },

    getProductById: async function (productId) {

        try {
            const product = await productModel.findById(productId)
            return { status: "success", product: product }
        } catch (error) { // eto no ta bien
            console.log(error);
            return { status: "failed", messages: ["no se pudo obtener el producto"] }
        }

    },
    getProductsByType: async function (productType) {
        const products = await productModel.findById({ type: productType })

        try {
            const products = await productModel.findById({ type: productType })
            return { status: "success", products: products }
        } catch (error) {
            console.log(error);
            return { status: "failed", messages: ["no se pudo obtener los productos"] }
        }
    }

}

export default productManager