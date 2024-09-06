import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'

// importing the userContext we created in src/contexts/userContext.js
import userContext from './contexts/userContext'

// importing the userCartContext we created in src/contexts/userCartContext.js
import userCartContext from './contexts/userCartContext'
import "./App.css"

// React-Toastify is a popular library for adding toast notifications to React applications. Toast notifications are brief messages that pop up to provide feedback or alerts to the user without interupting their workflow. React-Toastify is known for its simplicity and ease of use, allowing developers to quickly implement and customize toast notifications in their React projects.
import {ToastContainer,toast} from "react-toastify"

import { getJwt, getUser } from './services/userServices'
import setAuthToken from './utils/setAuthToken'
import {addToCartAPI, decreaseCartAPI, getCartAPI ,increaseCartAPI,removeFromCartAPI } from './services/cartServices' 

// React-Toastify uses built-in CSS for styling the toasts. importing the css file for working with React-Toastify to apply default styles.
import "react-toastify/dist/ReactToastify.css"


// calling setAuthToken (getJwt()) will run , when user logged in or signed in , we get json web token and due to window.reload(), entire react app reload, then setAuthToken(getJwt()) provided here will run 

// getJwt() function in userServices.js will give json web token present in local storage ,either its null or json web token value.
setAuthToken(getJwt())


const App = () => {
  const [user,setUser]=useState(null)
  //console.log(user)

  // setting the useState variable (local variable) cart here, because we want cart state variable in both Navbar.jsx component and we are passing setCart(updatedCart) state updating function which is present in addToCart function as prop to  Routing.jsx -> SingleProductPage.jsx -> onClick={addToCart} as addToCart={addToCart}
  const [cart,setCart]=useState([])

  useEffect(()=>{
    //console.log("In UseEffect")
    try {
      const jwt_user=getUser()
      //console.log("JWT_USER",jwt_user)
      if(Date.now()>=jwt_user.exp * 1000){
        localStorage.remove("token")
        console.log("expired")
        location.reload() 
      }
      else{
        console.log(jwt_user)
        setUser(jwt_user)
      }      
    } catch (error) {
      
    }
  },[])

// making addToCart function as async because there is a logic in function which handling promise using await method ( await wait for a promise to resolve or reject (if reject it will be handled by catch block)

// this function will be called from singleProductPage.jsx component, when product added or removed to cart 

// this function will also be called from ProductCard.jsx component, when cart image button in ProductCard.jsx component click happen, this function will call.

const addToCart= async (product,quantity)=>{ 
  // using spread opeartor to spread all the cart state variable objects and defining to updatedCart Array
  const updatedCart = [...cart] 

  // iterating over the updatedCart array using findIndex() method to find index of newly added product(happens each time Add to Cart button click happen after selecting quantity for each product in SingleProductPage component) is already present in updatedCart array, if it founds , its'a duplicate product and its index will store to productIndex and if not found returns -1
  const productIndex = updatedCart.findIndex(item=>item.product._id===product._id)  

  // So, if product index is -1 , the newly added product is not in updatedCart Already, so pushing the object with new product and quantity to updatedCart array 
  if(productIndex===-1){
    updatedCart.push({product,quantity})

  }
  // else block code occurs if newly added product is duplicate which menas product already added ,now user tried to add product again by increasing or decreasing the quantity , so we are increasing/decreasing the quantity for the particular product using object bracket notation concept.
  else{
    updatedCart[productIndex].quantity+=quantity

  }

  // Then finally updating the updatedCart array in state updating function(updating the UI)
  setCart(updatedCart)
  try{
    // Handling the promise returned from api call post mnethod in addToCartAPI function in cartServices.js using await, wait wait for a promise to either resolve or reject, if resolve , store result in api_result, else, catch block will execute
    const api_result=await addToCartAPI(product._id,quantity) 
    
    console.log("API",api_result)

    // Use methods like `toast.success()`, `toast.error()`, etc., to show notifications.
    // The library manages the display by updating its internal state and manipulating the DOM directly.

    toast.success("Product Added to cart Succesully")
    // toast.warning("Product Added to cart Succesully")
    // toast.info("Product Added to cart Succesully")
    // toast("Product Added to cart Succesully")
    //console.log(api_result)

  }catch(err){ 
    // logging the error message if promise rejects or any error in try block
    console.log(err.response)
    toast.error("Failed to Add product in cart")

    // we are following optimistic approach , first updating the ui  by updating cart state variable, then storing the data in backend via API call, but due to any reasons, if API call fail, we are reverting the state variable to old state(reverting the old UI)
    setCart(cart)

  }
}

// defining getCart function
const getCart=()=>{
  // calling getCartAPI function present in cartServices.js, that function getting cart data from backend and returns promise. 
  // handling that promise .then and .catch method
  getCartAPI().then(res=>{
    // if returned promise resolved, we are updating the cart state variable with backend data response using setCart state updating function
    setCart(res.data) 
    //console.log("here")
    //return res.data
  })
  .catch(err=>{
    //console.log(err)
    // if returned promise rejected due to some problem, we are showing the error using react-toastify library (explained in react-toastify.md).
    toast.error("Something went wrong")
  })
}


// defining getCart function, this function accepts product id as argument
// this function will be called from cartPage.jsx component when when try to remove products from cart there
const removeFromCart=(id)=>{
  // using spread operator to store old cart state which is array of objects and storing in oldCart variable
  const oldCart=[...cart] 

  // using filter method in oldCart array , we are removing the product using id (remove button click happens for product in cartPage.jsx) and filter method returns new array with product removed and storing in newCart variable
  const newCart=oldCart.filter(item=>item.product._id!=id) 

  // updating the local cart state to newCart array(array of object with product removed), upadtimg the UI fisrt
  setCart(newCart)

  // calling removeFromCartAPI with product id (product to be removed) present in cartServices.js, since this function deleting the product id from backend using patch method and return promise
  removeFromCartAPI(id)
  // if promise resolved, data in backend removed correctly, just logging the response
  .then(res=>console.log(res))
  // if promise rejected, using toast library , showing error message
  .catch(err=>{
    toast.error("Something went Wrong!")
    // Also reverting the cart state to old State, since there is a error in backend(reverting back the UI)
    setCart(oldCart)
  
})
}


// defining getCart function, this function accepts product id as argument
// this function will be called from QauntityInput.jsx component present in cartPage.jsx component when when try to increase or decrease products using button in QuantityInput.jsx component, onClick event triggers for clicking the button for increase/decrease, this function call happens with two arguments,increase/decrease string for increase/decrease button click, product id for which increase/decreaese button clicked.
const updateCart=(type,id)=>{
      // using spread opeartor, storing current cart state values(objects) in to array and storing in oldCart variable
      const oldCart=[...cart]
      // using spread opeartor, storing current cart state values(objects) in to array and storing in updatedCart variable
      const updatedCart=[...cart]

      // using findIndex method on updatedCart array(which contains currrent cart values(objects)) to find index of product whose quantity increase/decrease is happened using product id for checking the products in cart state objects with product id we got from function call in onClick event trigger call in QuantityInput.jsx component.
      const productIndex=updatedCart.findIndex(item=>item.product._id===id)

      // If we got type as increase from from function call in onClick event trigger call in QuantityInput.jsx component, means increasing the product quantity, this if loop runs
      if(type==="increase"){
        // increasing the quantity of the product in updatedCart array
        updatedCart[productIndex].quantity+=1

        // calling increaseCartAPI with passing product id we got from function call in onClick event trigger call in QuantityInput.jsx component for product increase/decrease happen.
        
        // this api returns a promise, 
        increaseCartAPI(id)
        // if promise resolves,product quantity will be increased in cart successfully, this then block execute.
        .then(res=>{
          // just logging the resolved promise response 
          console.log(res)
          // Then updating the cart state with updatedCart array in which we update the product quantity using setCart state updating function(updating the UI first) 
          setCart(updatedCart)
        
      })
      // if promise rejects then some error, this catch block will be executed.
      .catch(err=>{
        toast.error("Something Went Wrong")
        // Also reverting the cart state to old State, since there is a error in backend(reverting back the UI)
        setCart(oldCart)

      })
      }

      
      // If we got type as decrease from function call in onClick event trigger call in QuantityInput.jsx component, means decreasing the product quantity, this if loop runs
      if(type==="decrease"){
        // decreasing the quantity of the product in updatedCart array
        updatedCart[productIndex].quantity-=1

        // calling decreaseCartAPI with passing product id we got from function call in onClick event trigger call in QuantityInput.jsx component for product increase/decrease happen.
        
        // this api returns a promise, 
        decreaseCartAPI(id)
        // if promise resolves,product quantity will be decreased in cart successfully, this then block execute.
        .then(res=>{
          // just logging the resolved promise response 
          console.log(res)
          // Then updating the cart state with updatedCart array in which we update the product quantity using setCart state updating function(updating the UI first) 
          setCart(updatedCart)
        
      })
      // if promise rejects then some error, this catch block will be executed.
      .catch(err=>{
        toast.error("Something Went Wrong")
        // Also reverting the cart state to old State, since there is a error in backend(reverting back the UI)
        setCart(oldCart)

      })
      }
  }



/* Important topic comment, it will be elobarated discussion 

In singleProductPage.jsx component, we are adding/removing the product quantity and clicking addToCart button, that will run the addToCart function present in App.jsx component, which first updates the cart state variable used to manage products added/removed to cart using cart state updating function(setCart) after some cart adding logic, this is updating the ui first when products added or removed to cart, then we are passing the cart state data to backend (using post method, posting data to /cart with product data and quantity which is present in state variable cart as object ), this is upadting the backend last, so as we know this is optimistic approach.if any error occur during posting data to backend, we revert the ui to old,means update the state again to old state.  

Also we know ,in each session, for example, when user logged in, adding the products to cart, we acn mange in cart state variable and display in cart page, but after we logged out or close app and open or refresh, we know in react , it loads entire app from scratch, we lose all state variables , but we are storing our cart products to backend each time user updates cart products. 

As we know we are storing auth token in headers right when user logged in to give auth token as header in all api requests, so in backend there is a logic in auth.js file, that will extract the auth token and find user details and give access to all get, post requests in backend, so our cart details added/ removed is stored to specific user in backend database.(much bigger topic I think in backend, this much kowledge is enough for know)


so, if we use useEffect with empty array as dependency in cartPage.jsx, our cart data stored in backend as of now (that is when each time cart state variable updates and shown in ui and posting data to backend in addToCart function in App.jsx , our backend cart data will be load only when cartPage loads, so getCart() function runs and  get backend data and stored in our local state variable, so now in Navbar.jsx,our cart count will show correct because passing cart state as context, but when page loads for first time when user looged in , we don't call this getCart() function, so it will run with local state variable cart which is initially 0 as page loads as we know. 

so running useEffect here to get backend data load here , if we not use useEffect here, when we add /remove cart products after page loads after user login, our cart state variable count and data will ot be in sync with backend , it may leads to any error. 

In the below useEffect, we are running getCart() to get backend data only user is logged in , also gave dependency as user because when user login, in first useEffect prestn here in App.jsx , setUser(jwt_user) in line 44 state update batched , before that our useEffect below runs , so if we gave empty dependency , it will run once user is set after setUser(jwt_user) , compnent renders again and this useEffect runs due to user state as dependency, so backend cart data will be fetched, now our backend data will be updated, so whatever new data added therefore also be in sync.


*/

useEffect(()=>{
  if(user){
    // calling getCart() function present above if user is authenticated.
    getCart()
  }
},[user])


return ( 
  // Providing the value using context provider syntax for userContext we created and imported here, only one prop value can be used to pass values to components and its child or nested child components, but in value , we can pass anything like number, string, boolean, object, etc., here passing user state as context value
    <userContext.Provider value={user}>
        {/* // Providing the value using context provider syntax for userCartContext we created and imported here, only one prop value can be used to pass values to components and its child or nested child components, but in value , we can pass anything like number, string, boolean, object, etc., here passing object with addToCart method,cart length,cart state variable as properties as context value */}
        <userCartContext.Provider value={{addToCart,cart,removeFromCart,updateCart,setCart}}>

          {/* Note all components and its child , nested child under context provider will have access to value we provide in the context provider*/}
          <div className="app">
                {/* we are passing user state variable and cart state variable array length as prop */}
                <Navbar/>
                {/* This component can be placed anywhere in your component tree, acts as the central location for rendering toast notifications, you can set the position of the toast container using the `position` prop. */}
                <ToastContainer position="bottom-right"/>
                <main>
                  {/* we are passing addToCart function as value(reference) which contains logic (to update the cart state variable when add to cart button click happen,this logic also don't add same product to cart again if only quantity of the product increase and add to cart button click happen) as prop  */}
                  <Routing />
                </main>
              
            </div>
        </userCartContext.Provider>
    </userContext.Provider>    
)
}

export default App



