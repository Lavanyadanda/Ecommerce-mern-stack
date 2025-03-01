import {createSlice,createAsyncThunk, isRejectedWithValue, __DO_NOT_USE__ActionTypes} from "@reduxjs/toolkit";
import axios from "axios";
const API_URL=`${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN=`Bearer ${localStorage.getItem("userToken")}`;
//async thunk to fetch  admin products
//fetch allorder
export const fetchAllOrders=createAsyncThunk("adminOrder/fetchAllOrders",async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get(
            `API_URL/api/admin/orders`,
            {
                headers:{
                    Authorization:USER_TOKEN,

                    
                }
            }
        );
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }

}
)










//update order delivery status

export const updateOrderStatus=createAsyncThunk("adminOrder/updateOrderStatus",async({id,status},{rejectWithValue})=>{
    try{
        const response=await axios.put(
            `API_URL/api/admin/orders/${id}`,{status},
            {
                headers:{
                    Authorization:USER_TOKEN,

                    
                }
            }
        );
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }

}
)







//deleting an order


export const deleteOrder=createAsyncThunk("adminOrder/deleteOrder",async(id,{rejectWithValue})=>{
    try{
        await axios.delete(
            {
                headers:{
                    Authorization:USER_TOKEN,

                    
                }
            }
        );
        return id
    }catch(error){
        return rejectWithValue(error.response.data);
    }

}
)






const adminOrderSlice=createSlice({
    name:"adminOrders",
    initialState:{
        orders:[],
        totalOrders:0,
        totalSales:0,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        //fetch all order
        builder
        .addCase(fetchAllOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.totalOrders=action.payload.length;
            //calculate total sales
            const totalSales=action.payload.reduce((acc,order)=>{
                return acc+order.totalPrice;},0);
                state.totalSales=totalSales;
            })
        
        .addCase(fetchAllOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        })

        ///update order sttaus
    .addCase(updateOrderStatus.fulfilled,(state,action)=>{
        const updatedOrder=action.payload;
        const orderIndex=state.orders.findIndex((order)=>{
            order._id===updatesOrder._id;
        });
        if(orderIndex!==-1){
            state.orders[orderIndex]=updatedOrder;
        }
    })
    //delte order;
    .addCase(deleteOrder.fulfilled,(state,action)=>{
        state.orders=state.orders.filter((order)=>order._id!== action.payload);
    })
    }
})
export default adminOrderSlice.reducer;