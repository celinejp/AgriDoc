const mongoose= require('mongoose')

const cart= mongoose.Schema({
    product: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,

    },
    quantity: {
        type: Number,
        required: true,
    },
    buyerEmail: {
        type: String,
        required:true
    }
});

module.exports= mongoose.model('cart',cart)