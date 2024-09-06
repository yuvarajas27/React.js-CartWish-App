import React, { useEffect, useState } from 'react'
import config from "../../config.json"
import "./ProductsSideBar.css"
import LinkWithIcon from '../Navbar/LinkWithIcon'
import useData from '../../hooks/useData'

const ProductsSideBar = () => {
  const {data,errors}=useData("/category")

  return (
    <aside className='products_sidebar'>
            <h2>Category</h2>
            {errors && <em className='form_error'>{errors}</em>}
            <div className="category_links">
              {data && data.map(category=>
                <LinkWithIcon
                key={category._id}
                title={category.name}
                link={`/products?category=${category.name}`}
                emoji={`${config.backendURL}/${category.image}`}
                sidebar={true}
                />
              )}
            </div>
    </aside>
  )
}

export default ProductsSideBar
