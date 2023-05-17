import React,{useState,useEffect,useMemo} from 'react';
import UpdateCounter from 'hoc/UpdateCounter';

const Hovercounter = (props) => {
  return (
    <div>
        <h2 onMouseOver={props?.IncreMentCount}>You Hover {props?.count} Times</h2>
    </div>
  )
}

export default UpdateCounter(Hovercounter)