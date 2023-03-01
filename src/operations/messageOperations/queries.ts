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

export {
  GET_MESSAGES
}
