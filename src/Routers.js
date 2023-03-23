
import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Blog from './components/Blog'
import Login from './components/Login'
import Posts from './components/Posts'
import Sidebar from './components/Sidebar'
import Store from './features/Store'

const Routers = () => {
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
          }
        ]
    },
        {
            path:'/login',
            element:<Login/>
        }
    ])

  return (
  <Provider store={Store}>
    <RouterProvider router={router}/>
  </Provider>)
  
}

export default Routers