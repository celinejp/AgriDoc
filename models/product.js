const mongoose= require('mongoose')

const product= mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique:true,
    },
    description:{
        required: true,
        type: String
    },
    category:{
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'category',
    },
    price: {
        required: true,
        type: Number,
    },
    quantity:{
        required: true,
        type: Number
    },
    reviews:[
        {

        username: {
            required: true,
            type: String,
        },
        rating : {
            required : true,
            type: String,
        },
        description: {
            required: true,
            type: String,
        },
        
    }],
    images: [{
        type: String,

    }]

});
module.exports= mongoose.model('product',product);