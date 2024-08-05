import productModel from "../model/product.model.js";
import logUtil from "../../../util/logger.util.js";



function checkProduct(product) {
    let errors = []
    if (product.title === undefined) errors.push("no se pudo obtener el titulo")
    if (product.description === undefined) errors.push("no se pudo obtener la descripción")
    if (product.price === undefined) errors.push("no se pudo obtener el precio")
    if (product.stock === undefined) errors.push("no se pudo obtener el stock")
    if (product.category === undefined) errors.push("no se pudo obtener la categoría")
    if (product.title === "") errors.push("el titulo no puede estar vacía")
    if (product.description === "") errors.push("la descripción no puede estar vacía")
    if (product.price === "") errors.push("el precio no puede estar vacío")
    if (product.stock === "") errors.push("el stock no puede estar vacío")
    if (product.category === "") errors.push("la categoría no puede estar vacía")
    if (Number(product.price) < 1) errors.push("el precio no puede ser negativo")
    if (Number(product.stock) < 0) errors.push("el stock no puede ser negativo")
    if (product.category === "") errors.push("la categoría no puede estar vacía")
    const productFields = ["title", "description", "price", "stock", "category", "thumbnail"]
    const foreigners = Object.keys(product).filter(element => !productFields.includes(element))
    if (foreigners.length > 0) {
        errors.push("Hay campos desconocidos: " + JSON.stringify(foreigners))
    }

    return errors
}


const productManager = {
    getAll: async function () {
        try {
            const products = await productModel.find()
            return { status: "success", products: products }
        } catch (error) {
            logUtil.logger.warn({ status: "failed", error: error });
            return { status: "failed", messages: ["no se pudo obtener los productos"] }
        }
    },

    getProductById: async function (productId) {

        try {
            const product = await productModel.findById(productId)
            return { status: "success", product: product }
        } catch (error) {
            logUtil.logger.warn({ status: "failed", error: error });
            return { status: "failed", messages: ["no se pudo obtener el producto"] }
        }

    },
    getProductsByCategory: async function (category) {
        try {
            const products = await productModel.find({ category: category })
            if (products.length == 0) return { status: "failed", messages: ["la categoria no existe"] }
            return { status: "success", products: products }
        } catch (error) {
            logUtil.logger.warn({ status: "failed", error: error });
            return { status: "failed", messages: ["no se pudo obtener los productos"] }
        }
    },

    saveProduct: async function (product) {
        try {
            const errors = checkProduct(product)
            if (errors.length > 0) return { status: "failed", messages: errors }
            const newProduct = await productModel.create(product)
            return { status: "success", messages: ["se agrego correctamente el producto"] }
        } catch (error) {
            logUtil.logger.warn({ status: "failed", error: error });
            return { status: "failed", messages: ["no se pudo agregar el producto"] }
        }
    },

    addPhoto: async function (productId, filename) {
        try {
            const product = await productModel.findById(productId).exec()
            if (!product) return { status: "failed", messages: ["el producto no existe"] }
            product.thumbnail.push(filename)
            await productModel.findByIdAndUpdate({ _id: productId }, { $set: { thumbnail: product.thumbnail } })
            return { status: "success", messages: ["se agrego correctamente la imagen"] }
        } catch (error) {
            logUtil.logger.warn({ status: "failed", error: error });
            return { status: "failed", messages: ["no se pudo agregar la imagen"] }
        }
    },

    // deleteProduct: async function (productId) {
    //     try {
    //         const product = await productModel.findById(productId).exec()
    //         if (!product) return { status: "failed", messages: ["el producto no existe"] }
    //         await productModel.findByIdAndDelete({ _id: productId })
    //         return { status: "success", messages: ["se elimino correctamente el producto"], photos: product.thumbnail }
    //     } catch (error) {
    //         logUtil.logger.warn({ status: "failed", error: error });
    //         return { status: "failed", messages: ["no se pudo eliminar el producto"] }
    //     }
    // },

    deletePhoto: async function (productId, filename) {
        try {
            const product = await productModel.findById(productId).exec()
            if (!product) return { status: "failed", messages: ["el producto no existe"] }
            product.thumbnail = product.thumbnail.filter((elem) => {
                return elem != filename
            })
            await productModel.findByIdAndUpdate({ _id: productId }, { $set: { thumbnail: product.thumbnail } })
            return { status: "success", messages: ["se elimino correctamente la imagen"] }
        } catch (error) {
            logUtil.logger.warn({ status: "failed", error: error });
            return { status: "failed", messages: ["no se pudo eliminar la imagen"] }
        }
    },

    updateProduct: async function (productId, product) {
        try {
            const errors = checkProduct(product)
            if (errors.length > 0) return { status: "failed", messages: errors }
            const productUpdated = await productModel.findByIdAndUpdate({ _id: productId }, { $set: product })
            return { status: "success", messages: ["se actualizo correctamente el producto"] }
        } catch (error) {
            logUtil.logger.warn({ status: "failed", error: error });
            return { status: "failed", messages: ["no se pudo actualizar el producto"] }
        }
    }

}

export default productManager