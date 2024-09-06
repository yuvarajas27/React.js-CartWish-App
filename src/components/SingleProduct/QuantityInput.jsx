import React from 'react'
import "./QuantityInput.css"
// defining the QuantityInput function,using object destructuring in function arguments to get all the values passed as props(props will be converted in to object as properties,so we can access that properties using object destructuring) in QuantityInput .
const QuantityInput = ({quantity,setQuantity,stock,product_id,cart}) => {
  return (
    <>
        {/* In this component, we are returning button , in disable attribute , we are checking product quantity is less than 1 inside curly braces to evaluate js expression, if true, disabling the button ,means button not able to click  */} 
        {/* Also setting onClick event listener to call specific function when onClick event triggers, but using ternary opertor inside curly braces ,because its js expression to call a specific function depending on cart variable value  */}
        {/* If cart value is true means, QuantityComponent(component is just a function in react, remember) function call came from cartPage.jsx component, so we are calling setQuantity function holding the reference of updateCart function present in App.jsx with two arguments as decrease string beacause its decrease button, product id whose quantity we decrease , if cart value false means, we are calling setQuantity function whioch holds state updating function of quantity useState variable present in singleProductPage.jsx component   */}
        <button className="quantity_input_button" disabled={quantity<=1} onClick={cart ? ()=>setQuantity("decrease",product_id):()=>setQuantity(prev=>prev-1)}>-</button>
        <p className='quantity_input_count'>{quantity}</p>



        {/* In this component, we are returning button , in disable attribute , we are checking product quantity is greater than total product stock inside curly braces to evaluate js expression, if true, disabling the button ,means button not able to click  */} 
        {/* Also setting onClick event listener to call specific function when onClick event triggers, but using ternary opertor inside curly braces ,because its js expression to call a specific function depending on cart variable value  */}
        {/* If cart value is true means, QuantityComponent(component is just a function in react, remember) function call came from cartPage.jsx component, so we are calling setQuantity function holding the reference of updateCart function present in App.jsx with two arguments as increase string beacause its increase button, product id whose quantity we increase, if cart value false means, we are calling setQuantity function which holds state updating function of quantity useState variable present in singleProductPage.jsx component   */}
        <button className="quantity_input_button" disabled={quantity>=stock} onClick={cart ? ()=>setQuantity("increase",product_id):()=>setQuantity(prev=>prev+1)} >+</button>
    </>
  )
}

export default QuantityInput
