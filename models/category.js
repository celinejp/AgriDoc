const mongoose= require('mongoose')

const category=mongoose.Schema({
    name: {
        required: true,
       
        type: String,
    },
    description: {
        required: true,
        type: String,

    },
    avatar:{
        
        type: String,
        default: null,
    },
})

module.exports=mongoose.model('category',category)