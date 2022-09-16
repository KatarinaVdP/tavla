import { split, HttpLink, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const CLIENT_NAME = process.env.CLIENT_NAME || ''

if (!CLIENT_NAME && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(
        'CLIENT_NAME is missing! Please set a client name in your environment config.',
    )
}
const httpLink = new HttpLink({
    uri:
        process.env.VEHICLES_REALTIME_HOST ??
        'https://api.entur.io/realtime/v1/vehicles/graphql',
})

const wsLink = new WebSocketLink({
    uri:
        process.env.VEHICLES_REALTIME_SUBSCRIPTIONS_HOST ??
        'wss://api.entur.io/realtime/v1/vehicles/subscriptions',
    options: {
        reconnect: true,
    },
})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink,
)

  const mobilityLink = new HttpLink({
    uri: 'https://api.staging.entur.io/mobility/v2/graphql',
    headers: {
        'ET-Client-Name': CLIENT_NAME,
    },
    // other link options...
  });
  
  const vehiclesLink = new HttpLink({
    uri: 'https://api.staging.entur.io/realtime/v1/vehicles/graphql',
    headers: {
        'ET-Client-Name': CLIENT_NAME,
    },
        // other link options...
  });
  
export const realtimeVehiclesClient = new ApolloClient({
    link: ApolloLink.split(
        operation => operation.getContext().endPoint === "mobility",
        mobilityLink,
        vehiclesLink
    ),
    
    cache: new InMemoryCache({
        addTypename: false,
    }),
})
