const cloudinary=require('cloudinary');
const router=require('express').Router();
require('dotenv').config();


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


router.delete('/:public_id',(req,res)=>{
    const {public_id}=req.params;
    try{
        console.log(public_id);
        cloudinary.uploader.destroy(public_id);
        console.log("Reach2");
        res.status(200).send();
    } catch(e){
        console.log("REacg");
        res.status(400).send(e.message);
    }
})

module.exports=router;