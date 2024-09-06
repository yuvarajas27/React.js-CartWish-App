import React from 'react'
import{Routes,Route} from "react-router-dom"

import HomePage from "../Home/HomePage"
import ProductPage from '../Products/ProductPage'
import SingleProductPage from '../SingleProduct/SingleProductPage'
import CartPage from '../Cart/CartPage'
import MyOrder from '../MyOrder/MyOrder'
import LoginPage from '../Authentication/LoginPage'
import SignupPage from '../Authentication/SignupPage'
import LogoutPage from '../Authentication/LogoutPage'
import ProtectedRoute from './ProtectedRoute'

const Routing = () => {

  //console.log(getCart)
  return (
    <Routes>
      {/* Important inside Routes component, only Route component should be present */}
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/products" element={<ProductPage/> }></Route>
        <Route path="/products/:id" element={<SingleProductPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        {/* We are implementing Nested Routing concept here below, wrapping the ProtectedRoute component with <Route></Route> and inside this Route , we placed all the components that needs to be Routed(show) for the specific path inside the ProtectedRoute Component <Route></Route>. */}
        {/* For nested Routing , use Route component only , don't use Routes Component. */}

        {/* Note: For the Protected Routes like /cart,/myorders/logout, if we access any of these protected routes when there is a user logged in, the page will be shown otherwise we will navigate to login page using Navigate component , more info will be in ProtectedRoute.jsx component, check*/}

        <Route element={<ProtectedRoute />}>
          {/* all the components below are nested (child) components of ProtectedRoute component */}
          <Route path="/cart" element={<CartPage />} ></Route>
          <Route path="/myorders" element={<MyOrder/>}></Route>
          <Route path="/logout" element={<LogoutPage/>}></Route>
        </Route>
        {/* <Route path="*" element={<HomePage/>}></Route> */}
    </Routes>
  )
}

export default Routing
