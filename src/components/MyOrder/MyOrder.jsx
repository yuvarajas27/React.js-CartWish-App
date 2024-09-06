import React, { useEffect, useState } from 'react'
import "./MyOrder.css"
import Table from '../Common/Table'
import { getOrderAPI } from '../../services/orderServices'
import useData from '../../hooks/useData'

const MyOrder = () => {

  // calling the custom hook we created in src->hooks->useData.js by passing api call as parameter
  // this custom hook maintain three state variables data,error,loading created using useState(), then one useEffect with empty dependency that contains api call with get request, alos if any error in api call, error variable assigned to error, loading state variable will be false if api call success or failure, but true if api call is still processing(api returning promise will be still in pending state) and returning three variables,so destructuring here. 

  // renaming the destructured variable data as orders, which is an array of objects
  const {data:orders,error,loading}=useData("/order")

  // this function takes order(array of object which contain each individual checked out products of user )
  const getProductString= order=>{
    console.log(order)
    // traversing the product array in order(array of object which contain each individual checked out products of user) using map and returning all the product names with quantity in brackets to productStringArr, E.g [NothingPhone2(5),Iphone15ProMax(100)]
    const productStringArr= order.products.map(p=>`${p.product.title}(${p.quantity})`)

    // using join method in productStringArr to convert all array values as a single string with comma space separated string and returning .
    return productStringArr.join(", ")
  }

  //Below method is one of the way to get order details of user using useState,useEffect and render the content after forming the specific data ,also here calling the function getOrderAPI() which calls api to get data specific to user(it can fetch data specific to user by identifying the unique token id for the user) present in src->services->checkoutServices.js  

  /*const [order,setOrder]= useState(null)
  useEffect(()=>{
    getOrderAPI()
    .then((res)=>{
      let product=[]
      console.log(res.data)
      res.data.forEach((item,index)=>{
        let products_data=[]
        item.products.forEach((products)=>{
          products_data.push(`${products.product.title}(${products.quantity})`)
        })
        product.push({order_no:index+1,products_name:products_data.join(", "),total:item.total,status:item.status})
      })
      setOrder(product)
      
    })
  },[])*/


  return (
    <section className="align_center myorder_page">
      {/* if orders data is present(available by fetching from backend), will show or not show if no data prsent using conditional rendering */}
      { orders && 
          <Table headings={["Orders","Products","Total","Status"]}>
          <tbody>
            {/* traversing the orders array which is an array of objects using map method */}
            {
              // map method have one callback function that have access to array elements , index, array itself as arguments, we can give any names to access that, here accessing array elements as order, array index value as index/
              orders.map((order,index)=>
                // giving order specific values to table data
              <tr key={order._id}>
                <td>{index+1}</td>
                {/* each user have one or many products added to cart in each checkout, so for each checkout added products will be shown in comma separated values along with quantity, so this function getProductString takes each order array of object(each individual checked out products of user ) and gives each individual checkout added products in comma separated values along with quantity  */}
                <td>{getProductString(order)}</td>
                <td>${order.total+5}</td>
                <td>{order.status}</td>
            </tr>)
            }
              
          </tbody>
          </Table>
      }
    </section>
    
    
  )
}

export default MyOrder
