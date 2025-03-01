// import React from 'react'
// import { BrowserRouter,Route,Routes } from 'react-router-dom'
// import UserLayout from './components/layout/UserLayout'
// import {Toaster} from 'sonner';

// import Home from './pages/Home'

// const App = () => {
//   return (
//    <Toaster position='top-right'/>
//     <Routes>
//         <Route path='/' element={<UserLayout/>}>
//         {/* user layout acts as a common layout lie homecart,products components etc*/}
//           <Route index element={<Home/>}/>
          
//         </Route>
//         <Route>{/* admin layout*/}</Route>
//     </Routes>
   
//   )
// }

// export default App

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/products/ProductDetails";
import CheckOut from "./components/cart/CheckOut";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/admin/UserManagement";
import ProductManagement from "./components/admin/ProductManagement";
import EditProductPage from "./components/admin/EditProductPage";
import OrderManagement from "./components/admin/OrderManagement";
import {Provider} from "react-redux";
import store from 'C:/Users/Aparna/Documents/ECommerce/frontendpart/redux/store.js'
import ProtectedRoute from "./components/common/ProtectedRoute";
const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* User layout acts as a common layout for Home, Cart, Products, etc. */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register/>} />
          <Route path="profile" element={<Profile/>} />
          {/* <Route path="collections/:collection" element={<CollectionPage/>} /> */}
           <Route path="collections/:collection" element={<CollectionPage/>} />
           <Route path="product/:id" element={<ProductDetails/>} />
           <Route path="checkout" element={<CheckOut/>} />
           <Route path="order-confirmation" element={<OrderConfirmationPage/>} />
           <Route path="order/:id" element={<OrderDetailsPage/>} />
           <Route path="my-orders" element={<MyOrdersPage/>} />
        </Route>

        {/* Future Admin Layout (if needed) */}
        {/* <Route path="/admin" element={<AdminLayout />}> */}
        <Route path='/admin' element={ <ProtectedRoute  role="admin"> <AdminLayout/>  </ProtectedRoute>}>
        <Route index element={<AdminHomePage/>}/>
        <Route path='users' element={<UserManagement/>}/>
        <Route path='products' element={<ProductManagement/>}/>
        <Route path='products/:id/edit' element={<EditProductPage/>}/>
        <Route path='orders' element={<OrderManagement/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
