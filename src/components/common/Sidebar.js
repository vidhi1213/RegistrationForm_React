import React, {useEffect,useState} from 'react'
import Userside from 'components/chat/Userside'
import { useNavigate,useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {sendEvent, getEvent, SucessAlert, ErrorAlert} from 'services/apiservices'


let sub;
export default function Sidebar({userlists}) {
    let { userId } = useParams();    
    const [userlist, SetUserList] = useState([])
    const [receverId,SetReceverId] =  useState ('')
    const [welcome, SetWelcome] = useState(true)        

    const senderId = useSelector(state => state?.users?.senderId);
    const [sideActive,SetSideActive] = useState()

    let navigate = useNavigate();

    useEffect(() => {
        // let EmptyData = { userId:senderId }
        // sendEvent('chatDemo|getAllUsersList', EmptyData)

        sub = getEvent(data => {
            switch (data.event) {
                case 'chatDemo|getAllUsersList':
                    if(!data.error){
                        SetUserList(data?.data?.docs);
                    }
                    break;
                default:
                    break;
            }
        })

    }, [])

    const UserCLick = (e,user) => {
        e.preventDefault()
        SetReceverId(user?._id)
        navigate(`/home/${user?._id}`);
    }

  return (
    <div className='side_bar'>
        {
            userlist?.map((user, i) => {
                return  <Userside key={i} user={user}  borderBottom={1} borderColor="grey.300" UserCLick={(e) => UserCLick(e,user)} />
            })
        }
    </div>
  )
}
