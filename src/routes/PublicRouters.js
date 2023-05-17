import React from 'react'
import { Route,Routes,Navigate  } from "react-router-dom";
import Cookies from 'universal-cookie';

function PublicRouters({children}) {
    const cookies = new Cookies();
    let token =  cookies.get('Token');
  return (
    <>
    {   
        token ? <Navigate to='/home/:userId' /> : children           
    }   
    </>
  )
}


export default PublicRouters
