import React, { useContext } from 'react'
import config from "../../config.json"
import { NavLink } from 'react-router-dom'
import "./ProductCard.css"
import star from "../../assets/glowing-star.png"
import basket from "../../assets/basket.png"

// importing the userCartContext we created to use the context value that we passed for this context in its provider, also ProductCard.jsx can have access to that context provider value
import userCartContext from '../../contexts/userCartContext'

// importing the userContext we created to use the context value that we passed for this context in its provider, also ProductCard.jsx can have access to that context provider value
import userContext from '../../contexts/userContext'

// destructuring the product prop passed from ProductsList.jsx and setting default value as empty object if destructuring leads to undefined(no props available)
const ProductCard = ({product={}}) => {

    console.log(product)
    const {images:[image]=[],price,title,reviews:{rate,counts}={},stock,_id:id}=product

    // to access value we provided in context provider for useCartContext we created, calling the useContext function passing userCartContext we created and stored in userCartContext.js using createContext(), also if we don't provide value for userCartContext we created in context provider, it will use default value gave in createContext() as null and using object destructuring syntax we assign addToCart as function passed in context provider
    const {addToCart}= useContext(userCartContext)

    // to access value we provided in context provider for userContext we created, calling the useContext function passing userContext we created and stored in userContext.js using createContext(), also if we don't provide value for userContext we created in context provider, it will use default value gave in createContext() as null.
    const user=useContext(userContext)
    return (
        <article className='product_card'>
            <div className='product_image'>
                <NavLink to={`/products/${id}`} ><img src={`${config.backendURL}/products/${image}`} alt=""/></NavLink>
            </div>

            <div className='product_details'>
                <h3 className='product_price'>{price}</h3>
                <p className='product_title'>{title}</p>
                <footer className='align_center product_info_footer'>
                    <div className="align_center">
                        <p className='align_center product_rating'>
                            <img src={star} alt="star"/> 
                            {rate}
                        </p>
                        <p className="product_review_count">
                            {counts}
                        </p>
                    </div>
                    {/* Here below using conditional rendering, if product stock comes from backend from ProductsList.jsx->ProductCard.jsx is greater than 0, we are showing cart image button in ProductCard.jsx component, when we click cart image button, it will call addToCart function using reference with product data and quantity as 1 as argument , this will add the product to cart if product not exist , if already exist, add 1 quantity to the product.    */}

                    {/* using contextAPI , we are getting addToCart function here */}
                    {stock>0 && user && <button className='add_to_cart' onClick={()=>addToCart(product,1)} >
                        <img src={basket} alt="basket button" />
                    </button> }
                    
                </footer>
            </div>
        </article>

    )
    }

export default ProductCard
