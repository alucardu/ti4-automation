import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
export const sessionTypeDefs = gql`
  type Session {
    id: ID
  }

  type Query {
    sessions: [Session]
  }

  type Mutation {
    newSession: Session
    removeSession(id: ID!): Session
  }
`;
