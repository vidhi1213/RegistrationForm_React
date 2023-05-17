import React,{useState,useEffect,useMemo} from 'react';
import axios from "axios";
import {SOURCEURL,BASEURL} from './constant'


export function useDebouncedValue(value, wait) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const id = setTimeout(() => setDebouncedValue(value), wait);
      return () => clearTimeout(id);
    }, [value]);
    return debouncedValue;
}

export const api = axios.create();
api.defaults.baseURL = BASEURL;


export const onSuccess = (response) =>{
    let data = response.data
    return response
}

export const onError = (error) => {
    return error
}

export const getData = (arr) => {
   return arr.map(async(item) => { api.get(`/item/${item}.json?print=pretty`).then(onSuccess,onError) })
}

export const GetNews = {
    InitialNews : (catrgory) => {
        console.log("??? cat call",catrgory);
        return api.get(`${catrgory}.json`).then(onSuccess,onError)
    },
    getDeatils : (arr) => {
        return arr.map(item => {
            return  api.get(`/item/${item}.json`).then(onSuccess,onError) 
        })
    }
}

export const TestDebouncing = () => {
    return axios.get('https://jsonplaceholder.typicode.com/albums').then(onSuccess,onError)
}

// Search NPM packages
export const Searchpackage = (text,size,from) => {
    console.log("text",text,"size",size,"from",from)
    return axios.get(`https://registry.npmjs.org/-/v1/search?text=${text||'react-table'}&size=${size}&from=${from}`).then(onSuccess,onError)
}

// Yelp Search Business
const config = {
    headers: {
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${'B-SrrFMteVE8e7t1YCnfYoOZiKzTqAaTyNbK-AYmgoNj_LtuZHIBdu6INuON_Fs0OXJPPE-HRD-jOJSLVSZ_iw5KuXLd5JBVIscrMy36NJQNEPdiQ7CNz-TJGYbzYXYx'}`,
    }
}

const yelpapi = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/`

export const BusinessApi = {
    AutoComplite : (text,lat,lon) => {
        return axios.get(`${yelpapi}autocomplete?text=${text}&latitude=37.786942&longitude=-122.399643`,config).then(onSuccess,onError)
    },
    SearchBsiness:(text,lat,lon) => {
        return axios.get(`${yelpapi}businesses/search?term=${text}&latitude=37.786942&longitude=-122.399643`,config).then(onSuccess,onError)
    }
}



