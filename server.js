const express=require('express');
const cors=require('cors');
const app=express();
const http=require('http');
require('dotenv').config();
const server=http.createServer(app);
const stripe=require('stripe')('sk_test_51N5OJrSCMJ09MRJvDROo8S4g0xIXlsGkwlHarvtRgGoGDx45kz0iDZJQaz36oyuo3gtOPdg3HqGkZ16Imqc0A8Mb00p0OlWEjU');
// const {Server}=require('socket.io');
require('./connection');

const path=require("path");

const User=require('./models/User');
const userRoutes=require('./routes/userRoutes');
const productRoutes=require('./routes/productRoutes');
const imageRoutes=require('./routes/imageRoutes');
const orderRoutes=require('./routes/orderRoutes');

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/users',userRoutes);
app.use('/products',productRoutes);
app.use('/images',imageRoutes);
app.use('/orders',orderRoutes);


app.post('/create-payment',async(req,res)=>{
    const {amount}=req.body;
    console.log(req.body);
    console.log(amount);
    console.log(typeof(amount));
    try{
        const paymentIntent=await stripe.paymentIntents.create({
            shipping: {
                name: 'Jenny Rosen',
                address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
                },
            },
            amount,currency:'usd',description:'Software development services',automatic_payment_methods: {enabled: true},});
        console.log("Hk00");
        res.status(200).json(paymentIntent);
       
    }
    catch(e){
        res.status(400).json(e.message);
    }
})

server.listen(3000,()=>{
    console.log(`Server is runing at port`,3000)
})



app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",function(_,res){
  res.sendFile(
    path.join(__dirname,"./client/build/index.html"),
    function(err){
      res.status(500).send(err);
        }
        );
});