import { gql } from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
export const sessionTypeDefs = gql`
  type User {
    id: ID
    name: String
  }

  type Session {
    id: ID
    code: String
    name: String
    players: [User]
    sessionId: ID
    host: User
  }

  type subscribeToSession {
    session: Session
    user: User
  }

  type sessionDeleted {
    session: Session
    sessions: [Session]
  }

  type Query {
    getSession(code: String!): Session
  }

  type Mutation {
    createSession(name: String!): Session
    connectUserToSession(
      sessionId: ID!
      userId: ID!
      userType: String!
    ): Session
    deleteSession(id: ID!): sessionDeleted
  }

  type Subscription {
    sessionCreated: Session
    sessionDeleted(id: ID!): sessionDeleted
    userJoinedSession(id: ID, name: String): subscribeToSession
  }
`;
