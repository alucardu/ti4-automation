import { gql } from 'apollo-angular';

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
    }
  }
`
export default {
  CREATE_MESSAGE
}
