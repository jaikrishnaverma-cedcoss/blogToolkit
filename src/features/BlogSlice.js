import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { keyGenerator } from "./universalFunctions";
const initialState={
loading:true,
error:false,
posts:[]
}

const BlogSlice=createSlice({
    name:'BlogSlice',
    initialState,
    reducers:{
        addPost:(state,action)=>{
            state.posts.push( {
                id: keyGenerator(state.posts),
                title:action.payload.title,
                body:action.payload.body,
                userId:action.payload.userId,
                tags:[],
                comments:[],
                reactions:0
            })
        },
        editPost:(state,action)=>{
            state.posts[action.payload.index]= {...state.posts[action.payload.index],...action.payload.post}
        },
        addComment:(state,action)=>{
            state.posts[action.payload.index].comments.push(action.payload.comment)
        },
        deletePost:(state,action)=>{
            state.posts.splice(action.payload,1)
         state.posts=[...state.posts]
        },
        setAllPosts: (state, action) => {
            state.loading=action.payload.loading
            state.posts=action.payload.posts
            state.error=action.payload.error
          },
        likePost:(state,action)=>{
            state.posts[action.payload].reactions=state.posts[action.payload].reactions+1
        },

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllPosts.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(fetchAllPosts.fulfilled,(state,action)=>{
            state.loading=false
            if(action.payload.message)
            state.error={status:'error',message:action.payload.message}
            else
            state.posts=action.payload.posts.map(x=>{return {...x,comments:[]}})
        })
        builder.addCase(fetchAllPosts.rejected,(state,action)=>{
            state.loading=false
            state.error={status:'error',message:action.payload.message}
        })
    }
})
export default BlogSlice.reducer;
export const { likePost,addComment,editPost,addPost,deletePost,setAllPosts} = BlogSlice.actions
export const fetchAllPosts=createAsyncThunk('BlogSlice/fetchAllPosts',async ()=>{
    let res=await fetch('https://dummyjson.com/posts')
      res = await res.json()
    //   console.log(res)
  return res
})