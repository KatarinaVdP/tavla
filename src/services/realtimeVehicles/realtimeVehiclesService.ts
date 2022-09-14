import { split, HttpLink, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { apolloClient, apolloMobilityClient } from '../../service'

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

/* const client = new ApolloClient({
    link: ApolloLink.split(
      operation => operation.getContext().clientName === "third-party",
      // the string "third-party" can be anything you want,
      // we will use it in a bit
      thirdPartyLink, // <= apollo will send to this if clientName is "third-party"
      myLink // <= otherwise will send to this
    )
    // other options
  });
 */

  const mobilityLink = new HttpLink({
    uri: 'https://api.staging.entur.io/mobility/v2/graphql',
    // other link options...
  });
  
  const vehiclesLink = new HttpLink({
    uri: 'https://api.staging.entur.io/realtime/v1/vehicles/graphql',
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
