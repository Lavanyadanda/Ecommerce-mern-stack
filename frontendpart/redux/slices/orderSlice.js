import {createSlice,createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "axios";
//async thunk to fetch  user orders
export const fetchUserOrders=createAsyncThunk('orders/fetchUserOrders',async(_,{rejectWithValue})=>{
    try{
        const token = getState().auth.token; // Assuming auth state holds the token

        const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,{
            headers:{
                //"Authorization": `Bearer ${token}`,
                Authorization:`Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})
//async thun to fetch orders detailed by ID
export const fetchOrderDetails=createAsyncThunk("order/fetchOrderDetails",async(orderId,{rejectWithValue})=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            },
        });
        return response.data;
    }catch(error){
       return rejectWithValue(error.response.data);
    }
})

const orderSlice=createSlice({
    name:"orders",
    initialState:{
        orders:[],
        totalOrders:0,
        orderDetails:null,
        loading:false,
        error:null,

    },
    reducers:{},
    extraReducers:(builder)=>{
        builder//fetch user orders
        .addCase(fetchUserOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
        })
        .addCase(fetchUserOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "failed to fetch orders";
        })
        


        //fetch order details specific order
        .addCase(fetchOrderDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchOrderDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.orderDetails=action.payload;
        })
        .addCase(fetchOrderDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message ||" failed to ferch deatils";
        });


        
    }
})

export default orderSlice.reducer;