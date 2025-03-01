const express=require("express");
const Product=require("../models/Product");
const {protect,admin}=require("../middleware/authMiddleware");
//route get/api/admin/products

//get all products {admin only}
//access private/admin
const router=express.Router();
router.get("/",protect,admin,async(req,res)=>{
    try{
        const products = await Product.find({}) ;
        res.json(products);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});

    }
})
module.exports=router;
