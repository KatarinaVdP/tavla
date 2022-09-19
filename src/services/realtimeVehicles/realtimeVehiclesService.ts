import {
    HttpLink,
    ApolloClient,
    InMemoryCache,
    ApolloLink,
} from '@apollo/client'

const CLIENT_NAME = process.env.CLIENT_NAME || ''

if (!CLIENT_NAME && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(
        'CLIENT_NAME is missing! Please set a client name in your environment config.',
    )
}

const mobilityLink = new HttpLink({
    uri: 'https://api.staging.entur.io/mobility/v2/graphql',
    headers: {
        'ET-Client-Name': CLIENT_NAME,
    },
    // other link options...
})

const vehiclesLink = new HttpLink({
    uri: 'https://api.staging.entur.io/realtime/v1/vehicles/graphql',
    headers: {
        'ET-Client-Name': CLIENT_NAME,
    },
    // other link options...
})

export const realtimeVehiclesClient = new ApolloClient({
    link: ApolloLink.split(
        (operation) => operation.getContext().endPoint === 'mobility',
        mobilityLink,
        vehiclesLink,
    ),

    cache: new InMemoryCache({
        addTypename: false,
    }),
})
