import React from 'react'
import TimerIcon from '@material-ui/icons/Timer';
import moment from 'moment'
function Message({sendMessage}) {
    const msg = sendMessage
    console.log(">>>>>>",msg);
  return (
        <>
          <div className='inner_msg'>
              <p>{msg?.message}</p>
              {/* <span className='time'>{msg?.time} <TimerIcon fontSize='small' /> </span> */}
          </div>
          <div className='at_time'><span>{moment(msg?.createdAt).format('LT')}</span></div>
        </>
    
  )
}

export default Message