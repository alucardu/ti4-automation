import { gql } from 'apollo-angular';

const GET_MESSAGES = gql`
  query GetMessages(
    $sessionId: ID!
  ) {
    getMessages(
      sessionId: $sessionId
    ) {
      message
      user {
        id
        name
      }
    }
  }
`

const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $sessionId: ID!
    $userId: ID!
    $message: String!
  ) {
    createMessage(
      sessionId: $sessionId
      userId: $userId
      message: $message
    ) {
      message
      user {
        id
        name
      }
    }
  }
`
export default {
  CREATE_MESSAGE,
  GET_MESSAGES
}
