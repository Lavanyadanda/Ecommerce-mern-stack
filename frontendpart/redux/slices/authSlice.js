import {createSlice,createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "axios";
//retreve ser info and token from localstaorage if available
const userFromStorage=localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo")):null;
//chevk for an existing guest id in the localstoarge or generte a new one
const initialGuestId=
localStorage.getItem("guestId")|| `guest+${new Date().getTime()}`;
localStorage.setItem("guestId",initialGuestId);

//initial state
const initialState={
    user:userFromStorage,
    guestId:initialGuestId,
    loading:false,
    error:null,
};
//async thunk for user login
export const loginUser=createAsyncThunk("auth/loginUser",async(userData,{rejectWithValue})=>{
    try{
        const response=await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData
        );
        localStorage.setItem("userInfo",JSON.stringify(response.data.user));
        localStorage.setItem("userToken",response.data.token);
        return response.data.user;//return the user object from the object
    }catch(error){
        return rejectWithValue(error.response.data);

    }
})

//async thunk for user resgistartion
export const registerUser=createAsyncThunk("auth/registerUser",async(userData,{rejectWithValue})=>{
    try{
        const response=await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,userData
        );
        localStorage.setItem("userInfo",JSON.stringify(response.data.user));
        localStorage.setItem("userToken",response.data.token);
        
        return response.data.user;//return the user object from the object
    }catch(error){
        return rejectWithValue(error.response.data);

    }
})


//slice
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null;
            state.guestId=`guest_${new Date().getTime()}`;//reset guest id on logout

        localStorage.removeItem("userInfo");
        localStorage.removeItem("userToken");
        localStorage.setItem("guestId",state.guestId);//set new guest id in localstorage
        },
        generateNewGuestId:(state)=>{
            state.guestId=`guest_${new Date().getTime()}`;
            localStorage.setItem("guestId",state.guestId);
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        })

        .addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        })
    }
})

export const {logout,generateNewGuestId}=authSlice.actions;
export default authSlice.reducer;