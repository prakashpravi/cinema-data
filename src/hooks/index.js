import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink,InMemoryCache,ApolloClient,split,ApolloLink } from 'apollo-boost';
const config = 'http://3.141.17.227:3001/graphql'
const localStorageKeys = {
    auth_token:'auth_token'
}
const httpLink = new HttpLink({ uri: config })

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const tokenValue = localStorage.getItem(localStorageKeys.auth_token)
  // return the headers to the context so httpLink can read them
  operation.setContext({  
    headers: { 
      Authorization: tokenValue ? `Bearer ${tokenValue}` : '',
    },   
  }) 
  return forward(operation) 
})

// authenticated httplink
const httpLinkAuth = middlewareLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri:'ws://3.141.17.227:3001',
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem(localStorageKeys.auth_token)}`,
    },
  },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLinkAuth,
)

// apollo client setup
const ApolloGQLClient = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

export default ApolloGQLClient;