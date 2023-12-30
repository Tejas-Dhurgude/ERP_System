

const mongoose=require('mongoose')

const orderSchema = mongoose.Schema({
    productName: {
        type: String,
        enum: ['A', 'B', 'C','D'],
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Partially Paid'],

        default: 'Pending',
    },
});

const orderReceived=new mongoose.model("orderReceived",orderSchema)

module.exports=orderReceived