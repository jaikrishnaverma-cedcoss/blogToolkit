import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState={
session:{

},
loading:true,
error:false,
users:[]
}
const UserSlice=createSlice({
    name:'UserSlice',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(loginApi.pending,(state,action)=>{
              state.loading=true
        })
        builder.addCase(loginApi.fulfilled,(state,action)=>{
              state.loading=false
              if(action.payload.message)
              state.error={status:'error',message:action.payload.message}
              else
              state.session=action.payload
        })
        builder.addCase(loginApi.rejected,(state,action)=>{
            state.loading=false
            state.error={status:'error',message:action.payload.message}
        })
        builder.addCase(fetchAllUsers.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(fetchAllUsers.fulfilled,(state,action)=>{
            state.loading=false
            if(action.payload.message)
            state.error={status:'error',message:action.payload.message}
            else
            state.users=action.payload.users
        })
        builder.addCase(fetchAllUsers.rejected,(state,action)=>{
            state.loading=false
            state.error={status:'error',message:action.payload.message}
        })
    }
})
export default UserSlice.reducer;
export const loginApi=createAsyncThunk('UserSlice/loginApi',async (details)=>{
    const {username,password}=details
    console.log(username,password)
    let res=await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })
      res = await res.json()
  return res
})
export const fetchAllUsers=createAsyncThunk('UserSlice/fetchAllUsers',async ()=>{
    let res=await fetch('https://dummyjson.com/users')
      res = await res.json()
  return res
})