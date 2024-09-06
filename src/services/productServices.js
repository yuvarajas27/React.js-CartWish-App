// importing apiClient(axios with custom configuration ) from utils/apiClient.js file
import apiClient from "../utils/apiClient";

// exporting the getSuggestionAPI() function , this function accepts search string as parameter which comes from user typed in search box in input in Navbar.jsx component.
export function getSuggestionAPI(search){
    console.log("In productServices.js")
    // calling the products/suggestions api with passing search text as query string,this api call returns a promise, if there is no error this promise resolve(api call success) by getting all the products api (/products) data related to search string we passed as query string from backend and if api rejeccts(api call fails), it gives error object containing the information.
    return apiClient.get(`products/suggestions?search=${search}`)
}