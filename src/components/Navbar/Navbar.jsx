// importing the useContext function from react libarary
import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LinkWithIcon from './LinkWithIcon'
import "./Navbar.css"
import rocket from "../../assets/rocket.png"
import star from "../../assets/glowing-star.png"
import idButton from "../../assets/id-button.png"
import memo from "../../assets/memo.png"
import order from "../../assets/package.png"
import lock from "../../assets/rocket.png"
// importing the userContext we created to use the context value that we passed for this context in its provider, also navbar.jsx can have access to that conext provider value
import userContext from '../../contexts/userContext';

// importing the userCartContext we created to use the context value that we passed for this context in its provider, also navbar.jsx can have access to that conext provider value
import userCartContext from '../../contexts/userCartContext';
import { getSuggestionAPI } from '../../services/productServices';

// destructuring user and cart prop passed in App.jsx component
const Navbar = () => {

  // defining isSelected state variable and setIsSelected state updating function by calling useState() function with default value as null and using array destructuring storing the state variable and state updating function.
  const [isSelected, setIsSelected]=useState(null)

  // defining selectedIndex state variable and setSelectedIndex state updating function by calling useState() function with default value as -1 and using array destructuring storing the state variable and state updating function.
  const [selectedIndex,setSelectedIndex]=useState(-1)

  // defining suggestions state variable and setSuggestions state updating function by calling useState() function with default value as empty array and using array destructuring storing the state variable and state updating function.
  const [suggestions,setSuggestions]=useState([])

  // defining search state variable and setSearch state updating function by calling useState() function with default value as empty string and using array destructuring storing the state variable and state updating function.
  const [search, setSearch]=useState("")

  // calling the useNavigate Hook , it returns navigate function, storing in navigate variable, using this variable, we can navigate to specified routes E.g navigate("/cart"), it will navigate to respective component for /cart route.
  const navigate=useNavigate()

  // when user type the search text in search box and press enter or click search button under form tag in Navbar.jsx, this onSubmit function triggers.
  // this onSubmit function have event object as e which is givenby form tag(assume like this)
  const handleSubmit=(e)=>{
    // preventing the default behaviour of form which is refreshing the page
    e.preventDefault()
    // fisrt trimming the unwanted spaces if user given in search text and checking if user typed text in search box is not empty, using navigate function we declared above , navigatin to /products?search=user typed search string using template literal
    if(search.trim()!==""){
      // this below line will navigate to respective component for /products route along passing search query
      navigate(`/products?search=${search.trim()}`)
    }
    setSuggestions([])
  }

  // defining the handleSuggestionSelected function which accepts suggestion title user clicked in suggestions box.
  const handleSuggestionSelected=(title)=>{
    // actually we are setting the flag like thing means, using setIsSelected state updating function to set true to make selected state variable true,by this state value, we can identify user clicked the one of the suggestions in suggestion box.
    setIsSelected(true)

    // using setSearch state updating function, we are updating the suggestion user clicked in suggestion box to update in search state variable, because this search state variable will be reflected in search input box.
    setSearch(title)

    //  once user click one of the suggestions, we need to make suggestion box disappear right so making suggestions array empty using setSuggestions state updating function.
    setSuggestions([])
  }

// defining handleKeyDown function and accepting keyboard pressed key event value in input search box
const handleKeyDown=(value)=>{
  // also one issue is there, if user typed search string and suggestion came by calling api, user also reached the last suggestion using down arrow, consider total of 7 suggestions present, user reached last, but without pressing enter, if user type some more text in search box along with old text, suggestion list change, if new suggestion list is greater than old suggestion, selectedIndex is valid and that index will be highlighted in suggestion box with our css styling
  // but if new suggestion list is lesser than old suggestion , selected idex is invalid, no value present for that in suggestions array, so we perform our keyboard events logic below if selectedIndex value for suggestion list is lesser thn asuggestion length , else make selectedIndex to 0, so first item in suggestion list will be highlighted.
  if(selectedIndex < suggestions.length){
    console.log(value)
    // we set selectedIndex value as -1 initially
    // if pressed keyboard event is ArrowDown,use exact string below to match, increasing selectedIndexValue to 1 using setSeletedIndex state updating function.
    // also if user reaches last suggestion in array,implemented condition to make selectedIndex to 0, so if user presses arrow down  keyin last suggestion, first suggestion will be shown
    if(value==="ArrowDown"){
      // using the best approach like calling the callback function inside state updating function which have access to current state value and we acn update the state value, so state update is perfect.
      setSelectedIndex(current=>current===suggestions.length-1 ? 0 : current+1)
    }
    // if pressed keyboard event is ArrowUp,use exact string below to match, decreasing selectedIndexValue to 1 using setSeletedIndex state updating function.
    // also if user reaches first suggestion in array,implemented condition to make selectedIndex to last suggestion, so if user presses arrow up key in first suggestion, last suggestion will be shown  
    else if(value==="ArrowUp"){
      setSelectedIndex(current=>current===0 ? suggestions.length-1 : current-1)
    }
    // if pressed key event is enter, means user selected the suggestion, but selectedIndex should greater than -1,because -1 is not a valid index in suggestions array.
    // But in edge cast without typing anything without suggestion box user may press up arrow and down arrow keys to make selected Index greater than -1 and gave enter , but suggestion array will be empty, because no suggestion box appear without any search string means empty search string , so no api call will happen and suggestions array empty, In this case, suggsetion text will be undefined beacuse no suggestion array, so product page with search string undegined will show nothing empty page. 
    else if(value==="Enter" && selectedIndex > -1){
      // if user search string in search box and after suggestions came, he pressed up or down keys to navigate suggestions and press enter, valid selectedIndex will be set using state updating function , so getting selectedIndex a value in suggsetions array and storing in suggestion variable. 
      const suggestion=suggestions[selectedIndex]
      // using navigate function given by useNavigate() hook, redirect to the below route with passing suggestion clicked by user in search box as search query string.
      // the below line redirect to productPage component(using Routing.jsx) and show products related to search string will be shown using 
      navigate(`/products?search=${suggestion.title}`)
      // actually we are setting the flag like thing means, using setIsSelected state updating function to set true to make selected state variable true,by this state value, we can identify user clicked the one of the suggestions in suggestion box by prssing enter.
      setIsSelected(true)

      // using setSearch state updating function, we are updating the suggestion user clicked in suggestion box by presssing enter to update in search state variable, because this search state variable will be reflected in search input box.
      setSearch(title)

      //  once user click one of the suggestions by pressing enter, we need to make suggestion box disappear right so making suggestions array empty using setSuggestions state updating function.
      setSuggestions([])
    }
  }
  //  if new suggsetion list is lesser than old suggestion list, make selectedIndex to 0 to highlight first value in suggestion list
  else{
    setSelectedIndex(0)
  }
  
}

  // this useEffect will run for first time when component mounts and when there is any change in depenency search given here.
  // also using debouncing concept here in useEffect using setTimeout function, debouncing is a method to delay the execution of a function until after a certain amount of time has passed.
  useEffect(()=>{
    // As we know setTimeout is a asynchronous function, which accepts two parameter, one is a callback function in which we want to give the function logic we want to run and aother parameter is a millisecond, after this amount of millisecond also callback function will run, but it will not block the next lines of code, since it'a asynchronous function(it uses callstack, callback queue, node API event loop,etc. much big topic , explained in node js notes ,check. )
    // so we are calling api for each time when user type text in search box, because each time user search, updating search state variable and useEffect runs due to search is a dependency, api call occur, it leads to decrease the performance of react app, so we are waiting for three seconds before making api call. 
    // But important thing is uasage of clean up function, cleanup function

          // First Render: The cleanup function doesn't run because there is nothing to clean up.
          // Subsequent Renders: When useEffect runs again (due to a change in dependencies like state) and  when the component is no longer in the UI(component unmounts),the cleanup function from the previous render is executed first,that is the cleanup function in useEffect always runs with the state and props values from the previous render, ensuring that the side effect from the last render (last run useEffect) is cleaned up before the new useEffect containing side Effect run.
          // After the cleanup, the new useEffect logic runs with the updated state values.

          // A side effect in React refers to any operation that affects something outside the scope of the component's rendering process. It involves interacting with external systems or changing state that is not directly related to rendering the UI.

          // Common Examples:
          // Data Fetching: Making API calls to retrieve or send data.
          // Event Listeners: Adding event listeners to the DOM (e.g., window or document).
          // Timers: Setting up intervals or timeouts with setInterval or setTimeout.
          // Manipulating the DOM: Directly modifying the DOM elements outside of React's control.



          // useEffect is primarily used for managing side effects, it can also be used for other tasks that need to happen in response to component lifecycle events or changes in state, props, or context. This makes useEffect a versatile tool in React for handling various operations beyond just side effects.
          // The cleanup function in useEffect is only useful if you're performing side effects that need to be undone. If your useEffect is not performing any side effects, then the cleanup function is unnecessary and does not need to be included.


    // The variable delaySuggestions stores the ID of the timer that was created by the setTimeout function. 
    // This timer ID is used by the clearTimeout function in the cleanup to cancel the timeout if useEffect runs again before the timeout completes.
    // If user searches some string, search state updates, this useEffect runs,but after 3 milliseconds, only all logic inside useffect including api call will run, but before 3 milliseconds, if user type another word to search, search state update, this UseEffect triggers,Before running the new effect(usEfect logic again), the cleanup function from the previous render runs first, clearing the previous timeout(3 seconds) using clearTimeout(delaySuggestions).Then, a new timeout(3 seconds) is set up with the updated search value. 
    // so if user typed 'a', useEffect runs after 3 seconds, again user typed b along with a as ab, useEffect rus again agter 3 seconds with search string as "ab".
    // If you have multiple timeouts running simultaneously, each one will execute its logic after its delay. This could lead to multiple, potentially conflicting API calls or actions being triggered, even if they are no longer relevan,cleanup function will prevent this.
    const delaySuggestions=setTimeout(()=>{
      // Note !! - if we try to update search state variable when user clicked suggestion, search state update and this useEffect also runs again after search state update beacause search is a dependency, so 
      // But there is big issue,once user clicked the suggestion in suggestion box, setSearch(title) in handleSuggestionSelected function will set search state to suggestion user clicked and trigger rerender of component, during that rerender this useEffect runs and it calls getSuggestionAPI function and gets only result as exactly user clicked suggestion because we are passing complete search string as suggestion and suggestions state variable will be updated using setSuggestions state updating function, but after the setSearch(title) in handleSuggestionSelected function, setSuggestions([]) will update suggestions to empty array because once user clicked ,suggestion box should dispapear ,so making suggestions array empty.
      // But due to asynchronous nature of state update(that is batching the state update and run on single render to improve performance of app) , setSuggestions(res.data) present below in this useEffect and setSuggestions([]) in handleSuggestionSelected function state updates run by batch in one go 
      // But since setSuggestions(res.data) will run only promise resolve, because its asynchronous function , first setSuggestions([]) execute and setSuggestions(res.data) executing, so if user clicks one of the suggestion in textbox, exact same suggestion alone will come in text box again due to setsuggestion(res.data) executing last, but again if we click that one suggestion in suggestion box, suggestion box disappear, because even if setSearch(title) in handleSuggestionSelected execute , it don't trigger useEffect runs because search string is not yet changed , so not run  then setSuggestions([]) will run and make suggestions array empty, so suggestion box disappear.
      
      // so, In this UseEffect, we check condition like whether isSelected is true, true means either user clicked suggestion by mouse or by keyboard, so run the below logic in if block
      if(isSelected){
        // setting false to selected state variable using setIsSelected state updating function and returning without calling suggestion api, so issue will occur , you know right, explained above and also set state to false, otherwise api will not call for generating sugestions if user searched in search box. 
        setIsSelected(false)
        return 
      }
      // we are trimming any empty spaces in search state variable which contains user typed text in search box and checking if search string is not empty(which means user didn't give search text), doing some logic inside if block
      if(search.trim()!==""){
        // passing the user typed string present in search state variable to getSuggestionAPI function which is present in src->services->productServices.js, this function returns a promise, handling that promise using then catch method.
        getSuggestionAPI(search).
        //if promise returned from function resolves,then block will executed and in this accessing promise resolved data object as res(which contains suggestions of the search string as array of objects which comes from api ) in callback function and  calling setSuggestions(res.data) to update 
        // suggestions array of objects in suggestions state variable. 
        // suggestions array contains all suggestions for search string as array of object ,each object contains suggestion title and id 
        then((res)=>{
          setSuggestions(res.data)
        })
        // if promise returned from function rejects, catch block will executed, accessing err in callback function which contains error object came from api call.
        .catch((err)=>{
          console.log(err)
        })
      }
      // after trimming, if user typed text in search box is empty, calling setSuggestions([]) state updating function to update suggestions state variable as empty array, since user typed no search value, so.
      else{
        console.log("empty string", selectedIndex)
        setSuggestions([])
      }
    },300)

    // cleanup function that clears the timout
    // we use return keyword then callback function to make cleanUp function syntax.
    return ()=>{
    // Clear the timeout to prevent it from executing if 'search' changes within 3 millseconds if user already entered the text to search.
    // or the component unmounts before the timeout completes

    // The variable delaySuggestions having timer ID return from setTimeOut() is used by the clearTimeout function in this cleanup to cancel the timeout if useEffect runs again before the timeout completes.
      clearTimeout(delaySuggestions)
    }
    
  },[search])


  console.log(suggestions)

  //console.log(user)
  // to access value we provided in context provider for useContext we created, calling the useContext function passing userContext we created and stored in user variable, also if we don't provide value for userContext we created in context provider, it will use default value gave in createContext() as null
  const user=useContext(userContext)

  // to access value we provided in context provider for useCartContext we created, calling the useContext function passing userCartContext we created and stored in cart variable, also if we don't provide value for userCartContext we created in context provider, it will use default value gave in createContext() as null and using object destructuring syntax we assign cart variable as cart state object passed in context provider.
  const {cart}=useContext(userCartContext)
  return (
    <nav className="align_center navbar">
        <div className='align_center'>
            <h1 className='navbar_heading'>CartWish</h1>
            <form className='align_center navbar_form' onSubmit={handleSubmit}>
              <input
              type="text"
              className='navbar_search'
              placeholder='Search Products'
              // In this Navbar.jsx component, in this search bar, we set useState search variable value which is empty initially to value attribute in input field 
              value={search}
              // using onChange event listener to trigger setSearch() state updating function to update value user type in the text box in search state variable, user typed value will be available in object named e which will give by input box(assume like this), if any change in input box occurs.
              // onChange event listener will trigger if any change occurs in input box here or where onChange used.
              onChange={(e)=>setSearch(e.target.value)}
              // using onKeyDown event listener to trigger handleKeyDown function ,calling handleKeyDown function using inline arror function to pass keyboard pressed key event value as argument, keyboard pressed key event will be get from event object which will give by input box(assume like this)
              // onKeyDown event listener will trigger if we press any keys when the focus is on input box
              // getting event object as e and passing to handleKeyDown function,we can simply call handleKeyDown also by reference, event object will be accessed inside parameter.
              onKeyDown={(e)=>handleKeyDown(e.key)}
              />
              <button className='search_button' type="submit">
                Search
              </button>
              {/* placing all the suggestion came from api under unordered list and inside <Link> component using map method to place all suggestions and with css styling, it looks like all suggestions in a box,I will refer this as a suggestion box in my code.  */}
              {/* But due to css styling, even if no suggestions, suggestion array is empty, we have small line under serach box, so made condition like if suggsetion list is not empty only, we show suggestion box. */}
              {
                 suggestions.length >0 && 
                 <ul className="search_result">
                  {/* using map method traversing the suggestions array and showing all the suggestions under ordered list <li></li> and inside this giving suggestions title in <Link></Link> component.
                   */}
                  { 
                  // accessing each suggestion object in array and index in callback function of map
                    suggestions.map((suggestion,index)=>
                      // In list tag, we are passing key prop as suggestion id to uniquely identify each item in this list by react.
                      <li className={selectedIndex===index ? "search_suggestion_link active": "search_suggestion_link"} key={suggestion._id}>
                        {/* giving each suggestion object title present in suggestions array inside Link component, in to prop of Link component, giving the route need to redirect if user clicks the suggestion title in suggestions box, as we know already. with Link component , we can redirect to page (route we mentioned in to prop) without page refresh  */}
                        {/* also we are using onClick event listener to trigger handleSuggestionSelected() function when user clicks the suggestion, we are passing suggestion title(means suggestion only) to handleSuggestionSelected function*/}
                        {/* using inline arrow function to call handleSuggestionSelected function with arguments */}
                        {/* this route /products?search=${suggestion.title} will redirects to ProductPage component by checking in Routing.jsx component */}
                        <Link to={`/products?search=${suggestion.title}`} onClick={()=>handleSuggestionSelected(suggestion.title)}> {suggestion.title} </Link>
                      </li>
                    )
                  }
                
                 </ul>
              }
            </form>
        </div>
        <div className='align_center navbar_links'>
            <LinkWithIcon title="Home" link="/" emoji={rocket}/>
            <LinkWithIcon title="Products" link="/products" emoji={star}/> 
            {/* using the user variable we got from context api process */}
            {/* checking if the user is null(no login done), showing login and signup link in navbar.jsx  */}
            {
              !user && 
              <>
                <LinkWithIcon title="LogIn" link="/login" emoji={idButton}/>
                <LinkWithIcon title="SignUp" link="/signup" emoji={memo}/>
              </>
            }
            {/* using the user variable we got from context api process */}
            {/* checking if the user is not null(login done), showing My Orders and login page in navbar.jsx  */}
            {
              user &&
              <>
                <LinkWithIcon title="My Orders" link="/myorders" emoji={order}/>
                <LinkWithIcon title="LogOut" link="/logout" emoji={lock}/>
                <NavLink to="/cart" className="align_center">
                    Cart
                    {/* Using cart variable we got from context api process*/}
                    {/* showing cart length which is present in cart state in navbar, each time when cart count increases */}
                    <p className='align_center cart_counts'>{cart.length}</p> 
                </NavLink>
              </>
            }

            
        </div>
            

    </nav>
  )
}

export default Navbar
