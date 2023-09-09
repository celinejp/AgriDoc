require ('dotenv').config()

const mongo_url= process.env.DATABASE_URL;
const mongoose= require('mongoose')
const express= require('express')
const auth_routes= require('./routes/Authcontroller')
const category_routes= require('./routes/category')
const product_routes= require('./routes/product')
const order_routes= require('./routes/orders')
const fav_routes= require('./routes/favourite')
const cart = require('./routes/cart')
const {router}= require('./routes/multer');
const delivery_router= require('./routes/delivery')
const predict= require('./routes/predict')

const app= express()
app.use(express.json())
app.use('/user',auth_routes);
app.use('/category',category_routes)
app.use('/product',product_routes)
app.use('/order',order_routes)
app.use('/f',fav_routes)
app.use('/cart',cart)
app.use('/api',router)
app.use('/delivery',delivery_router)
app.use('/predict',predict)

app.get('',(req,res)=> {
    res.send("Welcome to agridoc")
})

console.log(mongo_url);
mongoose.connect(mongo_url)
const database= mongoose.connection;

database.on('error',(error)=> {
    console.log(error)
})

database.once('connected',(connected)=> {
    console.log('Database Connected');
})


app.listen(process.env.PORT ||3000,()=> {
    console.log('Server running at 3000');
})
