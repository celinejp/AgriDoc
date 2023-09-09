const mongoose = require('mongoose')

const model= new mongoose.Schema({
    name: {
        required: true,
        type : String
    },
    email :{
        required : true,
        unique:true,
        type: String
    },
    password : {
        required : true,
        type : String,
    },
    created_on : {
        required : true,
        type : String,
    },
    avatar: {
        type : String,
        default: null,
    },
    referral : {
        type : String,
        default : null,
    },
    orders :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
            default : null, 
        }
    ],
    cart : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            default : null,
        }
    ]
    
});

module.exports= mongoose.model('user',model);