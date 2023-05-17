import React from 'react'
import { Route, Navigate  } from "react-router-dom";
import Cookies from 'universal-cookie';


const PrivateRouters = ({children}) =>  {
    const cookies = new Cookies();
    return (
        <>
        {   
            !cookies.get('Token') ? <Navigate to='/' /> : children     
        }   
        </>
       
    )
}


export default PrivateRouters
