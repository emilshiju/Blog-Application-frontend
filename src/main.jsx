import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Profile from './Profile.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateBlog from './CreateBlog.jsx'

import { Provider } from "react-redux";


import Login from './Authentication/login.jsx'
import Register from './Authentication/register.jsx'
import store from './store/store.js'
import SingleBlogPage from './singleBlogPage.jsx'
import EditBlog from './EditBlog.jsx'
import PersonalDetails from './PersonalDetails.jsx'
import Draft from './Draft.jsx'
import { element } from 'prop-types'
import Published from './Published.jsx'
import UserProtected from './ProtectedRoutes/userProtected.jsx'
import ProtectedRoute from './ProtectedRoutes/protectedRoute.jsx'
import ProfileView from './ProfileView.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<UserProtected ><App  /></UserProtected>
  },
  {
    path:'/blog',
    element:<UserProtected><Profile /></UserProtected>
  },
  {
    path:'/createBlog',
    element:<UserProtected><CreateBlog /></UserProtected>
  },
  {
    path:'/login',
    element:<ProtectedRoute><Login /></ProtectedRoute>
  },
  {
    path:"/register",
    element:<ProtectedRoute><Register />
  </ProtectedRoute>,
  }
  ,
  {
    path:"/singeBlogPage/:blogId",
    element:<UserProtected><SingleBlogPage  /></UserProtected>
  },
  {
    path:"/editBlog/:blogId",
    element:<UserProtected><EditBlog /></UserProtected>
  },
  {
    path:"/goToProfile",
    element:<UserProtected><PersonalDetails  /></UserProtected>
  },
  {
    path:"/draft",
    element:<UserProtected><Draft  /></UserProtected>
  },
  {
  path:'/published',
  element:<UserProtected><Published  /></UserProtected>
  }
  ,
  {
    path:"/profileView",
    element:<UserProtected><ProfileView/></UserProtected>
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Provider  store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
