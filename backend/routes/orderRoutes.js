const express=require("express");
const Order=require("../models/Order");
const {protect}=require("../middleware/authMiddleware");
const router=express.Router();
//router get /api/orders/my-orders
//desc get logged in users orders
//access private
router.get("/my-orders",protect,async(req,res)=>{
    try{
        //find orders for the authenticated user
        const orders=await Order.find({user:req.user._id}).sort({
            createdAt:-1,
        });//sort bymost recent ordes
        res.json(orders);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
});
//route get/api/orders/:id
//desc get order details by id
//access private
router.get("/:id",protect,async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id).populate(
            "user","name email"
        );
        if(!order){
            return res.status(404).json({message:"order not ofund"});
        }
        //return the full order details
        res.json(order);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server errro"});
    }
})
module.exports=router;