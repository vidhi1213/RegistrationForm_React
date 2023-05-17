import React,{useEffect, useState} from 'react'
import { Route,Routes } from "react-router-dom";
import Cookies from 'universal-cookie';
import  {useParams, useNavigate} from "react-router-dom";

import PrivateRouters from 'routes/PrivateRouters';
import PublicRouters from 'routes/PublicRouters';

const Login = React.lazy(() => import('pages/auth/Login'));
const Register = React.lazy(() => import('pages/auth/Register'));
const ListPage = React.lazy(() => import('pages/list'));
const SearchPage = React.lazy(() => import('pages/search'));
const YelpSearch = React.lazy(() => import('pages/yelpsearch'));
const Step = React.lazy(() => import('pages/auth/step')); 
const MainLayout = React.lazy(() => import('pages/MainLayout'));
const Home = React.lazy(() => import('pages/Home'));
const HocPage = React.lazy(() => import('pages/HocPage'));
const NotFound = React.lazy(() => import('pages/NotFound'));



export default function Routers() {
    return (
    <>
     
        <Routes> 
            <Route path="/" element={<PublicRouters ><ListPage /> </PublicRouters>}></Route>
            <Route path="/hoc" element={<PublicRouters ><HocPage /> </PublicRouters>}></Route>
            {/* <PublicRouters path="/news/:type" element={<ListPage />}></PublicRouters>

            <PublicRouters path="/search" element={<SearchPage />}></PublicRouters>

            <PublicRouters path="/yelpsearch" element={<YelpSearch />} />
            
            <PublicRouters path="/step" element={<Step />} /> */}
     
            <Route path="/home" element={ <PrivateRouters > <Home  /> </PrivateRouters> } />
            <Route path="/home/:userId" element={ <PrivateRouters > <Home  /> </PrivateRouters>} />
            <Route path="/login" element={ <PublicRouters ><Login  /> </PublicRouters>} />
            <Route path="/register" element={ <PublicRouters ><Register  /> </PublicRouters>} />
            <Route path='*' element={ <PublicRouters > <NotFound /> </PublicRouters>} />
        </Routes>

        </>
    )
}
