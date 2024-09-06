import { useForm } from "react-hook-form";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"


import "./SignupPage.css";
import user from "../../assets/user.webp";
import { useState } from "react";
import { getUser, signup } from "../../services/userServices";
import {Navigate} from "react-router-dom"

const schema=z.object({
    name:z.string().min(3,{message:"Name should be at least 3 characters"}),
    email:z.string().email({message:"Please enter valid email ID"}),
    password:z.string().min(8,{message:"Password must be at least 8 characters"}),
    cpassword:z.string(),
    address:z.string().min(15,{message:"Address must be at least 15 characters"})
}).refine(data=>data.password===data.cpassword,{
    message:"confirm password doesnot match password",
    path:["cpassword"]
})




const SignupPage = ({setToken}) => {

    // 
    const [formError,setformError]=useState("")
    const [profilePic,setprofilePic]=useState(null)
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:zodResolver(schema)})

    // If we use await method for handling promises, then the function using await feature should be async  
    // If we submit the form when using react-hook-form, if no errors in validation, formData will be sent to callback function to handleSubmit Function, here onSubmit is a callback function which run only when form submit ocurs with no validation errors.
    const onSubmit=async (formData)=>{
        console.log(formData)
        // using await method for signup function call because this function returns promise(instead of using .then method, once promise resolved, we got server reponse as token to fdata)

        // For error handling, we are using try catch block, If an error occurs within the try block, control is passed to the catch block. The error parameter in the catch block contains information about the error that was thrown.
        try {
            await signup(formData,profilePic)
            window.location="/"
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

    // Also there is a rare scenario, when user tries to access /signup page even when user is logged in , so if user is already logged in by checking getUser(), if true, we will Navigate to Home page using Navigate component.
    if(getUser()){
        return <Navigate to="/" />
    }
    return (
        <section className='align_center form_page'>
            <form className='authentication_form signup_form' onSubmit={handleSubmit(onSubmit)}>
                <h2>SignUp Form</h2>

                <div className='image_input_section'>
                    <div className='image_preview'>
                        <img src={profilePic ? URL.createObjectURL(profilePic) : user} id='file-ip-1-preview' />
                    </div>
                    <label htmlFor='file-ip-1' className='image_label'>
                        Upload Image
                    </label>
                    <input type='file' id='file-ip-1' className='image_input' onChange={e=>setprofilePic(e.target.files[0])} />
                </div>

                {/* Form Inputs */}
                <div className='form_inputs signup_form_input'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter your name'
                            {...register("name")}
                        />
                        {errors.name && <em className="form_error"> {errors.name.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            className='form_text_input'
                            type='email'
                            placeholder='Enter your email address'
                            {...register("email")}
                        />
                        {errors.email && <em className="form_error"> {errors.email.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter your password'
                            {...register("password")}
                        />
                        {errors.password && <em className="form_error"> {errors.password.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input
                            id='cpassword'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter confirm password'
                            {...register("cpassword")}
                        />
                        {errors.cpassword && <em className="form_error"> {errors.cpassword.message}</em>}
                    </div>

                    <div className='signup_textares_section'>
                        <label htmlFor='address'>Delivery Address</label>
                        <textarea
                            id='address'
                            className='input_textarea'
                            placeholder='Enter delivery address'
                            {...register("address")}
                        />
                        {errors.address && <em className="form_error"> {errors.address.message}</em>}
                    </div>
                </div>
                {/* if formError state variable is not null any errors when posting the form data to backend and showing error in <em></em> tag */}
                {formError && <em className="form_error"> {formError}</em>}
                <button className='search_button form_submit' type='submit'>
                    Submit
                </button>
            </form>
        </section>
    );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
