import React from 'react'
import "./ProductPage.css"
import ProductsSideBar from './ProductsSideBar'
import ProductsList from './ProductsList'

const ProductPage = () => {
  return (
    <section className='products_page'>
        <ProductsSideBar/>
        <ProductsList/>
    </section>
  )
}

export default ProductPage
