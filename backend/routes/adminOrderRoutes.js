const express=require("express");
const Order=require('../models/Order');
const {protect,admin}=require('../middleware/authMiddleware');
const router=express.Router();
//rote get/api/admin/orders
//get all ordders
//access private/admin
router.get('/',protect,admin,async(req,res)=>{
    try{
        const orders=await Order.find({}).populate("user","name email");
        res.json(orders);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
})

//route put/api/admin/orders/:id
//desc update order status
//access Private /admin
router.put("/:id",protect,admin,async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id).populate("user","name");
        if(order){
            order.status=req.body.status || order.status;
            order.isDelivered=req.body.status ==="Delivered" ?true:order.isDelivered;
            order.deliverdAt=req.body.status==='Delivered'?Date.now():order.deliveredAt;
            const updatedOrder=await order.save();
            res.json(updatedOrder);
        }else{
            res.status(404).json({message:"order not found"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
})

//route delte /api/admin/orders/:id
//desc delete an order
//access private/admin
router.delete("/:id",protect,admin,async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({message:"order removed"});
        }else{
            res.status(404).json({message:"order not found"});

        }
    }catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
})
module.exports=router;