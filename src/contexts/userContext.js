// importing createContext function from react library
import { createContext } from "react";

// creating the context using createContext and passing a default value as null and storing in a userContext variable(its convention to use context name itself to store createContext function value, but we can use anything)
const userContext=createContext(null) 


// exporting the userContext we created as default
export default userContext