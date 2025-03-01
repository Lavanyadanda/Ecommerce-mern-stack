const  express=require("express");
const Checkout=require("../models/Checkout");
const Cart=require("../models/Cart");
const Product=require("../models/Product");
const Order=require("../models/Order");
const {protect}=require('../middleware/authMiddleware');
const router=express.Router();
//route post/api/checkout
//desc create a new checkout session
//access private

router.post('/',protect,async(req,res)=>{
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body;
    if(!checkoutItems || checkoutItems.length===0){
        return  res. status(400).json({message:"no item in cart"});
    }
    try{
        //create a new checkout session
        const newCheckout=await Checkout.create({
            user:req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"pending",
            isPaid:false,
        });
        console.log(`checkout created for user:${req.user._id}`);
        res.status(201).json(newCheckout);
    }catch(err){
        console.error("error creating checkout session");
        res.status(500).json({message:"Server error"});
    }
});
//route put/api/checout/;id/pay
//desc update checkout to marks as paid after succesfull payment
//access private
router.put("/:id/pay",protect,async(req,res)=>{
    const {paymentStatus,paymentDetails}=req.body;
    
    try{
        const checkout=await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({message:"checkout not found"});
        }
        if(paymentStatus==="paid"){
            checkout.isPaid=true;
            checkout.paymentStatus=paymentStatus;
            checkout.paymentDetails=paymentDetails;
            checkout.paidAt=Date.now();
            await checkout.save();
            res.status(200).json(checkout);
        }else{
            res.status(400).json({message:"inavlid payment status"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
})

//route post/api/checkout/:id/finalize
//desc finalize checkout and convert to an order after payment confirmation
//access privat
router.post("/:id/finalize",protect,async(req,res)=>{
    try{
        const checkout=await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({message:"checkout not found"});
        }
        if(!checkout.isPaid && !checkout.isFinalized){
            //cretae  final order based on the checkout deatls
            const finalOrder=await Order.create({
                user:checkout.user,
                orderItems:checkout.checkoutItems,
                shippingAddress:checkout.shippingAddress,
                paymentMethod:checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid:true,
                paidAt:checkout.paidAt,
                isDelivered:false,
                paymentStatus:'paid',
                paymentDetails:checkout.paymentDetails,
            });
            //mark the checkout as finalized to remove duplicates
            checkout.isFinalized=true;
            checkout.finalizedAt=Date.now();
            await checkout.save();
            //delete the cart associated with the user
            await Cart.findOneAndDelete({user:checkout.user});
            res.status(201).json(finalOrder);

        }else if(checkout.isFinalized){
            res.status(400).json({message:"checkout already finalized"});
        }else{
            res.status(400).json({mesage:"checkou is not paid"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
})
module.exports=router;