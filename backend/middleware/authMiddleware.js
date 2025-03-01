const jwt=require("jsonwebtoken");
const User=require('../models/User');
//add middle ware to protect routes
// const protect=async (req,res,next)=>{
//     let token;
//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//         try{
//             token=req.headers.authorization.split(' ')[1];
//             const decoded=jwt.verify(token,process.env.JWT_SECRET);
//             req.user=await User.findById(decoded.user.id).select("-password")//exclude password
//             next();
//         }
//         catch(err){
//             console.error("token verification failed",err);
//             res.status(401).json({message:"not authorized toke filed"});

//         }
//     }else{
//         res.status(401).json({message:"not authorized ,no token provided"});
//     }
// }

const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Get the token
            console.log("token,",token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
console.log("decoded code",decoded);
            req.user = await User.findById(decoded.user.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "No token, authorization denied" });
    }
};

//middle ware to check if the user is an admin
const admin=(req,res,next)=>{
    if(req.user && req.user.role ==="admin"){
        next();
    }else{
        res.status(403).json({message:"Not authorized"});
    }
}
module.exports={protect,admin};