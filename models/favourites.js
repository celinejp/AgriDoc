const mongoose= require('mongoose')

const favourite=mongoose.Schema({
   
    product_id:{
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'product',
    },
   user_id:{
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
    },
})

module.exports=mongoose.model('favourite',favourite)