const express=require("express");
const User=require("../models/User");
const {protect, admin}=require('../middleware/authMiddleware');
const router=express.Router();
//route get/api/admin/users
//desc get all users {admin only}
//aces privste /admin
router.get('/',protect,admin,async(req,res)=>{
    try{

        const users=await User.find({});
        res.json(users);
        }catch(err){
            console.error(err);
            res.status(500).json({message:"server eeorr"});

    }
})
//routes post/api/admin/users
//desc add a new user{admin only}
//access private an admin
router.post("/",protect,admin,async(req,res) =>{
    const {name,email,password,role}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"user already exists"});
        }
        user=new User({
            name,email,password,role:role|| "customer",

        });
        await user.save();
        res.status(201).json({message:"User created succeessully",user});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
})

//route put/api/admin/users/:id
//desc update user info(admin only) like name,emial.role
//access private/admin
router.put('/:id',protect,admin,async(req,res)=>{
    try{
const user=await User.findById(req.params.id);
if(user){
    user.name=req.body.name ||user.name;
    user.email=req.body.email ||user.email;
    user.role=req.body.role ||user.role;
}
const updatedUser=await user.save();
res.json({message:"user updates succesfully",user:updatedUser});
    }catch(err){
console.error(err);
res.status(500).json({message:"server error"});
    }
})

//route delete/api/admin/users/:id
//delete a user
//acess privte admin
router.delete("/:id",protect,admin,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(user){
            await user.deleteOne();
            res.json({message:"user deleted succesfully"});
        }else{
            res.status(404).json({message:"user not found"});
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }
})

module.exports=router;