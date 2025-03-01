const express=require("express");
const router=express.Router();
const Subscriber=require("../models/Subscriber");
//route post /api/subscribe
//desc handle newsletter subscription
//access public
router.post("/subscribe",async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).json({message:"email is requires"});

    }
    try{
        //check if the email is already subscription
        let subscriber=await Subscriber.findOne({email});
        if(subscriber){
            return res.status(400).json({message:"email is already subscribed"});
        }
        //create a new subscriber
        subscriber=new Subscriber({email});
        await subscriber.save();
        res.status(201).json({message:"succesfully subscribed to news letter"});

    }catch(error){
        console.error(error);
        res.status(500).json({message:"server eror"});

    }
})
module.exports=router;