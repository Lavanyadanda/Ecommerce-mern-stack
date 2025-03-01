// const express=require("express");
// const User=require('../models/User');
// const jwt=require('jsonwebtoken');
// const router=express.Router();
// //@route POST/api/users/register
// //@desc Register a new user
// //access Public
// router.post("/register", async (req,res)=>{
//     const {name,email,password}=req.body;

//     try{
//         //registration logic
//         res.send({name,email,password});
//     }catch(err){
//         console.log(err);
//         res.status(500).send("server error");
//     }

// });
// module.exports=router;


const express = require("express");
const User = require("../models/User"); // ✅ Correct path
const {protect}=require('../middleware/authMiddleware');
const jwt = require("jsonwebtoken");
const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Registration logic (for now just returning data)
     //   res.send({ name, email, password });
     let user=await User.findOne({email});
     if(user) return res.status(400).json({message:"user already exits"});
     user=new User({name,email,password});
     await user.save();
        // res.status(201).json({
        //     user:{
        //         _id:user._id,
        //         name:user.name,
        //         email:user.email,
        //         role:user.role,
        //     }
        // })it is working means displaying in mobgodb ,corectly stroing in db . need to send dat awith webtoken
 //create JWT payload
 const payLoad={user:{id:user._id,role:user.role, }}

//sign and return the token along with data
jwt.sign(payLoad,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
    if(err) throw err;
    //send the user and token in response
    res.status(201).json({
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        },token, 
    })

});//geerate token to sign in with secret key 

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

//route for login POST/api/users/login
//@description authenticate user
//@access public
// router.post("/login",async(req,res)=>{
//     const { email, password } = req.body; // ✅ Extract email & password from request body
// let user = await User.findOne({ email });

//     try{
//         //find the user by email
//         let user=await User.findOne({email});
//         if(!user) return res.status(400).json({message:"Invalid crendials"});
//         const isMatch=await user.matchPassword(password);
//         if(!isMatch) return res.status(400).json({message:"Invalid credeential"});
        
//  const payLoad={user:{id:user._id,role:user.role, }}
//         //sign and return the token along with data
// jwt.sign(payLoad,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
//     if(err) throw err;
//     //send the user and token in response
//     res.json({
//         user:{
//             _id:user._id,
//             name:user.name,
//             email:user.email,
//             role:user.role,
//         },token, 
//     });

// });//geerate token to sign in with secret key 

   
        
//  }
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Ensure `matchPassword` is correctly defined in User model
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Create JWT payload
        const payload = { user: { id: user._id, role: user.role } };

        // Sign and return the token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        });

    } 
    catch(err){
        console.log(err);
        res.status(500).send("Server erro");
    }
});

//@route get/api/users/profile
//desc get logged-in users profle {protected route}
//access will be private
router.get('/profile', protect,async(req,res)=>{
    res.json(req.user);
})
module.exports = router;
