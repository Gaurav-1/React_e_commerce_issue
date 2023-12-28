import React, { useEffect, useState, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './Apps/App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {GuestRoutes, UserRoutes, SellerRoutes, AuthRoute} from "./routes/userRoute.jsx"
import UserAuthContext from './context/userAuthContext.jsx'
import UserAuthState from './states/userAuthState.jsx'
import './index.css'




const MainComp = () => {
  const { user, setUser } = React.useContext(UserAuthContext);
  useEffect(() => {
    console.log('User Updated from main', user);
  }, [user]);
  console.log(user);
  const isGuest = user?.userRole === 'guest';
  const isUser = user?.userRole === 'user';
  const isSeller = user?.userRole === 'seller';
  console.log(isSeller);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        ...GuestRoutes.map((route)=>({
          ...route,
          element: <AuthRoute element={route.element} isAuthenticated={isGuest} />
        })),
        ...UserRoutes.map((route)=>({
          ...route,
          element: <AuthRoute element={route.element} isAuthenticated={isUser} />
        })),
        ...SellerRoutes.map((route)=>({
          ...route,
          element: <AuthRoute element={route.element} isAuthenticated={isSeller} />
        }))
      ],
    },
  ]);
  return (
    <><RouterProvider router={router}/></>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
      <UserAuthState>
        <MainComp />
      </UserAuthState>
    </>
)