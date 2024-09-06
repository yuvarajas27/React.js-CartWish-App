// importing apiClient(axios with custom configuration ) from utils/apiClient.js file
import apiClient from "../utils/apiClient.js"
import {jwtDecode} from "jwt-decode"

// exporting signup function (named export)
// making signup function as async because there is a logic in function which handling promise using await method ( await wait for a promise to resolve or reject (if reject handled by catch block)  )
export async function signup(user,profile){

    //As we know to send files like images, audio,video or anything ,we have to use form-data instead of sending json in thunder client to send data with our API request.

    // If you want to send a file or a set of form fields (including text inputs, checkboxes, etc.) to a server via JavaScript, you use the FormData object. The new FormData() constructor is used to create an empty FormData object initially. You then populate this object using the append() method to add key/value pairs, where the key is the name of the form field and the value is the data associated with that field.
    const body= new FormData()
    body.append("name",user.name)
    body.append("email",user.email)
    body.append("password",user.password)
    body.append("deliveryAddress",user.deliveryAddress)
    body.append("profilePic",profile)


    // returning promise which get from post method to signup function call in onSubmit(callback function of handleSubmit)
    const {data}=await apiClient.post("/user/signup",body)
    localStorage.setItem("token",data.token)

}

export const login = async (user)=>{ 
    console.log(user)
    const body={ 
        "email":user.email, 
        "password":user.password
    }

    const {data}=await apiClient.post("/user/login",body)
    localStorage.setItem("token",data.token)

}

export const logout=()=>{
    localStorage.removeItem("token")
    
}

export const getUser=()=>{
    try{
        const jwt=localStorage.getItem("token")
        return jwtDecode(jwt)

    }
    catch(e){
        return null
    }
    
} 


export const getJwt=()=>{
    // returning json web token value (which is stored in local storage when login or signup api is called during login or signup respectively )present in local storage
    return localStorage.getItem("token")
}

