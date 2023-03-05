import { gql } from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
export const messageTypeDefs = gql`
  type Message {
    id: ID
    message: String
    user: User
  }

  type Session {
    id: ID
    code: String
    name: String
    players: [User]
    sessionId: ID
    host: User
  }

  type sessionMessage {
    message: Message
    session: Session
  }

  type Query {
    getMessages(sessionId: ID!): [Message]
  }

  type Mutation {
    createMessage(sessionId: ID!, userId: ID!, message: String!): Message
  }

  type Subscription {
    userSendMessage(id: ID, name: String): sessionMessage
  }
`;
