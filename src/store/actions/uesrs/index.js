import {ADD_USERS} from './../index'
export function addUsers(users) {
    return { 
      type: ADD_USERS,
      payload: users,
    }
}