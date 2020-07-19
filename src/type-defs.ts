import { gql } from 'apollo-server';

export default gql`
  type Query {
    testMessage: String!
    numberSix: Int!
    numberSeven: Int!
    getNumber(number: Int!): Int!
  }
`;

/**
 * Queries are the basic api type for GraphQL.
 * The name of the query should match the name of the resolver function
 * that it refers to.
 * NAME_OF_QUERY: RETURN TYPE;
 * NAME_OF_QUERY(ARGUMENTS): RETURN TYPE;
 * Explanation points are refered to as required data, whether its Arguments or Returns.
 */
