import React,{useState,useEffect,useMemo} from 'react';

const  UpdateCounter = (Component) => {
    const  PageWrapper = () => {
        const [count, setcount] = useState(0)
        const IncreMentCount = () => {
            return setcount(count + 1)
        }
        return  <Component count={count} IncreMentCount={IncreMentCount} />
    }
    return PageWrapper
}

export default UpdateCounter