import {ADD_USERS,UPDATE_USERS,DELETE_USERS,REMOVEMULTIPLE_USERS, SET_ALL_USERS, SET_SENDER_ID} from './../../actions/index'

const initialState = {
    users: [],
    senderId:''
}

export default function addusers(state = initialState, action) {
    switch (action.type) {
        case ADD_USERS:
          return {
            ...state,
            users: [...state.users, action.users]
          }
        case SET_ALL_USERS:
          return {
            ...state,
            users: action.users
          }
        case UPDATE_USERS:
          const updateUser=state.users.map((item)=>{return item.id=== action.id ? action.users : item})
           return {
               ...state,
               users:updateUser
           } 
        case DELETE_USERS:
          const deleteUser=state.users.filter((item) =>  item.id !== action.id )
           return {
               ...state,
               users:deleteUser
           }
        case REMOVEMULTIPLE_USERS:
            const removeUser = state.users.filter((val) =>  val.check === false )
           return {
               ...state,
               users:removeUser
           }
        case SET_SENDER_ID:
          return{
            ...state,
            senderId:action.sendId
          }   
        default:
          return state
      }
}