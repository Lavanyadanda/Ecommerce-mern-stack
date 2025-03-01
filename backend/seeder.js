const mongoose=require("mongoose");
const dotenv=require("dotenv");
const Product=require("./models/Product");
const User=require("./models/User");
const products=require("./data/products");
const Cart=require('./models/Cart');
dotenv.config();
//connect to mongodb
// mongoose.connect(process.env.MONGO_URI);
// //function to seed data
// const seedData=async ()=>{
//     try{
//         //cleare existing data
//         await Product.deleteMany();
//         await User.deleteMany();
//         //create a defult admin user

// const createdUser=await User.create({
//     name:"Admin User",
//     email:"admin@example.com",
//     password:"123456",
//     role:"admin",
// }) ;
// //assign the default user id to each produc
// const userId=createdUser._id;
// const sampleProducts=products.map((product)=>{
//     return{...product,user:userId};
// });
// //insert product into the databse
// await Product.insertMany(sampleProducts);
// console.log("product data seeded successfullt");
// process.exit()
// }catch(err){
//     console.error("error seeding the data",err);
//     process.exit();
// }
// }
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
});

// Function to seed data
const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // Create a default admin user
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin",
        });

        // Assign the default user ID to each product
        const userId = createdUser._id;
        const sampleProducts = products.map((product) => ({
            ...product,
            user: userId,
        }));

        // Insert products into the database
        await Product.insertMany(sampleProducts);

        console.log("✅ Product data seeded successfully");
        process.exit(0); // Success exit
    } catch (err) {
        console.error("❌ Error seeding the data:", err);
        process.exit(1); // Error exit
    }
};

// Call the function
seedData();