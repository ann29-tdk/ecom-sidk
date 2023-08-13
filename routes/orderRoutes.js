const router=require('express').Router();
const Order=require("../models/Order");
const User=require('../models/User');





// creating an order
router.post('/',async(req,res)=>{
    // const io=req.app.get('socketio');
    const {userId,cart,country,address}=req.body;
    try{
        const user=await User.findById(userId);
        const orderCount=cart.count;
        const orderTotal=cart.total;
        const order=await Order.create({owner:user._id,products:cart,country,address});
        order.count=cart.count;
        order.total=cart.total;
        await order.save();
        user.cart={total:0,count:0};
        user.orders.push(order);
        // io.sockets.emit('ordercreated');
        // const notification={status:'unread',message:`New order from ${user.name}`,time:new Date()};
        // io.sockets.emit('new-order',notification);
        user.markModified('orders');
        await user.save();
        res.status(200).json(user);
    }
    catch(e){
        res.status(400).json(e.message);
    }
})


//getting all orders
router.get('/',async(req,res)=>{
    try{
        const orders=await Order.find().populate('owner',['email','name']);
        res.status(200).json(orders);
    }catch(e){
        res.status(400).json(e.message);
    }
})

//shipping order
router.patch("/:id/mark-shipped",async(req,res)=>{
    const {ownerId}=req.body;
    const {id}=req.params;
    try{
        const user=await User.findById(ownerId);
        await Order.findByIdAndUpdate(id,{status:'shipped'});
        const orders=await Order.find().populate('owner',['email','name']); //Order.find(): This is a query to find all documents in the "Order" collection. It returns a query object that can be further modified or executed.
//.populate('owner', ['email', 'name']): This is a method chaining on the query object. The populate() function is used to populate referenced fields from another collection, based on the specified path. In this case, it populates the "owner" field with the "email" and "name" fields from the referenced collection.

        // const notification={status:'unread',message:`Order ${id} shipped with success`,time:new Date()};
        // io.sockets.emit('notification',notification,ownerId);
        // user.notifications.push(notification);
        await user.save();
        res.status(200).json(orders);
    }
    catch(e){
        res.status(400).json(e.message);
    }
})





module.exports=router;