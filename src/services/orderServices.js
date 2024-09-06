// importing apiClient(axios with custom configuration ) from utils/apiClient.js file
import apiClient from "../utils/apiClient";

// exporting the getOrderAPI() function 
export function getOrderAPI(){

    // calling the /order api with get method,it will return a promise, if no error this promise will resolve with(api call success with) getting all the orders data (checked out using /order/checkout API that stores in backend (in orders data in mongo db database(check mongo db compass), backend designed like this)) for current user(finding current user id by json web token in header in this request by backend) 
    return apiClient.get("/order")

} 