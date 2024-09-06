// importing apiClient(axios with custom configuration ) from utils/apiClient.js file
import apiClient from "../utils/apiClient";


// exporting the checkoutAPI() function 
export function checkoutAPI(){

    // calling the /order/checkout api with post method,it will return a promise, if no error this promise will resolve with (api call success with)posting the user orders data(cart data in cart page we give checkout by clicking checkout button) to backend (in orders data in mongo db database, backend designed like this). 
    // Note all the cart orders data we checkedout using this API ,storing data to backend with user id (user id data will be taken from json web token stored in header for each request by backend, its a complex topic like how backend takes user id from header, its backend part, no need depth explanation )
    // quick note, this function just returns a promise, no need to handle promise here like .then or async/await methods. 
    return apiClient.post("/order/checkout")
}

