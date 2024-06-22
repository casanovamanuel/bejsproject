import cartModel from "../model/cart.model.js";
import productModel from "../model/product.model.js";

const cartManager = {

    getUserCart: async function (userId) {
        try {
            let cart = await cartModel.findOne({ userId: userId, status: "pending" })

            if (cart) {
                const foundCart = { userId: cart.userId, products: cart.products, status: cart.status }
                return { status: "success", cart: foundCart }
            } else {
                const newCart = await cartModel.create({ userId: userId, products: [] })
                const foundCart = { userId: newCart.userId, products: newCart.products, status: newCart.status }
                return { status: "success", cart: foundCart }
            }
        } catch (error) {
            console.log(error);
            return { status: "failed", messages: ["no se pudo obtener el carrito"] }
        }
    },
    addProduct: async function (user, productId, ammount) {

        try {

            const response = await this.getUserCart(user.id)
            if (response.status === "failed") {
                console.log(response.error);
                return { status: "failed", messages: ["no se pudo obtener el carrito"] }
            }
            const cart = response.cart
            const product = await productModel.findById(productId)
            if (!product) return { status: "failed", messages: ["el producto no existe"] }
            let existed = false
            let finalAmmount = parseInt(ammount)
            cart.products.forEach((elem) => {
                if (elem.productId == productId) {
                    elem.ammount += parseInt(ammount)
                    finalAmmount = elem.ammount
                    existed = true
                    elem.price = product.price // si esto es fix raro
                }
            })
            if (!existed) { cart.products.push({ productId: product._id, price: product.price, ammount: ammount }) }
            if (finalAmmount > product.stock) return { status: "failed", messages: ["no hay suficiente stock"] }
            await cartModel.updateOne({ _id: cart.id }, { $set: { products: cart.products } });
            return { status: "success", cart: cart }
        } catch (error) {
            console.log(error);
            return { status: "failed", messages: ["no se pudo agregar el producto"] }
        }
    },
    removeProduct: async function (userId, productId) {
        console.log("removeProduct", userId, productId)

        try {

            const response = await this.getUserCart(userId)
            if (response.status === "failed") return response
            const cart = response.cart
            cart.products = cart.products.filter((elem) => {
                return elem.productId.toString() != productId
            })
            await cartModel.updateOne({ _id: cart.id }, { $set: { products: cart.products } })
            return { status: "success", cart: cart }
        } catch (error) {
            console.log(error);
            return { status: "failed", messages: ["no se pudo remover el producto"] }
        }
    },
    checkoutCart: async function (cartId) {
        try {
            const cart = await cartModel.findById(cartId)
            let isPurchasable = true
            cart.products.forEach(async (elem) => {
                const product = await productModel.findById(elem.productId)
                if (product.stock < elem.ammount) {
                    isPurchasable = false
                }
            })
            if (!isPurchasable) {
                return { status: "failed", messages: ["las cantidades son mayores a las existentes"] }
            }
            cart.status = "approved"
            cart.products.forEach(async (elem) => {
                productModel.updateOne({ _id: elem.productId }, { $inc: { quantity: -elem.ammount, "stock": 1 } })
            })
            await cartModel.updateOne({ _id: cartId }, { $set: { status: cart.status } })
            const value = cart.products.reduce((acc, elem) => acc + (elem.price * elem.ammount), 0)

            return { status: "success", cart: cart, value: value }

        } catch (error) {
            console.log(error);
            return { status: "failed", messages: ["no se pudo realizar la compra"] }
        }
    }

}



export default cartManager