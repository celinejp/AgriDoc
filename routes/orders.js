const express = require('express')

var router = express.Router();
const { verify } = require('../middleware/jwt_token');
const { response } = require('express');
const { validate } = require('../models/usermodel');
const product = require('../models/product');
const order= require('../models/orders');
const { reset } = require('nodemon');
const {deliveryDetails} = require('../controllers/checkout')



// router.use(verify)

router.get('/get',async (req,res)=> {
    try {
        var data = await order.find({buyerPhone: req.body.email}).populate({path: 'product',populate:{
            path: 'category',
        }})

    res.status(200).send(data)
    } catch (error) {
        res.status(500).send({message: 'Error!'})
    }
})

router.post('/add',async(req,res)=> {
    try {
        var prod=await product.findById(req.body.product)
        if(!prod){
            return res.status(400).send({message: 'Product cannot be purchased!'})
            
        }
        var data=new order({
            product: prod._id,
            quantity: req.body.quantity,
            buyerPhone: req.body.phone,
        })

        await data.save();

        res.status(200).send({message: "Order placed Successfully!"});

    } catch (error) {
        res.status(500).send({message: 'Something went wrong'})
    }
})

router.post('/orders/delivery/details', async (req,res)=> {

    try {

        await deliveryDetails(req)
        return res.send({message: "Delivery details saved"})

        
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: "Something went wrong"})

    }
})

module.exports= router