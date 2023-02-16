import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
export const sessionTypeDefs = gql`
  type Session {
    id: ID
    code: String
    name: String
  }

  type Query {
    sessions: [Session]
  }

  type Mutation {
    newSession(name: String!): Session
    removeSession(id: ID!): Session
  }
`;
