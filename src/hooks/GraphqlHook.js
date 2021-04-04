import React from 'react';
import { createApolloFetch } from 'apollo-fetch';
import { NetworkContext } from './NetworkContext';

export const useGraphql = (query, mapper, variables = {}, initRequest = false) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [data, setData] = React.useState({});
    const [isFetched, setIsFetched] = React.useState(false);
    const [mappedData, setMappedData] = React.useState({});
    const { NetworkCtx: { graphqlUrl: uri, cdnUrl } } = React.useContext(NetworkContext);
    const client = createApolloFetch({ uri });

    const makeRequest = (reqvars, newquery) => {
        setIsFetched(false);
        let assign = newquery ? newquery : query;
        client({ query: assign, variables: { ...variables, ...reqvars } }).then(resdata => {
            setLoading(false); 
            setError(false);
            setData(resdata);

            if (mapper && data && typeof (mapper) === "function") {
                try {
                    let mapped = mapper(data, cdnUrl);
                    setMappedData(mapped);

                } catch (error) {
                    console.error('MAPPER ERROR', error);
                    setError(true);
                    setMappedData({});
                }
            }

        }).catch(err => {
            setLoading(false);
            setError(true);
            setData([]);
            setMappedData([]);
        })
    }


    React.useEffect(() => {
        if (initRequest) { makeRequest(); }
    });

    React.useEffect(() => {
        setIsFetched(true);
    }, [mappedData]);

    return { error, loading, data, isFetched, mappedData, makeRequest }
}