import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: {type: String, required: true},
        nr: {type: Number, required: true},
        image: { type: String, required: true},
        price: {type: Number, required: true},
        film: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Film', 
            required: true,
        },
        date: {type: Date},
        room: {type: String},
        seat: {type: Number},
    },
],
    shippingAddress: {
        fullName: {type: String, required: true},
        mail: {type: String, required: true},
        city: {type: String, required: true}
    },
    paymentMethod: { type: String, required: true},
    itemsPrice: {type: Number, required: true},
    taxPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: { type: Date},
},
{
    timestamps: true, 
}
);

const Order = mongoose.model('Order', orderSchema);

export default Order;