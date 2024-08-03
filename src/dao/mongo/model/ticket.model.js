import mongoose from 'mongoose'

const ticketCollection = 'facturas'


const ticketSchema = {
    purchase_datetime: {
        type: Date,
        default: Date.now
    }, //Deberá guardar la fecha y hora exacta en la cual se formalizó la compra(básicamente esun created_at)
    ammount: {
        type: Number,
        default: 0,
        required: true
    }, //total de la compra.
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'carritos' }
}

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel


