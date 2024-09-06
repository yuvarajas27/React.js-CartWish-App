// importing createContext function from react library
import { createContext} from "react";

// creating the context using createContext and passing a default value as null and storing in a userCartContext variable(its convention to use context name itself to store createContext function value, but we can use anything)
/* 
    Important tip : 
    1.we can also provide default value as string , number, boolean, object or anything and if we don't pass value in context provider for the context, defualt value provided here will be used, if we provide value prop,values in prop will be over ridden by default values
    (E.g <userCartContext.Provider> 

        <userCartContext.Provider>
    )

    2.Also, without providing the context for the context we created, still we can import the create context variable we created using createContext() in the component we need and use useContext() to access default values

*/
const userCartContext=createContext(null)

// exporting the userCartContext we created as default
export default userCartContext

