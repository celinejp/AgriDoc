const { json } = require('express');
const express= require('express')
const user= require('../models/usermodel')
const router= express.Router()
const bcrypt= require('bcrypt')
const {verify}= require('../middleware/jwt_token')
const jwt= require('jsonwebtoken')
require('dotenv').config()


router.get('',(req,res)=> {
    res.send('/api called success');
})

router.get('/get',verify,async (req,res)=> {
    try {
        const data= await user.findById(req.id);
        
        res.status(200).send(data);

    } catch (error) {
        res.status(400).json({message: error.message})
    }
})



router.patch('/patch/:id',async (req,res)=> {
    try {
        const id= req.params.id
        const body= req.body
        const options= {new :true}
        const result=await  user.findByIdAndUpdate(
            id,body,options
        );
        res.status(200).send(result);

    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/register',async (req,res) =>  {
    var salt =await bcrypt.genSaltSync(10);
    req.body.password=await  bcrypt.hash(req.body.password,salt)
    console.log(req.body)
    const data= new user({
        name: req.body.name,
        password : req.body.password,
        email : req.body.email,
        created_on : Date().toString(),

    });

    try {
        var token= jwt.sign({id: data._id},process.env.JWT_SECRET,{
            expiresIn: 86400,
        });
        await data.save();
        
        res.status(200).json({
            message : 'Registration successful',
            token : token
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({message: 'User cannot be created'})
    }
})

router.delete('/delete/:id',verify, async (req,res)=> {
    try {
        const id = req.params.id
        const result= await user.findByIdAndDelete(id) 
        res.json({'message': 'deleted'})
    } catch (error) {
        res.status(400).send('User not deleted')
    }
})

router.post('/login',async(req,res)=> {
    
    user.findOne({email:req.body.email},async(err,user)=> {
        if (user==null) return res.status(401).send(err);
        
        var validpass= await bcrypt.compare(req.body.password,user.password)
        if (validpass){
        var token= jwt.sign({id: user._id},process.env.JWT_SECRET,{
            expiresIn: 86400,
        });
            return res.status(200).send(
                {
                message:'login sucessful',
                token: token,
                user: user
                }
            )
        }
        else{
        return res.status(401).send({message:'invalid credentials'})
        }

    })
})

module.exports = router;

