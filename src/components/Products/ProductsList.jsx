import "./ProductsList.css"
import ProductCard from './ProductCard'
import ProductCardSkeleton from "./ProductCardSkeleton"

import { useSearchParams } from 'react-router-dom';
import useData from '../../hooks/useData';
import Pagination from "../Common/Pagination";
import { useEffect, useState } from "react";


const ProductsList = () => {

  // defining sortBy state variable and setSortBy state updating function by calling useState() function with default value as empty string and using array destructuring storing the state variable and state updating function.
  const [sortBy,setSortBy]=useState("")

  // defining sortedProducts state variable and setSortedProducts state updating function by calling useState() function with default value as empty array and using array destructuring storing the state variable and state updating function.
  const [sortedProducts,setSortedProducts]=useState([])
  // useSearchParams() returns an array where the fisrt element is an object representing the current query string params, initially it will be an empty object and second element is an function to update the query string parameter.
  // defining serachParams state varaible and searchParams state updating function to update query string by using useSearchParams() hook.
  const [searchParams,setSearchParams]=useSearchParams()

  const category=searchParams.get("category")

  const page=searchParams.get("page")

  // getting the queryString search value we made in url when user type search string and press enter or click search button
  const searchQuery=searchParams.get("search")

  // calling the custom hook we created in src->hooks->useData.js by passing /products/featured API call as parameter.

  // this custom hook maintain three state variables data,error,loading created using useState(), then one useEffect with empty dependency when no dependency passed(deps here as function parameter) that contains api call with get request, also if any error in api call, error variable assigned to error, loading state variable will be false if api call success or failure, but true if api call is still processing(api returning promise will be still in pending state) and returning three variables,so destructuring here.  

  // Note if there is a state update in useEffect in another component, that will trigger re render of component that invloves the state(means where that updated state is used in the component), not component where useEffect present, if state we are updating is part of component where useEffect runs, it will trigger the re render of the component where useEffect runs.

  // during api call (promise in pending state, useData hook will return isLoading: true,data: null,error: "" as initial value and re render this featuredProducts component(because all the returned states need to be updated in this component), then once api call success or failure , according to useData returns three states again and this component re render.
  const {data,error,loading}=useData("/products",
    {
      params:{
        
        // passing the search string user typed in search box as params named search to API, we pass under the name search , because thats how backend designed.
        // first setting the search string user typed in url by using navigate("/products/search=${search}") , this will render the <ProductPage/> component which contains ProductsSidebar and ProductList this componnet using React Routing , then in this component, we call api with search string (get from url by useSearchParams) bu useData custom hook, passing searchQuery as dependency to useFfect , so whenever searchQuery change, useEffect runs in cutom hook and productsList.jsx component render with updated search data, if this dependency not given , useEffect will make as empty dependency array, so only one time we search from HomePage.jsx, searched products will shown, then if we search also it will not give searched products.
        search:searchQuery,
        category,
        // also note one thing, if no page number is given also, specific number of pages(8) will get from backend, that how backend designed(author not gave proper explanation, i assumed like this,it will be true), if we select first page also first 8 pages will shown 
        page
      }
    }
    ,[searchQuery,category,page])

    console.log(page,data)

  const skeletons=[1,2,3,4,5,6,7,8]

  const handlePage=page=>{
    const currentParams=Object.fromEntries([...searchParams])
      setSearchParams({...currentParams,page}) 
  
  }


  useEffect(()=>{
    const handleScroll=()=>{
      const {scrollTop,clientHeight,scrollHeight}=document.documentElement

      if((scrollTop+clientHeight)>= scrollHeight-1){
        console.log("Reached to Bottom!")
      }
    }
    window.addEventListener("scroll",handleScroll)
  },[])


  // Note: This useEffect will run after the component first mount or any dedpendency cahnge after render the jsx in each case.
  // created useEffect with sortBy state variable and data which is a result of API call if api call success, in this data only we will access product details and render
  // This useEffect runs on first component mount and when sortBy and data value changes. 
  // we use sortBy as dependency because when user tries to change sort values in dropdown, we need to sort products. 
  // we use data as dependency beacuse if user selects one dropdown value from sorting list, and click any categories, our products need to differ, but we are updating products data in setSortedProducts state in useEffect with sorting according to what we selected in sort list, we are showing setSortedProducts only in jsx, if no data given as dependency,ui will not update if we select different categories to show new products, only last time updated sortedProducts in useEffect when sortby state change occur will show.
  useEffect(()=>{
    console.log("checking",data)
    // checking if data from api is available , if yes indicates api call is success and checking data from api call contains atleast more than one products for any api call(categories api call like /products?category="" or /products) , if these condition met only, sorting logic will be proceed. 
    if(data && data.products){
      // using spread opeartor, we are storing data.products copy in to products variable.
      const products= [...data.products]

      // we sort products by price or rate in ascending or descneding order using sort array method in javascript. 
      // sort method in js sorts string values in alpabetical order and for numbers, it will convert in to string using unicode characters and sort, for numbers,sort method will not work fine. 
      // But we can use comparator callback function in sort to sort string, number, objects correctly. 
      // sort comparator callback function have access to two values of array a and b for each iteration, if we gave a-b , it will sort the products in array in ascending order else b-a , it will sort products in descending order. 
      // actually in a-b(ascending order sorting) and b-a(descending order sorting), if value is negative a comes before b, if value is positive b comes before a, if value is equal no change in a and b balues, here mentioning a and b as each iteration of a and b values in array and talking about that position only


      // checking dropdown selected in sorting list is price desc, we will sort products by price in descending order then we update sorted products data in sortedProducts state variable using setSortedProducts state updating function.
      if(sortBy==="price desc"){
        setSortedProducts(products.sort((a,b)=>b.price - a.price))
      }
      // checking dropdown selected in sorting list is price asc, we will sort products by price in ascending order then we update sorted products data in sortedProducts state variable using setSortedProducts state updating function.
      else if(sortBy==="price asc"){
        setSortedProducts(products.sort((a,b)=>a.price - b.price))
      }
      // checking dropdown selected in sorting list is rate desc, we will sort products by rate in descending order then we update sorted products data in sortedProducts state variable using setSortedProducts state updating function.
      else if(sortBy==="rate desc"){
        setSortedProducts(products.sort((a,b)=>b.reviews.rate - a.reviews.rate))
      }
      // checking dropdown selected in sorting list is rate asc, we will sort products by rate in ascending order then we update sorted products data in sortedProducts state variable using setSortedProducts state updating function.
      else if(sortBy==="rate asc"){
        setSortedProducts(products.sort((a,b)=>a.reviews.rate - b.reviews.rate))
      }
      // if any other dropdown selected in sorting list, only one other than above four is relevance, we update products data in sortedProducts state variable using setSortedProducts state updating function.
      else{
        setSortedProducts(products)
      }
    }

  },[sortBy,data])

  return (
    <section className='products_list_section'>
        <header className='align_center products_list_header'>
            <h2>Products</h2>
            {/* In the dropdown box below created using select tag, we are setting onChange event listener which will trigger setSortBy state updating function that will update the current selected dropdown value in sortBy state variable when change in dropdown occurs, selected dropdown value will be available in event object as e ,which is accessible in callback function in onChange event listener, event object wil be given by select input tag to call back function of event listener function(assume like this.) */}
            <select name="sort" id=""  className='products_sorting' onChange={(e)=>setSortBy(e.target.value)}>
                <option value=""> Relevance</option>
                <option value="price desc"> Price HIGH TO LOW</option>
                <option value="price asc"> Price LOW TO HIGH</option>
                <option value="rate desc"> Rate HIGH TO LOW</option>
                <option value="rate asc">Rate LOW TO HIGH</option>
            </select>
        </header>

        <div className="products_list">
          
          {error && <em className='form_error'>{error}</em>}
          {loading && skeletons.map(n=><ProductCardSkeleton key={n}/>) } 
          {/* checking if products is present in data variable , if yes showing sorted products */}
          { data?.products && sortedProducts.map(product=>
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
        </div>
        <Pagination totalPosts={data?.totalProducts} postsPerPage={8} onClick={handlePage} currentPage={page}/>
    </section>
  )
}

export default ProductsList






