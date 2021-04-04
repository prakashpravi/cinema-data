import Axios from "axios"
// import { localStorageKeys, netWorkCallMethods } from "../utils";
const netWorkCallMethods = {
    get:'GET',
    post:'POST',
    put:'PUT',
    delete:'DELETE',
    update:'UPDATE'
}
const localStorageKeys = { 
    auth_token:'auth_token'
}
export const networkCall = (url, method, body, headers,isAuthorized=false) => {

    //Check for URL,method,body
    if(!url && !method){
        return Promise.reject({message:"URL and HTTP Method is not mentioned."})
    }

    //Check for proper URL
    if(url){
        const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const regex = new RegExp(expression);

        if(!url.match(regex)){
            return Promise.reject({message:"Malformed URL, Please check"})
        }
    }

    //Check for body of the POST method
    if(method && method === netWorkCallMethods.post && !body){
        return Promise.reject({message:"POST method must contain Request Body."})
    }

    //Checking the Internet connection
    if(!navigator.onLine){
        return Promise.reject({message:"Unable to connect with Internet!"});
    }

    //Initializing the header
    let newHeader = headers;

    //Adding Authorization to headers if it is requested
    if(isAuthorized){
        newHeader = {
            ...headers,
            Authorization: localStorageKeys.auth_token
        }
    }

    return Axios({
        method: method,
        url: url,
        data: body,
        headers: newHeader
    });
}