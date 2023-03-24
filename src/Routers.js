
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Blog from './components/Blog'
import Login from './components/Login'
import Posts from './components/Posts'
import Sidebar from './components/Sidebar'
import { fetchAllPosts, setAllPosts } from './features/BlogSlice'
import { fetchAllUsers, setAllUsers } from './features/UserSlice'

const Routers = () => {

  const dispatch=useDispatch()
  const selector=useSelector(state=>state)

     //check data exist in local storage or not 
  useEffect(() => {
    let x = localStorage.getItem("blog1");
    if(x)
    x=JSON.parse(x)
    if (x!==null&&x.users.users.length>0&&x.posts.posts.length>0) { 
      console.log('notfetch',x)
        dispatch(
          setAllUsers(x.users)
        );
        dispatch(
          setAllPosts(x.posts)
        );
      }else{
        dispatch(fetchAllUsers())
        dispatch(fetchAllPosts())
      }
  }, []);

  // update localstorage when redux state change
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("blog1", JSON.stringify(selector));
    }, 100);
  }, [selector]);

  console.log('STATE',selector)
    const router = createBrowserRouter([
      {
        path:'/',
        element:<Sidebar/>,
        children:[
          {
            path:'/',
            element:<Posts/>
          },
          {
            path:'/blog/:id',
            element:<Blog/>
          },
          {
            path:'/user/:id',
            element:<Posts/>
          }
        ]
    },
        {
            path:'/login',
            element:<Login/>
        }
    ])

  return (

    <RouterProvider router={router}/>
)
  
}

export default Routers