import React from 'react';
// Either use a config file or env file
// import { API_URL, HOME_PAGE_URL, GRAPHQL_URL,GRAPHQL_WS_URL } from 'config';

const initialCtx = {
    NetworkCtx: {
        // apiUrl: API_URL, 
        // token: null, 
        // homePage: HOME_PAGE_URL,
        graphqlUrl: 'http://3.141.17.227:3001/graphql',
        graphqlWsUrl: 'ws://3.141.17.227:3001'
    },
    setNetworkCtx: () => null
}

export const NetworkContext = React.createContext(initialCtx);

export const NetworkConsumer = NetworkContext.Consumer;

export const NetworkProvider = (props) => {

    const [NetworkCtx, setNetworkCtx] = React.useState(initialCtx.NetworkCtx);

    //token

    //check network availability

    return (
        <NetworkContext.Provider value={{ NetworkCtx, setNetworkCtx }} >
            {props.children}
        </NetworkContext.Provider>
    )
};