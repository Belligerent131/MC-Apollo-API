import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag';

export const serverInfo = new GraphQLModule({
    typeDefs: gql`
        type Query {
            helloWorld: String!
        }
    `,

    resolvers: {
        Query: {
            helloWorld() {
                return "Hello World!"
            }
        }
    }
})