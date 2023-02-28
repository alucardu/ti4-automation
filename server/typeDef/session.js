import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
export const sessionTypeDefs = gql`
  type User {
    id: ID,
    name: String
  }

  type Session {
    id: ID
    code: String
    name: String
    players: [User]
  }

  type Query {
    getSession(code: String!): Session
    getSessions: [Session]
  }

  type Mutation {
    createSession(name: String!): Session
    deleteSession(id: ID!): Session
  }

  type Subscription {
    sessionCreated: Session
  }
`;
