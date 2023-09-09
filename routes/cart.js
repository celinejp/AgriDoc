const express = require('express')
var router = express.Router();
const { verify } = require('../middleware/jwt_token');
const product = require('../models/product');
const cart= require('../models/cart')
const order= require('../models/orders')

router.use(verify)

router.post('/add',async(req,res)=> {
    try {
        var prod= await product.findById(req.body.product)
        if(prod==undefined){
            return res.status(400).send({message :'product not found'})
        }
        var data;
        try {
            
        data= await cart.findOneAndUpdate( {
            _id: req.id,
            product: req.body.product,
          },
          {
            $inc: {
              quantity: req.body.quantity,
            },
          },
          {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
          });
        
        } catch (error) {
            console.log(error)
             
          
        }
       
        

        if(data==undefined){
            return res.status(400).send({message: 'Product cannot be added'})
        }

        

    } catch (error) {
        console.log(error)
        return res.send({message: 'Error Occured!'})
    }
    return res.send({messsage: data})
})

router.post('/get',async(req,res)=> {

    try {
        console.log("here")
        var data=await cart.find({_id: req.id}).populate({path: "product", select: "-quantity",populate:{
            path: 'category',
        }});

        return res.send({message:data})

    } catch (error) {
        return res.send({message: error})
    }
})

router.delete('/delete',async(req,res)=> {
    try {

         cart.deleteOne({_id: req.body.cart_id},async(err,result)=>{
            if(err){
               throw err
            }
            else
            var data=await cart.find({buyerEmail: req.user.userEmail}).populate({path: "product", select: "-quantity"});

            return res.send({message:data})
        })

        
    } catch (error) {
        return res.send({message: error})
    }
})

router.post('/checkout', async (req,res)=> {
    try {
        var items=[];
        for (var i=0;i<req.body.product.length;i++){
            let item= new order({
                product: req.body.product[i],
                quantity: req.body.quantity[i],
                buyerEmail: req.user.userEmail
            })
            cart.deleteOne({product: req.body.product[i]},(err,result)=>{
                if(err){
                   throw err
                }
            })
            items.push(item)
        }

         const saved=await  order.insertMany(items);

         return res.send({message: saved})


    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Error Occured!"})
    }
})

module.exports= router;