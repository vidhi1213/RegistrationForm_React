import React,{useState,useEffect,useMemo} from 'react';
import Container from '@material-ui/core/Container';
import Hovercounter from 'components/counter_hoc/Hovercounter'
import ClickCounter from 'components/counter_hoc/ClickCounter'
import UpdateCounter from 'hoc/UpdateCounter';


function HocPage() {
  return (
    <Container maxWidth="lg"> 
        <div>HocPage</div>
        {/* <UpdateCounter >  */}
            <ClickCounter />
            <Hovercounter />
        {/* </UpdateCounter> */}
    </Container>
  )
}

export default HocPage