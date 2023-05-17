import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

const Userside = ({user,borderBottom,borderColor,UserCLick}) => {
    const classes = useStyles();
    console.log('first', user?.userName)
    const Capitalize = user?.userName // ? user?.userName?.toUpperCase() : ''
    return (
        <Box display="flex" className='user_row pointer' onClick={UserCLick} >
            {
                user.isGroup ? <span className={`MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault ${classes.large}`}> <GroupIcon /> </span>: 
                <Avatar alt={Capitalize} src="images/ws.png" className={classes.large} />
            }
            <Box ml={2}  className='w-100' borderBottom={borderBottom} borderColor={borderColor}  >
                <h6 className='m-0'>{user.isGroup ? user?.groupName : user?.userName}</h6>
                <p className='m-0'>Hey There I am using Chat</p>
            </Box>
        </Box>
    )
}

const equalUser = (prevState, nextState) => {
    if(prevState?.user?._id === nextState?.user?._id){
        return true
    }else{
        return false
    }
}


export default React.memo(Userside,equalUser); 
