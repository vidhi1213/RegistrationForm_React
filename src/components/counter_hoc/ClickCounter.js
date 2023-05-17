import React,{useState,useEffect,useMemo} from 'react';
import UpdateCounter from 'hoc/UpdateCounter';


const ClickCounter = (props) => {
    return (
      <div>
          <h2 onClick={props?.IncreMentCount}> You Clicked {props?.count} Times </h2>
      </div>
    )
}

export default UpdateCounter(ClickCounter)