// importing React library from "react"
import React from 'react'
// importing Navigate,Outlet Component from "react-router-dom"
import { Navigate, Outlet, useLocation } from 'react-router-dom'
// importing getUser function from userServices.js
import { getUser } from '../../services/userServices'

// Defining a ProtectedRoute Component(function)
const ProtectedRoute = () => {
    // This ProtectedRoute Component returns Outlet component when user is logged in or sign up happen(redirects to home page with user details after sign up), because getUser() will give decoded version of jwt web token, which can be present either login or signup happens. if user is not looged in or signup happens, getUser() will give null,so this component returns Navigate component with mentioned to go to login Page. 

    // Outlet Component is used in Nested Routing concept, here this ProtectedRoute component have nested Routes, wraps ProtectedRoute component with Route and inside this multiple Route components there(/cart,/myorders,/logout),so we want to use Outlet component in the place where we want to show nested components(child components) inside ProtectedRoute(our parent component here). 

    // so according to our logic below using ternary operator,if user is logged in or signup done, it will show our nested components according to path mentioned inside ProtectedRoute component in place of Outlet Component(placeholder),else if user is not logged in or signup done, Navigate component will navigate the page to login page using Navigate component for all the nested component(child component) inside ProtectedRoute component. 
    
    // useLocation() hook gives all informations about the current page location and stored in a location variable
    const location=useLocation()
    //In Navigate component, in the place of to="" prop, we can give url to navigate.
    // If user is logged in , getUser() is true, in the place of this Outlet component, we will show the respective component for protectedRoute which we access, else if user is not logged in, we will navigate to login component using Navigate component, but in this Navigate component, we are passing additional prop as state in that we are passing object with from property value as loaction.pathname(current page location that is /cart, when user try to access /cart, or any protected routes). 
    // we are passing this additional prop state because if user is not logged in , we navigate to user component, in that component, we use useLocation() hoook to get current page location that is /login, but this state prop will also be available in that object provided by useLocation(),because from here login page component render happens, so state prop also accessible in useLocation() in loginPage.jsx.
    return getUser() ? <Outlet/> : <Navigate to="/login" state={{from:location.pathname}}/>
}


// exporting the ProtectedRoute component as default
export default ProtectedRoute