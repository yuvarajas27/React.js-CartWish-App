// importing the axios instance created with baseURL property, shorthand syntax to use this instance without writing baseURL for axios get,post request each time.
import apiClient from "./apiClient";

// defining setAuthToken which recieves json web token(recieves as response from API if user logged in or signed in) as token from local storage in App.jsx component in setAuthToken(getJwt())
const setAuthToken=(token)=>{
    if(token){
        // `apiClient` is an instance of an HTTP client library (e.g., Axios) created with `axios.create()`.
        // `.defaults` holds the default configuration for `apiClient`, including settings for headers, base URLs, etc.
        // `.headers` is an object within `.defaults` used to specify HTTP headers for all requests.
        // `.common` is a sub-object of `.headers` where headers apply to all request methods (GET, POST, etc.)
        // `["x-auth-token"]` sets the custom header name `x-auth-token`, used for sending authentication tokens.
        // `= token` assigns the value of `token` (authentication token) to the `x-auth-token` header, ensuring it's included in all requests.

        // so setting the json web token in "x-auth-token" as default custom header for apiClient(axios instance) for all api requests, no need to pass json web token every time when we send API request.
        apiClient.defaults.headers.common["x-auth-token"] = token 
        console.log(apiClient.defaults.headers.common["x-auth-token"])
    }else{

        // when user logged in or signed in , we get json web token and due to window.reload(), entire react app reload, then setAuthToken(getJwt()) will run and set the token as custom header above, but when user logged out, we remove json web token from local storage, window.reload(), entire app reload, setAuthToken(getJwt()) run,token varaiable will be null, so delete the custom header set for the respective user.

        // This Deleting step is crucial, otherwise if its not done, with previous user logged in json web token , new user may call protected api(api needs json web token usually passed in server) without creating new json web token for him.
        delete apiClient.defaults.headers.common["x-auth-token"]
        try{
            console.log(apiClient.defaults.headers.common["x-auth-token"])

        } catch(err){
            console.log("No token")
        }
    }
}


// exporting setAuthToken function as default
export default setAuthToken