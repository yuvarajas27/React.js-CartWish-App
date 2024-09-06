// importing apiClient(axios with custom configuration ) from utils/apiClient.js file
import apiClient from "../utils/apiClient"; 


// exporting the addToCartAPI function 
// This function accepts two arguments as id and quantity of product
export function addToCartAPI(id,quantity){
    // calling the /cart/id api with post method by passing id dynamically using template literal, with passing quantity data as object in body, this api call returns a promise, we are returning that promise to addToCartAPI call from there this function call happens.
    return apiClient.post(`/cart/${id}`,{quantity})

}

// exporting the getCartAPI function
export function getCartAPI(){
    // calling the /cart api with get method,it will return a promise, if no error this promise will resolve with cart data along with quantity we posted in /cart api using post method to backend above in addToCartAPI function. 
    // quick note, this function just returns a promise, no need to handle promise here like .then or async/await methods. 
    return apiClient.get('/cart')
} 


// exporting the removeFromCartAPI  function 
// This function accepts product id as an argument 
export function removeFromCartAPI(id){

    // calling the `/cart/remove/${id}` API with patch method passing product id to remove in backend, we are using patch method, because we are updating(here removing) specific part of the data in cart, not completely removing cart(delete is used when completely removing the cart) .
    // this method returns a promise, if promise resolves,product will be removed in cart successfully,if rejects then error.
    // according to some restful API principles, using patch here to remove is best and also which method want to use depends on how backend logic implemented, so here using patch to remove specific data in cart according to our backend.
    return apiClient.patch(`/cart/remove/${id}`)

}


// exporting the increaseCartAPI  function 
// This function accepts product id as an argument 
export function increaseCartAPI(id){

    // calling the `/cart/increase/${id}` API with patch method passing product id to remove in backend, we are using patch method, because we are updating specific part of the data(increasing the quantity for our product) in cart,not updating the cart(whole cart data itself to new).

    // this method returns a promise, if promise resolves,product quantity will be increased in cart successfully,if rejects then error.

    // according to some restful API principles, using patch here to update is best and also which method want to use depends on how backend logic implemented, so here using patch to update specific data in cart according to our backend.
    return apiClient.patch(`/cart/increase/${id}`)

}


// exporting the removeCartAPI  function 
// This function accepts product id as an argument 
export function decreaseCartAPI(id){

    // calling the `/cart/decrease/${id}` API with patch method passing product id to remove in backend, we are using patch method, because we are updating specific part of the data(decreasing the quantity for our product) in cart,not updating the cart(whole cart data itself to new).

    // this method returns a promise, if promise resolves,product quantity will be decreased in cart successfully,if rejects then error.

    // according to some restful API principles, using patch here to update is best and also which method want to use depends on how backend logic implemented, so here using patch to update specific data in cart according to our backend.
    return apiClient.patch(`/cart/decrease/${id}`)

}