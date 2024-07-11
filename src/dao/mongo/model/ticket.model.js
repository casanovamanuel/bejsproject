import mongoose from 'mongoose'

const ticketCollection = 'facturas'


const ticketSchema = {
    purchase_datetime: {
        type: Date,
        default: Date.now
    }, //Deberá guardar la fecha y hora exacta en la cual se formalizó la compra(básicamente esun created_at)
    amount: Number, //total de la compra.
    cart: { type: mongoose.Schema.Types.UUID, ref: 'carritos' }
}

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel


