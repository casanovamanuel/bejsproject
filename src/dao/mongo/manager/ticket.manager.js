import ticketModel from "../model/ticket.model.js";
import logUtil from "../../../util/logger.util.js";

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
        try {
            const newTicket = {
                //purchaser: cart.userId,
                amount: cart.total,
                cart: cart._id
            }

            const ticket = await ticketModel.create(newTicket)
            return { status: "success", ticket: ticket }
        } catch (error) {
            logUtil.logger.warn(error);
            return { status: "failed", messages: ["no se pudo realizar la compra"] }
        }
    }
}


export default ticketManager