import React from 'react'
import socketio from "socket.io-client";
import { observable, Observable } from 'rxjs';
import socketIOClient from "socket.io-client";
import alertify from 'alertifyjs';
const axios = require('axios');

// export const SOCKET_URL = 'https://digitalcms.sundance.org:3000/'
export const SOCKET_URL = 'http://192.168.0.241:3001/'

export const API_URL = 'https://api.themoviedb.org/3/'
export const APIURL = 'https://api.themoviedb.org/'
const API_AUTH = '7c76c45e75dab7d55e14bacabb56a812'


let socket;

export const  Connection = (next) => {
    socket = socketIOClient.connect(SOCKET_URL); 
    // console.log("socket",socket);
    socket.on("connect", (res) => {
      next(socket.connected);
    });
}

export const sendEvent = (e,data) => {
    return socket.emit('request', {event:e,data:data});
}

export const getEvent = (resdata) => {
    return socket.on('response', (data) => {
        resdata(data);
    } );
    
}

export const SucessAlert = (msg) => {
    alertify.success(msg);
}
export const ErrorAlert = (msg) => {
    alertify.error(msg);
}

const api = axios.create({
    baseURL:API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    }
});

// api.defaults.baseURL = 'https://api.covid19api.com/';

const onSuccessLogin = (response) => {
    
    return response.data
}
const onSuccessUser = (response) => {
    return response.data
}
const onSuccessID = (response) => {
    return response.data.guest_session_id
}
const onError = (error) => {
    // debugger
    return error
}

const onSuccessAuth = (response) => {
    // debugger
    return response.data.request_token
}

export const Authentication =  {
    GetreqToken : () => { 
        return api.get(`authentication/token/new?api_key=${API_AUTH}`).then(onSuccessAuth, onError)
    },
    AskUser : (token)=>{
        return api.get(`authenticate/${token}`).then(onSuccessUser, onError)
    },
    SessionId : (KEY)=>{
        return api.get(`authentication/guest_session/new?api_key=${API_AUTH}`).then(onSuccessID, onError)
    },
    SessionLogin:(token)=>{
        return api.get(`search/company?api_key=${API_AUTH}&page=1`).then(onSuccessLogin, onError)
    }
}
