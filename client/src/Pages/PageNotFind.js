 import React from 'react'
import { Link } from 'react-router-dom'
 
 const PageNotFind = () => {
   return (
     <div>
          <h1>PageNotFound</h1>
          <h3>go to the 
               <Link to={"/"}>Home Page</Link>
          </h3>
     </div>
   )
 }
 
 export default PageNotFind