// const  express=require("express");
// const cors=require("cors");
// const dotenv=require("dotenv");
// const connectDB = require("./config/db");
// const userRoutes=require('./routes/UserRoutes');
// const app=express();
// app.use(express.json());
// app.use(cors());
// dotenv.config();
// console.log(process.env.PORT);
// //connect to mongodb :Promise<void>
// connectDB();
// const PORT=process.env.PORT ;
// ///const PORT=9000;//instead of using hardcore value,use it in enviromental value using dotenv module in .env file
// app.get('/',(req,res)=>{
//     res.send("welcome to rabbit api");
// });
// //api routes
// app.use("/api/users",userRoutes);
// app.listen(PORT,()=>{
//     console.log(`server is running on https://localhost:${PORT}`)
// })



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const productRoutes=require('./routes/productRoutes');
const cartRoutes=require('./routes/CartRoutes');
const checkoutRoutes=require('./routes/checkoutRoutes');
const orderRoutes=require('./routes/orderRoutes');
const uploadRoutes=require('./routes/uploadRoutes');
const adminRoute=require('./routes/adminRoute');
const subscribeRoutes=require('./routes/subscribeRoutes');
const productAdminRoutes=require('./routes/productAdminRoutes');
const adminOrderRoutes=require('./routes/adminOrderRoutes');

dotenv.config(); // ✅ Load dotenv first

const app = express();
app.use(express.json());
app.use(cors());

console.log("PORT from .env:", process.env.PORT);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 9000; // ✅ Default to 9000 if .env is missing

app.get("/", (req, res) => {
    res.send("Welcome to Rabbit API");
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/products",productRoutes);
app.use('/api/cart',cartRoutes);
app.use("/api/checkout",checkoutRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use('/api/subscribe',subscribeRoutes);
app.use('/api/admin/users',adminRoute);
app.use('/api/admin/products',productAdminRoutes);
app.use('/api/admin/orders',adminOrderRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
