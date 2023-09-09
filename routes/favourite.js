const express = require('express')
var router = express.Router();
const favourite= require('../models/favourites')
const { verify } = require('../middleware/jwt_token');
const { response } = require('express');

router.use(verify)

router.post('/fav',async (req,res)=> {
    try {

        
        var fav= new favourite({
            product_id : Object(req.body.pid),
            user_id: Object(req.id),
        })
    
        var result=await fav.save();
        return res.send({
            "data": result,
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/get',async (req,res)=> {
    try {
       
    
        var result=await favourite.find({user_id: req.id}).populate('product_id');
        return res.send({
            result
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/delete',async (req,res)=> {
    try {
        
        var result=await favourite.deleteMany({$and : [{product_id:  req.body.pid},{user_id:  req.id}]});
        return res.send({
            "data": result,
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports= router;

