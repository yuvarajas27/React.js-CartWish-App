import React from 'react'
import "./FeaturedProducts.css"
import ProductCard from '../Products/ProductCard'
import ProductCardSkeleton from '../Products/ProductCardSkeleton'
import useData from '../../hooks/useData'

const FeaturedProducts = () => {

  // calling the custom hook we created in src->hooks->useData.js by passing /products/featured API call as parameter.

  // this custom hook maintain three state variables data,error,loading created using useState(), then one useEffect with empty dependency when no dependency passed(deps here as function parameter) that contains api call with get request, also if any error in api call, error variable assigned to error, loading state variable will be false if api call success or failure, but true if api call is still processing(api returning promise will be still in pending state) and returning three variables,so destructuring here.  

  // Note if there is a state update in useEffect in another component, that will trigger re render of component that invloves the state(means where that updated state is used in the component), not component where useEffect present, if state we are updating is part of component where useEffect runs, it will trigger the re render of the component where useEffect runs.

  // during api call (promise in pending state, useData hook will return isLoading: true,data: null,error: "" as initial value and re render this featuredProducts component(because all the returned states need to be updated in this component), then once api call success or failure , according to useData returns three states again and this component re render.

  

  const {data, error,loading}=useData("/products/featured")

  // assingning skeletons array as 3 numbers to load the skeleton until api call (promise resolve) and loading state is true wjhich come sfrom useData hook.
  const skeletons=[1,2,3]
  return (
    <section className='feature_products'>
        <h2>
            Featured Products
        </h2>

        <div className='align_center featured_products_list'>
          {/* if there is a error state available, data will be null, showing error message */}
          {error && <em className='form_error'>{error}</em>}
          
          {/* if there is data state available,error will not be available, we will show all featured products data using map method and showing each product details using ProductCard component. */}
          { data && data.map(product=>
            // Note: In React, we can pass prop as key to react identify unique items in list to change that part alone in virtual dom if change occurs, but we can't destructure key in component.
                <ProductCard 
                product={product}
                key={product._id} 
                // id={product._id} 
                // image={product.images[0]} 
                // price={product.price} 
                // title={product.title} 
                // rating={product.reviews.rate} 
                // ratingCounts={product.reviews.counts} 
                // stock={product.stock} 
                />)
          }

          {/* If there is loading state avaialble, if api call in pending state, loading state variable be available, using map method, traversing skeltons array and showing skeleton using ProductCardSkeleton component. */}
          {loading && skeletons.map(n=><ProductCardSkeleton key={n}/>) } 
        </div>
    </section>
  )
}

export default FeaturedProducts
