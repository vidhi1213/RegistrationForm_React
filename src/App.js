import React,{Suspense,useEffect,useState,Profiler} from 'react';
import 'alertifyjs/build/css/alertify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Connection,sendEvent} from 'services/apiservices'
import Cookies from 'universal-cookie';
import Routers from 'routers'

const Header = React.lazy(() => import('components/header/header'));

function App() {
  const [isSocketConnected,setisSocketConnected] = useState(false)
  const cookies = new Cookies();

  useEffect(() => {
    Connection((next) => {
      if(next){
        setisSocketConnected(true)
        let auth = { token: cookies.get('Token')}
        if(auth) sendEvent('authentication',auth)
      }
    })
  },[]);

const callback= ( id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
  // console.log("id",id);
  // console.log("phase",phase);
  // console.log("actualDuration",actualDuration);
  // console.log("baseDuration",baseDuration);
  // console.log("startTime",startTime);
  // console.log("commitTime",commitTime);
  // console.log("interactions",interactions);
}

  return (
    <Profiler id="Navigation" onRender={callback}>
      <BrowserRouter>
        {/* {isSocketConnected ?  */}
          <Suspense fallback={<div>Loading...</div>}>
            {/* <Header /> */}
              <Routers /> 
          </Suspense>
        {/* :'Loading...'
       }   */}
      </BrowserRouter>
      </Profiler>
  );
}

export default App;
