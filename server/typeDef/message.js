import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
export const messageTypeDefs = gql`
  type Message {
    id: ID,
    message: String
    user: User
  }

  type Query {
    getMessages(
      sessionId: ID!
    ): [Message]
  }

  type Mutation {
    createMessage(
      sessionId: ID!
      userId: ID!
      message: String!
    ): Message
  }
`;
