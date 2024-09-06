import React, { useContext, useEffect, useState } from 'react'
import "./CartPage.css"
//import user from "../../assets/user.webp"
import remove from "../../assets/remove.png" 
import Table from '../Common/Table'
import QuantityInput from '../SingleProduct/QuantityInput'

// importing the userContext we created to use the context value that we passed for this context in its provider, also CartPage.jsx can have access to that conext provider value.
import userContext from '../../contexts/userContext'

// importing the userCartContext we created to use the context value that we passed for this context in its provider, also CartPage.jsx can have access to that context provider value.
import userCartContext from '../../contexts/userCartContext'
import {checkoutAPI} from '../../services/checkoutServices'
import { toast } from 'react-toastify'

const CartPage = () => {
    const [subTotal, setSubTotal] = useState(0) 

    // to access value we provided in context provider for userContext we created, calling the useContext function passing userContext we created and stored in userContext.js using createContext(), also if we don't provide value for userContext we created in context provider, it will use default value gave in createContext() as null.
    const user =useContext(userContext)

    // to access value we provided in context provider for userCartContext we created, calling the useContext function passing userCartContext we created and stored in userCartContext.js using createContext(), also if we don't provide value for userCartContext we created in context provider, it will use default value gave in createContext() as null and using object destructuring syntax we assign cart variable as cart state which is an array of object and addToCart as function and removeCart as function,updateCart as function,setCart as state updating function passed in context provider.

    // all the variables we destructured below getting from App.jsx by providing all the values to userCartContext.
    const {cart,addToCart,removeFromCart,updateCart,setCart} = useContext(userCartContext)


    // this useEffect will call on everytime cartPage.jsx mounts and also when in CartPage.jsx,cart item increase/decrease and remove occurs
    useEffect(()=>{
        // assigning let variable to 0 first
        let total=0
        // using for each traversing cart state which is array of objects and summing up the cart products price using the below logic by product quantity multiply price (simple math logic)
        cart.forEach(item=>total+=item.product.price * item.quantity)

        // updating the total to subTotal state variable to show in jsx , when this useEffect runs after retuen jsx when component mounts
        setSubTotal(total)
    },[cart])


    // defining the checkOut function, this function call will be happen when clicking the checkOut button in cartPage once user added the products in cart and click checkOut button.
    const  checkOut=()=>{
        // using spread operator to store old cart state which is array of objects and storing in oldCart variable , here cart variable and setCart state upadting function we got using contextAPI.
        const oldCart=[...cart]

        // setting the cart state to empty array using setCart state upadting function once user click the checkout,this function runs, so clearing the cart data, so updating the state to empty array(updating the UI first) 
        setCart([])

        // calling checkoutAPI function present in checkoutServices.js,that function posting(using post method) the user orders data(cart data in cart page we give checkout by clicking checkout button) to backend (in orders data in mongo db database, backend designed like this) , this function returns promise.
        // handling that promise .then and .catch method
        checkoutAPI()
        // if returned promise resolved, we are showing the success message using react-toastify library (explained in react-toastify.md).
        .then((res)=>{
            toast.success("Product checked out Successfully")
        })
        .catch(()=>{
            // if returned promise rejected due to some problem, we are showing the error using react-toastify library (explained in react-toastify.md).
            toast.error("Something went wrong!")

            // If any error in backend, so we can't post user orders data to backend, we want to revert back the ui right, because we update the cart state to empty array, reverting back the cart state to old cart state(cart data user added in cartPage prsent before checkout)
            setCart(oldCart)
        })
    }

    return (
        <section className="align_center cart_page">
            <div className="align_center user_info">
                {/* using the user variable we got from context api process */}
                {/* passing current user profile in template literal with full server address to show image dynamically using curly brackets, */}
                <img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="user_profile"/>
                <div>
                    {/* using the user variable we got from context api process */}
                    {/* passing current user name dynamically using curly brackets */}
                    <p className="user_name">{user?.name}</p>

                    {/* passing current user email dynamically using curly brackets */}
                    <p className='user_email'>{user?.email}</p>
                </div>
            </div>
            <Table headings={["Item","Price","Quantity","Total","Remove"]}>
                <tbody>
                    {/*traversing the cart array we get from context api using map and showing here, showing dynamic data  */}
                        {
                            cart.map(({product,quantity})=>
                                <tr key={product._id}>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td className='align_center table_quantity_input'>
                                        {/* QuantityInput.jsx component is already used in SingleProductPage.jsx component, there we passed some props,but we need to use this component here also, without disturbing the flow of using this component in singleProductPage.jsx component to add/ remove product quantity in cart, here in cartPage.jsx component,we are using this QuantityInput component by passing quantity of product as quantity,product total stock as stock, product id and product_id, cart varaible as true as props  */}
                                        {/* we are getting product and product quantity details from cart object which we got using context provider API */}
                                        <QuantityInput quantity={quantity} setQuantity={updateCart} stock={product.stock} product_id={product._id} cart={true}  />
                                    </td>
                                    <td>{quantity*product.price}</td>
                                    <td >
                                        {/* In this cartPage.jsx component, here when we click this remove button, it will remove the product in cart local state variable and removing in backend database using patch request, so we are setting onClick event listener to this remove button , when this button clicks, this will call the callback function which contains function call with passing product  id present in App.jsx component using function reference(value) */}
                                        <img src={remove} alt="remove" className="cart_remove_icon" onClick={()=>removeFromCart(product._id)}/>
                                    </td>
                                </tr>
                            )
                        }    
                </tbody>
            </Table>
            <table className="cart_bill">
                <tbody>
                    <tr>
                        <td> SubTotal</td>
                        <td> {subTotal}</td>
                    </tr>
                    <tr>
                        <td> shipping Charge</td>
                        <td> $5</td>
                    </tr> 
                    <tr className='cart_bill_final'>
                        <td> Total</td>
                        {/* showing subTotal variable we calculated in useEffect present here in this component */}
                        <td> {subTotal + 5}</td>
                    </tr>
                </tbody>
            </table>
            {/* setting onClick eventListener to checkout button, when onClick event triggers, it will call the checkout function using reference(value) */}
            <button className="search_button checkout_button" onClick={checkOut}>Checkout</button>
        </section>
    )
}

export default CartPage
