const jwt = require ('jsonwebtoken')
require('dotenv').config()

exports.verify= function(req,res,next){
    
    let token= req.header('token');

    if(!token){
        return res.status(401).send({message: 'send token in the headers'})
    }

    let payload;

    try {
        
        payload= jwt.verify(token,process.env.JWT_SECRET);
        
        req.id= payload.id;
        next();

    } catch (error) {
        res.status(401).send({message: 'Token Not valid'})
    }
}

