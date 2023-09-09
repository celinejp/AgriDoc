const mongoose= require('mongoose')

const delivery= mongoose.Schema({

    name : {
        type: String,
        required: true,
    },
    address1:{
        type:String,
        required:true,
    },
    address2:{
        type: String,
        default: "",
    },
    city:{
        type:String,
        required : true,
    },
    pincode:{
        type: Number,
        length: 6,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

})

module.exports=  mongoose.model('delivery',delivery);