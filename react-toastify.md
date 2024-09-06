/\*\*

- Toast Notifications Summary
-
- 1.  **No Re-render Needed**:
- - Toast notifications do not require re-rendering of components to be displayed.
- - The toast library handles the display of notifications independently of the component's render cycle.
-
- 2.  **<ToastContainer>**:
- - This component can be placed anywhere in your component tree.
- - Acts as the central location for rendering toast notifications.
- - You can set the position of the toast container using the `position` prop.
-
- 3.  **Triggering Toasts**:
- - Use methods like `toast.success()`, `toast.error()`, etc., to show notifications.
- - The library manages the display by updating its internal state and manipulating the DOM directly.
-
- 4.  **CSS Nature**:
- - React-Toastify uses built-in CSS for styling the toasts.
- - Import `react-toastify/dist/ReactToastify.css` to apply default styles.
-
- 5.  **Positioning Toasts**:
- - Toast notifications can be positioned using the `position` option in toast methods.
- - Common positions include `toast.POSITION.TOP_LEFT`, `toast.POSITION.TOP_RIGHT`, `toast.POSITION.BOTTOM_LEFT`, `toast.POSITION.BOTTOM_RIGHT`, and `toast.POSITION.BOTTOM_CENTER`.
- - You can also set the position of the entire ToastContainer using the `position` prop.
-
- Example of changing position in toast methods:
- ```javascript

  ```
- toast.success("Product Added to cart Successfully", {
- position: toast.POSITION.BOTTOM_CENTER // Change position as needed
- });
- ```

  ```
-
- Example of setting position for ToastContainer:
- ```javascript

  ```
- <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
- ```
  */
  ```
