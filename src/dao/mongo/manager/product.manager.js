import productModel from "../model/product.model.js";
import logUtil from "../../../util/logger.util.js";


const productManager = {
    getAll: async function () {
        try {
            const products = await productModel.find()
            return { status: "success", products: products }
        } catch (error) {
            logUtil.logger.warn(error);
            return { status: "failed", messages: ["no se pudo obtener los productos"] }
        }
    },

    getProductById: async function (productId) {

        try {
            const product = await productModel.findById(productId)
            return { status: "success", product: product }
        } catch (error) {
            logUtil.logger.warn(error);
            return { status: "failed", messages: ["no se pudo obtener el producto"] }
        }

    },
    getProductsByType: async function (productType) {
        const products = await productModel.findById({ type: productType })

        try {
            const products = await productModel.findById({ type: productType })
            return { status: "success", products: products }
        } catch (error) {
            logUtil.logger.warn(error);
            return { status: "failed", messages: ["no se pudo obtener los productos"] }
        }
    },

    saveProduct: async function (product) {
        try {
            const newProduct = await productModel.create(product)
            return { status: "success", messages: ["se agrego correctamente el producto"] }
        } catch (error) {
            logUtil.logger.warn(error);
            return { status: "failed", messages: ["no se pudo agregar el producto"] }
        }
    }

}

export default productManager