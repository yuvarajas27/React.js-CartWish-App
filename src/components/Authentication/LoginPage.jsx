// // // importing useRef, useState Hook from react library
// // import React, {useState, useRef } from 'react'
// // // importing LoginPage.css file
// //import "./LoginPage.css"

// // //handling form using useRef Hook
// // const LoginPage = () => {
// //     //useRef Hook is for accessing the dom elements, and for creating mutable variable which will not re-render the component 
// //     // useRef Hook accepts one argument and returns an object with only one property called current
// //     // passing default value for useRef as null and stored in nameRef variable.
// //     const nameRef=useRef(null)

// //     // passing default value for useRef as null and stored in nameRef variable.
// //     const passwordRef=useRef(null)

// //     // defining handleSubmit function
// //     // handleSubmit function recieves event object from form during onSubmit eventlistener, which will contain complete information about the event, getting event object as e in function parameter
// //     const handleSubmit=(e)=>{
// //         // The default behaviour of the form is to refresh the page when form submit occurs, e.preventDefault will stop that behaviour, no refresh of page occurs
// //         e.preventDefault()
// //         // setting user object with two property name and number as empty string
// //         const user={
// //             name:"",
// //             number:""
// //         }

// //         // setting the user object name property to the user provided name value in input box , nameRef will have access to dom element(name input box) and having the user provided name value in current.value property
// //         user.name=nameRef.current.value

// //         // setting the user object number property to the user provided number value in input box , passwordRef will have access to dom element(phone number input box) and having the user provided number value in current.value property
// //         user.number=passwordRef.current.value
// //         console.log(user)
// //     }
    
// //     return (
// //         <section className="align_center form_page">
// //             {/* setting onSubmit eventlistener and passing handleSubmit function as value(reference), this event will trigger when form gets submitted, so when form submitted, handleSubmit function will run. */}
// //             <form className="authentication_form" onSubmit={handleSubmit}>
// //                 <h2>Login Form</h2>
// //                 <div className="form_inputs">
// //                     <div>
// //                         {/* htmlFor attribute in label specify which form element the label is bound, 
// //                         for that, both htmlFor attribute and form element id attribute should be same to bound
// //                         So, here label htmlFor="name" and input element id="name", so with this htmlFor, if we click Name, cursor will point to input box for Name" */}
// //                         <label htmlFor="name">Name</label>
// //                         {/* defining ref attribute and passing useRef variable created nameRef, so after this component mounts(render for first time), nameRef variable have reference to this input box in nameRef.current property ,so we can make dom manipulation(get the value, change the value) for this input box  */}
// //                         <input ref={nameRef} type="text" className="form_text_input" id="name" placeholder='Enter Your Name' />
// //                     </div>

                    
// //                     <div>
// //                         {/* htmlFor attribute in label specify which form element the label is bound, 
// //                         for that, both htmlFor attribute and form element id attribute should be same to bound
// //                         So, here label htmlFor="number" and input element id="number, so with this htmlFor, if we click Phone number, cursor will point to input box for phone number" */}
// //                         <label htmlFor="number">Phone Number</label>
// //                         {/* defining ref attribute and passing useRef variable created passwordRef, so after this component mounts(render for first time), passwordeRef variable have reference to this input box in passwordRef.current property ,so we can make dom manipulation(get the value, change the value) for this input box  */}
// //                         <input ref={passwordRef} type="number" className="form_text_input" id="number" placeholder='Enter Your Phone Number'  />
// //                     </div>

                    
// //                     {/* setting onClick eventlistener and passing arrow function that contains the logic to change the passwordRef referring dom element(input box) type, this is for hide password button, so if button click happens, it will change input type to password, so data will be hidden*/}
// //                     {/* initially passwordRef referring dom element inputbox type will be number */}
// //                     <button type="button" onClick={()=>passwordRef.current.type="password"}>Hide Password</button>

// //                     {/* setting onClick eventlistener and passing arrow function that contains the logic to change the passwordRef referring dom element(input box) type, this is for show password button, so if button click happens, it will change input type to text, so data will be shown*/}
// //                     <button type="button" onClick={()=>passwordRef.current.type="text"}>Show Password</button>

// //                     {/* this is button with type submit, when this button click happens, form onSubmit eventlistener will trigger, this is the default beahaviour, any button with submit type in the form click leads to trigger onSumbit eventlistener */}
// //                     <button type="submit" className='search_button form_submit'> Submit </button>
// //                 </div>



// //             </form>


// //         </section>
        
// //     )
// // }

// // //exporting LoginPage as default, we can export only one default per component 
// // export default LoginPage

// //----------------------------------------------------------------------------------------------------------------------------------------

// //handling form using useState Hook 
// // const LoginPage = () => {

// //      // useState hook accepts one argument that is initial value(default value) react want to use or store when component is rendered first time. in simpler terms, it uses this value as a initial value for a state variable 
// //     // useState hooks returns array of two values: 
// //     // first array value is a state variable which contains initial value we pass to useState hook, if no value pass, value will be undefined
// //     // second array value is always a function(state updating function), we can call this state updating function with new values to update the state variable, component will rerender for every time state updating function call occur(every time state variable changes).
// //     // using array destructuring to store the state variable and function values to user and setUser respectively, passing object with name and phone number property as empty string as default value to useState.
// //     const [user,setUser]=useState({
// //         name:"",
// //         phone:""
// //     })

// //     {/* handleSubmit function recieves event object from form during onSubmit eventlistener, which will contain complete information about the event, getting event object as e in function parameter */}
// //     const handleSubmit=(e)=>{
// //         // The default behaviour of the form is to refresh the page when form submit occurs, e.preventDefault will stop that behaviour, no refresh of page occurs
// //         e.preventDefault()
// //         console.log(user)
// //     }
// //     return (
// //             <section className="align_center form_page">
// //                 {/* setting onSubmit eventlistener and passing handleSubmit function as value(reference), this event will trigger when form gets submitted, so when form submitted, handleSubmit function will run. */}
// //                 <form className="authentication_form" onSubmit={handleSubmit}>
// //                     <h2>Login Form</h2>
// //                     <div className="form_inputs">
// //                         <div>
// //                             <label htmlFor="name">Name</label>
// //                             {/* setting onChange eventlistener and passing arrow function with event attribute which contains setUser State updating function which will trigger for every change of data in input box*/}
// //                             {/* onChange event gives event object to arrow function which will contain complete information about the event*/}
// //                             {/* setUser state updating function passing object as argument to update the state variable which is also an object, but when passing object, first using spread operator , getting all the previous state variable object values and passing the new values for the object property (passing name propery with value as user entered name value*/}
// //                             {/* In object,if we pass new value to the property already exist,new value will be overridden    */}
// //                             <input type="text" className="form_text_input" id="name" placeholder='Enter Your Name' onChange={e=>setUser({...user,name:e.target.value})} value={user.name} />
// //                         </div>

                        
// //                         <div>
// //                             <label htmlFor="number">Phone Number</label>
// //                             {/* setting onChange eventlistener and passing arrow function with event attribute which contains setUser State updating function which will trigger for every change of data in input box*/}
// //                             {/* onChange event gives event object to arrow function which will contain complete information about the event*/}
// //                             {/* setUser state updating function passing object as argument to update the state variable which is also an object, but when passing object, first using spread operator , getting all the previous state variable object values and passing the new values for the object property (passing phone propery with value as user entered phone number value converted to number using parseInt()*/}

// //                             {/* we can call this input field implementation for form as a controlled component because its state is entirely controlled by react,it means input value of state is not controlled by dom, controlled by state variables we created, because previously we use useRef hook way of handlingform, we get values of input by creating useRef variable and passing to ref attribute to the input box we want to access dom,but inputfield value is controlled by DOM, means dom set the value property to user entered value implicitly   */}

// //                             {/* we want to explicitly set value field in useState implemantation of input for handling form, e.g we are stroring phoe number as number in state variable , but if we don't set value variable explicitly, dom manages the value state, it stores phone number in string, so sync issues in state occurs  */}

// //                             {/* we can call input field implementation using useRef hook as a uncontrolled component, value of input is managed by dom */}
// //                             <input type="number" className="form_text_input" id="number" placeholder='Enter Your Phone Number' onChange={e=>setUser({...user,phone:parseInt(e.target.value)})} value={user.phone}  />
// //                         </div>

// //                         {/* this is button with type submit, when this button click happens, form onSubmit eventlistener will trigger, this is the default behaviour, any button with submit type in the form click leads to trigger onSumbit eventlistener */}
// //                         <button type="submit" className='search_button form_submit'> Submit </button>
// //                     </div>

// //                 </form>
// //             </section>
// //   )
// // }

// // export default LoginPage

// //-----------------------------------------------------------------------------------------------------------------------------------------

// //handling form using useForm Hook (React Form Hook) 

// // import {useForm} from "react-hook-form"
// // import "./LoginPage.css"


// // const LoginPage = () => {
// //     const {register,handleSubmit,formState:{errors}}= useForm()
// //     return (
// //         <section className="align_center form_page">
// //             <form className="authentication_form" onSubmit={handleSubmit(formData=>console.log(formData))}>
// //                 <h2>Login Form</h2>
// //                 <div className="form_inputs">
// //                     <div>                    
// //                         <label htmlFor="name">Name</label>
// //                         <input type="text" className="form_text_input" id="name" placeholder='Enter Your Name' {...register("name",{required:true,minLength:5})} />
// //                         {errors.name?.type==="required" && <em className="form_error"> Please Enter the name</em>}
// //                         {errors.name?.type==="minLength" && <em className="form_error"> Name should be 3 or more Characters</em>}
                        
// //                     </div>

                    
// //                     <div>
// //                         <label htmlFor="number">Phone Number</label>
// //                         <input type="number" className="form_text_input" id="number" placeholder='Enter Your Phone Number' {...register("phone", {
// //                                 // valueAsNumber: true,
// //                                 required: "Phone number is required",
// //                                 validate: value => !isNaN(value) || "Only numbers are allowed"
// //                                 })}

// //                         />
// //                             {errors.phone?.type==="required" && <em className="form_error">Only Numbers Allowed</em>}
// //                     </div>

// //                     <button type="submit" className='search_button form_submit'> Submit </button>
// //                 </div>

// //             </form>
// //         </section>
// // )
// // }
        

// // export default LoginPage



import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import "./LoginPage.css"
import { getUser, login } from "../../services/userServices"
import { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"


const schema=z.object({
    email:z.string().email({message:"Please enter valid Email Address"}).min(3),
    password:z.string({message:"Password should be atleast 8 characters"}).min(8)
})




const LoginPage = () => {
    const [formError,setformError]=useState("")
    const {register,handleSubmit,formState:{errors}}= useForm({resolver:zodResolver(schema)})
    //useLocation() hook gives all informations about the current page location in object and also state prop we pass from ProtectedRoute.jsx component when navigating to login page using Navigate Component when user is not logged in will ba available in this object, so using object detsructuring , getting state property value.
    const {state} = useLocation()

    // If we use await method for handling promises, then the function using await feature should be async  
    // If we submit the form when using react-hook-form, if no errors in validation, formData will be sent to callback function to handleSubmit Function, here onSubmit is a callback function which run only when form submit ocurs with no validation errors.
    const onSubmit=async (formData)=>{
        // using await method for signup function call because this function returns promise(instead of using .then method, once promise resolved, we got server reponse as token to fdata)

        // For error handling, we are using try catch block, If an error occurs within the try block, control is passed to the catch block. The error parameter in the catch block contains information about the error that was thrown.
        try {
            console.log("here")
            await login(formData)
            
            // when user submits the form once enter login credentials, onSubmit function this try block runs, if there is a state property(that means user try to access protected routes without login,so Navigating to loginpage along with passing state prop as protected route user access without login(by using useLocation()) in Navigate component in ProtectedRoute.jsx component, then we will redirect to the protected route user access without login(using window.location, so full page load refresh occurs).

            // else if there is no state property, it means this login page will be loaded when user is logged in and user try to access /login route page, so home page will be reloaded(using window.location)
            window.location=state? state.from:"/"          
        }
        // this error parameter in catch block contains information about the error that was thrown.  
        catch (err) {
            // checking error response is avaialble and error status is 400
            if(err.response && err.response.status===400)
            {
                console.log(err.response)
                // Using setFormError state updating function, updating the formError state variable to error message, this will cause the component to re render.
                setformError(err.response.data.message)
            }
            
        }
        
        }

    // Also there is a rare scenario, when user tries to access /login page even when user is logged in , so if user is already logged in by checking getUser(), if true, we will Navigate to Home page using Navigate component.
    if(getUser()){
        return <Navigate to="/" />
    }
    return (
        <section className="align_center form_page">
            <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Login Form</h2>
                <div className="form_inputs">
                    <div>
                        <label htmlFor="email">Name</label>
                        <input type="email" className="form_text_input" id="email" placeholder='Enter Your Email ID' {...register("email")} />
                        {errors.email && <em className="form_error"> {errors.email.message}</em>}
                    </div>

                    
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form_text_input" id="password" placeholder='Enter Your Pwd' {...register("password")}/>
                        {errors.password && <em className="form_error">{errors.password.message}</em>}
                    </div>

                    <button type="submit" className='search_button form_submit'> Submit </button>
                </div>
                {formError && <em className="form_error"> {formError}</em>}

            </form>

            
        </section>
    )
}
        

export default LoginPage





