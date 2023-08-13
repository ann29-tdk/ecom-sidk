require('dotenv').config();

const mongoose=require('mongoose');

// const connectionStr="mongodb+srv://deploy:deploy@cluster0.l27jlvp.mongodb.net/ecommerce";


mongoose.connect("mongodb+srv://anuragkumarthakur:anurag29@cluster0.oo3kmna.mongodb.net/ecom",{useNewUrlParser:true}).then(()=>console.log('connected to mongo db')).catch(err=>console.log(err))


mongoose.connection.on('error',err=>{
    console.log(err);
})



// Sidk@ndw@l091
