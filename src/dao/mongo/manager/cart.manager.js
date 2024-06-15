import cartModel from "../model/cart.model.js";
import productModel from "../model/product.model.js";

const cartManager = {

    getCart: async function (cartId) {
        try {
            const cart = await cartModel.findById(cartId)
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }

    },
    getUserCart: async function (searchedUserId) {
        try {
            const cart = await cartModel.findBy({ userId: searchedUserId, status: "pending" })
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }

    },
    createCart: async function (cart) {
        try {
            const actualCart = await cartModel.findBy({ userId: cart.userId, status: "pending" })
            if (actualCart) {
                cart = actualCart
            } else {
                await cartModel.create(cart)
            }
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    addProduct: async function (cartId, productId, ammount) {
        try {
            const cart = await cartModel.findById(cartId)
            const product = await productModel.findById(cartId)
            cart.products.push({ productId: product._id, price: product.price, ammount: ammount })
            cart.save()

            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    removeProduct: async function (cartId, productId) {
        try {
            const cart = await cartModel.findById(cartId)
            const product = await productModel.findById(cartId)
            cart.products = cart.products.filter((elem) => { elem.productId != productId })
            cart.save()
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    checkoutCart: async function (cartId) {//// este va a ser el dolor de cabeza
        try {
            const cart = await cartModel.findById(cartId)

            cart.save()
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}



export default cartManager