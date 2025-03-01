const express=require("express");
const Product=require("../models/Product");
const {protect,admin} =require("../middleware/authMiddleware");
const router=express.Router();
//@route post?api/products
//@description create a new product
//@access Private/Admin
router.post("/", protect,admin ,async (req, res) => {
    try{
        const {name,description,price,discountPrice,countInStock,category,brand, sizes,colors,collections,material,gender,images,isFeatured,isPublished,tags,dimensions, weight,sku}=req.body;
        const product=new Product({name,
            description,price,discountPrice,
            countInStock,category,brand, 
            sizes,colors,collections,material
            ,gender,images,isFeatured,
            isPublished,tags,dimensions,
             weight,sku,user:req.user._id//user id is reference to the admin user who created it

        });
        const createdProduct=await product.save();
        res.status(201),json(createdProduct);
    }catch(err){
        console.error("error",err);
        res.status(500).send("server error");
    }
});




//@route put/api/products/:id
//@desc updating an existing product id
//@access by private/admin
router.put("/:id",protect,admin,async(req,res)=>{
    try{

   const {name,description,price,discountPrice,countInStock,category,brand, sizes,colors,collections,material,gender,images,isFeatured,isPublished,tags,dimensions, weight,sku}=req.body;
   //find product by id
   const product=await Product.findById(req.params.id);
   if(product){
    //update prodcut details
    // product.name=name||product.name;
    // product.description=description||product.description;
    // product.price=price||product.price;
    // product.discountPrice=discountPrice||product.discountPrice;
    // product.countInStock=countInStock||product.countInStock
    // product.category=category||product.category;
    // product.brand=brand||product.brand;
    // product.sizes=sizes||product.sizes;
    // product.colors=colors||product.colors;
    // product.collections=collections||product.collections;
    // product.material=material||product.material;
    // product.gender=gender||product.gender;
    // product.images=images||product.images;
    // product.isFeatured=isFeatured !== undefined ? isFeatured :product.isFeatured;
    // product.isPublished=isPublished!==undefined?isPublished :product.isPublished;
    // product.dimensions=dimensions||product.dimensions;
    // product.weight=weight||product.weight;
    // product.sku=sku||product.sku;
    product.name = name !== undefined ? name : product.name;
    product.description = description !== undefined ? description : product.description;
    product.price = price !== undefined ? price : product.price;
    product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.category = category !== undefined ? category : product.category;
    product.brand = brand !== undefined ? brand : product.brand;
    product.sizes = sizes !== undefined ? sizes : product.sizes;
    product.colors = colors !== undefined ? colors : product.colors;
    product.collections = collections !== undefined ? collections : product.collections;
    product.material = material !== undefined ? material : product.material;
    product.gender = gender !== undefined ? gender : product.gender;
    product.images = images !== undefined ? images : product.images;
    product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
    product.dimensions = dimensions !== undefined ? dimensions : product.dimensions;
    product.weight = weight !== undefined ? weight : product.weight;
    product.sku = sku !== undefined ? sku : product.sku;


//save the updated product in db
const updatedProduct=await product.save();
res.json(updatedProduct);

   }else{
    res.status(404).json({message:"Product not found"});
   }

    }catch(err){
console.error(err);
res.status(500).send("server not working")
    }
});

//@route delete /api/products/:id
//desc delte a product by id
//access to private/admin
router.delete(":/id",protect,admin,async(req,res)=>{
    try{
        //find product by id
        const product=await Product.findById(req.params.id);
        if(product){
            //remove the product
            await product.deleteOne();
            res.json({message:" product removed"});
        }else{
            res.status(404).json({messgae:"product nt ound"});
        }
    }catch(err){
        console.error(err);
        res.status(500).send("Server is not working");
    }
})
//@route get/api/products
//desc get all products with optional query filters
//access public

router.get("/", async (req, res) => {
    try {
        const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query;

        let query = {};
        let sort = {}; // Define sort object

        // Filtering logic
        if (collection && collection.toLowerCase() !== "all") {
            query.collections = collection;
        }

        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }

        if (material) {
            query.material = { $in: material.split(",") };
        }

        if (brand) {
            query.brand = { $in: brand.split(",") };
        }

        if (size) {
            query.sizes = { $in: size.split(",") }; // Fix: match field name with DB schema
        }

        if (color) {
            query.colors = { $in: color.split(",") }; // Fix: Ensure `color` is an array
        }

        if (gender) {
            query.gender = gender;
        }

        if (minPrice || maxPrice) {
            query.price = {
                ...(minPrice && { $gte: Number(minPrice) }),
                ...(maxPrice && { $lte: Number(maxPrice) })
            };
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        // Sorting logic
       
        switch (sortBy) {
            case "priceAsc":
                sort = { price: 1 };
                break;
            case "priceDesc":
                sort = { price: -1 };
                break;
            case "popularity":
                sort = { rating: -1 };
                break;
            default:
                sort = {};
        }

        // Fetch products and apply sorting & limit
        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
        
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server problem");
    }
});
//best seller out ,it is place before single product cide
//@route get/api/products/nest-seller
//desc retrieve the product with highest rating
//access public
router.get("/best-seller",async (req,res)=>{
    try{
        const bestSeller=await Product.findOne().sort({rating:-1});
        if(bestSeller){
            res.json(bestSeller);
                }
                else{
                    res.status(404).json({message:"no best seller"});
                }
    }catch(err){
        console.error(err);
        res.status(500).send("server error");
    }
})






//new arrivals
//@route get/api/products/new-arrivals
//desc retrieve latest  8 products-creation data
//@access public
router.get("/new-arrivals",async(req,res)=>{
    try{
        //fetch latest 8 products
        const newArrivals=await Product.find().sort({createdAt:-1}).limit(8);
        res.json(newArrivals);
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
})




//route grt/api/products/:id
//desc get a single product
//access pulbic
router.get("/:id",async(req,res)=>{
try{
    const product=await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404).json({message:"product not found"});
    }
}catch(err){
    console.error(error.message);
    res.status(500).send(" server error");
}
});




//rote get/api/products/similar/id
//desc retrieve similsr products basd on the currenr prodicts gender and category
//access public
router.get("/similar/:id",async(req,res)=>{
    const {id}=req.params;
    console.log(id);//to check whether it is present or not in route
    try{
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"not found produtc"});
        }
        const similarProducts=await Product.find({
            _id:{$ne:id},//exclude the current id
            gender:product.gender,
            category:product.category,
        }).limit(4);
        res.json(similarProducts);
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
})


module.exports=router;








//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiZjBkNWQzMDg5Nzg4OTcwNzM0ZmVkIiwicm9sZSI6ImN1c3RvbWVyIn0sImlhdCI6MTc0MDU3NDA0NSwiZXhwIjoxNzQwNzE4MDQ1fQ.gP7vJLGbyKGAen5Nl51PsKtgpHcAY-kFHEx6WpX-qss"