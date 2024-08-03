import ticketModel from "../model/ticket.model.js";
import logUtil from "../../../util/logger.util.js";
import cartModel from "../model/cart.model.js";
import mongoose from "mongoose";


const ticketManager = {

    getTickets: async function () {
        try {
            const tickets = await ticketModel.find()
            return { status: "success", tickets: tickets }
        } catch (error) {
            logUtil.logger.warn(error);
            return { status: "failed", messages: ["no se pudo obtener los tickets"] }
        }
    },
    createTicket: async function (cart) {

        // return { status: "failed", messages: ["no puedo encontrar el problema"] }

        try {
            logUtil.logger.error("ete cart feo: " + JSON.stringify(cart.id))

            const total = cart.products.reduce((acc, elem) => {
                return acc + (elem.ammount * elem.price)
            }, 0)

            const newTicket = {
                cartId: cart.id,
                ammount: total
            }
            const ticket = await ticketModel.create(newTicket)
            return { status: "success", ticket: { id: ticket._id, ammount: ticket.ammount, purchase_datetime: ticket.purchase_datetime } }

        } catch (error) {
            logUtil.logger.error({ error: error });
            return { status: "failed", messages: ["no se pudo realizar la compra"] }
        }
    }
}


export default ticketManager 