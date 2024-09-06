import React, { useContext, useEffect, useState } from 'react'
import "./SingleProductPage.css"
import config from "../../config.json"
import QuantityInput from './QuantityInput';
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData';
import Loader from '../Common/Loader';
import "../Common/Loader.css"

// importing the userCartContext we created to use the context value that we passed for this context in its provider, also SingleProductPage.jsx can have access to that conext provider value
import userCartContext from '../../contexts/userCartContext';

// importing the userContext we created to use the context value that we passed for this context in its provider, also SingleProductPage.jsx can have access to that conext provider value
import userContext from '../../contexts/userContext';

// destructuring addToCart prop get from Routing.jsx component
const SingleProductPage = () => {

    // to access value we provided in context provider for useCartContext we created, calling the useContext function passing userCartContext we created and stored in userCartContext.js using createContext(), also if we don't provide value for userCartContext we created in context provider, it will use default value gave in createContext() as null and using object destructuring syntax we assign cart variable as cart state object  and addToCart as function passed in context provider.
    const {cart,addToCart} =useContext(userCartContext)

    const user=useContext(userContext)
    const {id}= useParams()

    const {data:product,error,loading}=useData(`/products/${id}`)

    const [selectedImage,setSelectedImage]=useState(0)

    const [quantity,setQuantity]=useState(0)

    return (
        <section className='align_center single_product'>
            {loading && <Loader/> }
            {error && <em className='form_error'>{error}</em>}
            {product &&
                <>
                    <div className="align_center">
                        <div className="single_product_thumbnails">
                            {
                                product.images.map((image,index)=>{
                                    return <img 
                                    key={index}
                                    src={`${config.backendURL}/products/${image}`} 
                                    alt={product.title}
                                    onClick={()=>setSelectedImage(index)}
                                    className={index===selectedImage? "selected_image":""}
                                    /> 
                                })
                            }
                        </div>
                        <img src={`${config.backendURL}/products/${product.images[selectedImage]}`} alt={product.title} className="single_product_display"/>

                    </div>

                    <div className='single_product_details'>
                        <h1 className="single_product_title">{product.title}</h1>
                        <p className="single_product_description">{product.description}</p>
                        <p className="single_product_price">{product.price.toFixed(2)}</p>
                        {user && <>
                            <h2 className="quantity_title">Quantity:</h2>
                            <div className="align_center quantity_input">
                                <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock}/>

                            </div>
                            {/* passing addToCart function as value (reference) which contains logic (to update the cart state variable when add to cart button click happen,this logic also don't add same product to cart again if only quantity of the product increase and add to cart button click happen) to onClick event listener.

                            we are passing product and quantity as an argument to addtoCart function using () => addToCart(product,quantity)like this arrow function way of syntax, this function can be called by react which is present in App.jsx component by using function reference when onClick happens for this Add to Cart button. 
                            
                            */}
                            {/* using the addTocart function we got from context API process */}
                            <button className="search_button add_cart" onClick={()=>addToCart(product,quantity)}>Add to Cart</button>
                        </>}
                    </div>
                </>
            }
        </section>
    )
}

export default SingleProductPage
