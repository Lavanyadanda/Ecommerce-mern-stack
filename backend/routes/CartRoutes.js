// const express=require("express");
// const Cart=require("../models/Cart");
// const Product=require('../models/Product');
// const {protect}=require('../middleware/authMiddleware');
// const router=express.Router();
// //helper function to get a cart by user id or gues id
// const getCart=async(userId,guestId)=>{
// if(userId){
//     return await Cart.findOne({user:userId});

// }
// else if(guestId){
//     return await Cart.findOne({guestId})
// }else{
//     return null;
// }
// }
// //route post/api/cart
// //desc add a product to the cart for a guest or logged in user
// //access public

// router.post('/',async(req,res)=>{
//     const {productId,quantity,size,color,guestId,userId}=req.body;
//     try{
//         const product=await Product.findById(productId);
//         if(!product){
//             return res.status(404).json({message:"Product not found"});}

//             //determine if the user is logged in or not
//             let cart=await getCart(userId,guestId);
//             //if the cart exists,update it
//             if(cart){
//                 const productIndex=cart.products.findIndex(
//                     (p)=>
//                         p.productId.toString()===productId &&
//                     p.size===size &&
//                     p.color===color
//                 );
//                 if(productIndex>-1){
//                     // if the product already exist,update the quantity
//                     cart.products[productIndex].quantity+=quantity;

//                 }else{
//                     //add new cart item
//                     cart.products.push({
//                         productId,
//                         name:product.name,
//                         image:product.images[0].url,
//                         price:product.price,
//                         size,
//                         color,
//                         quantity,
//                     });
//                 }
//                 //recalculate the totla price
//                 cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
//                 await cart.save();
//                 return res.status(200).json(cart);
//             }else{
//                 //create a new cart for the guest or user
//                 const newCart=await Cart.create({
//                     userId:userId?userId:undefined,
//                     guestId:guestId?guestId:"guest_"+new Date().getTime(),
//                     product:[
//                         {productId,
//                             name:product.name,
//                             image:product.images[0].url,
//                             price:product.price,
//                             size,color,quantity,
//                         },
//                     ],
//                     totalPrice:product.price*quantity,
//                 });
//                 return res.status(201).json(newCart);
            
//         }
//         }catch(err){
//             console.error(err);
//             res.status(500).json({message:"server error"});
//     }
// })
// module.exports=router;








const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Helper function to get a cart by user ID or guest ID
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    } else {
        return null;
    }
};

// @route POST /api/cart
// @desc  Add a product to the cart for a guest or logged-in user
// @access Public
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        // Ensure quantity is a valid number
        const qty = Number(quantity) || 1; // Default to 1 if undefined or invalid

        const product = await Product.findById(productId);
        if (!product || !product.price) {
            return res.status(404).json({ message: "Product not found or price missing" });
        }

        // Ensure product.price is a valid number
        const price = Number(product.price);
        if (isNaN(price)) {
            return res.status(400).json({ message: "Invalid product price" });
        }

        let cart = await getCart(userId, guestId);

        if (cart) {
            // Check if product already exists in the cart
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity += qty;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images.length > 0 ? product.images[0].url : "",
                    price: price,
                    size,
                    color,
                    quantity: qty,
                });
            }

            // Recalculate total price safely
            cart.totalPrice = cart.products.reduce((acc, item) => {
                const itemPrice = Number(item.price) || 0;
                const itemQuantity = Number(item.quantity) || 0;
                return acc + itemPrice * itemQuantity;
            }, 0);

            if (isNaN(cart.totalPrice)) {
                return res.status(500).json({ message: "Total price calculation failed" });
            }

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart safely
            const totalPrice = price * qty;
            if (isNaN(totalPrice)) {
                return res.status(500).json({ message: "Total price calculation failed" });
            }

            const newCart = await Cart.create({
                user: userId? userId: undefined,
                guestId: guestId? guestId : `guest_${Date.now()}`,
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images.length > 0 ? product.images[0].url : "",
                        price: price,
                        size,
                        color,
                        quantity: qty,
                    },
                ],
                totalPrice: totalPrice,
            });

            return res.status(201).json(newCart);
        }
    } catch (err) {
        console.error("Error in cart route:", err);
        res.status(500).json({ message: "Server error" });
    }
});





//route put/api/cart
//desc update product quantity in the cart for a guest or logged-in-user
//access public
router.put('/',async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body;
    try{
        let cart=await getCart(userId,guestId);
        if(!cart){
            return res.status(400).json({message:"cart not found"});}
            const productIndex=cart.products.findIndex(
                (p)=>p.productId.toString()=== productId && p.size===size && p.color===color
            );
        if(productIndex>-1){
            //update quantity
            if(quantity>0){
                cart.products[productIndex].quantity=quantity;
            }else{
                cart.products.splice(productIndex,1);//remove product if quantity is 0
               
            }
            cart.totalPrice=cart.products.reduce((acc,item)=> acc+item.price*item.quantity,0);
            await cart.save();
            return res.status(200).json(cart);
        }else{
            return res.status(404).json({message:"product not found in cart"});
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"server error"});
    }
})

//route delete/api/cart
//desc remove a product from the cart
//access public
router.delete('/',async(req,res)=>{
    const {productId,size,color,guestId,userId}=req.body;
    try{
        let cart=await getCart(userId,guestId);
        if(!cart){
            return res.status(404).json({message:"cart not found"});
        }
        const productIndex=cart.products.findIndex(
            (p)=> p.productId.toString()=== productId && p.size===size && p.color===color
        );
        if(productIndex>-1){
            cart.products.splice(productIndex,1);
            cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price * item.quantity,0);
            await cart.save();
            return res.status(200).json(cart);
        }else{
            return res.status(404).json({message:"product not found in cart"});
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"server error"});
    }
})

//route get/api/cart
//desc get logged in users or guest cart
//access publc

router.get('/',async(req,res)=>{
    const {userId,guestId}=req.query;
    try{
        const cart=await getCart(userId,guestId);
        if(cart){
            res.json(cart);
        }else{
            res.status(404).json({message:"cart not found"});
        }

    }catch(err){
        console.error(err);
        res.status(500).send("server error");
    }
})

//route post/api/cart/mergr
//desc merge guest cart into user cart on login
///access private
router.post('/merge',protect,async(req,res)=>{
    const {guestId}=req.body;
    try{
        //findthe guest cart and user cart
        const guestCart=await Cart.findOne({guestId});
        const userCart=await Cart.findOne({user:req.user._id});
        if(guestCart){
            if(guestCart.products.length===0){
                return res.status(400).json({message:"Guest cart is empty"});
            }
            if(userCart){
                //merge guest cart into user cart
                guestCart.products.forEach((guestItem)=>{
                    const productIndex=userCart.products.findIndex((item)=>
                    item.productId.toString()=== guestItem.productId.toString() && item.size===guestItem.size && item.color ===guestItem.color);
                    if(productIndex>-1){
                        //if the items exist in the user cart ,updte the quantity
                        userCart.products[productIndex].quantity+=guestItem.quantity;
                    }else{
                        //otherwise ,add the guest item to the cart
                        userCart.products.push(guestItem);
                    }

                });
                userCart.totalPrice=userCart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
                await userCart.save();
                //remove the guest cart after mergin
                try{
                    await Cart.findOneAndDelete({guestId});

                }catch(err){
                    console.error("error in deleteing guest cart",err);
                }
                res.status(200).json(userCart);
            }else{
                //if the user has no existing cartassign the guest cart to the user
                guestCart.user=req.user._id;
                guestCart.guestId=undefined;
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        }else{
            if(userCart){
                //guest cart has already been merged ,return user cart
                return res.status(200).json(userCart);
            }res.status(404).json({message:"guest cart not found"});
        }

    }
    catch(err){
        console.error(err);
        res.status(500).send("server error");
    }
})


   
module.exports = router;
