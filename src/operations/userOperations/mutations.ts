import { gql } from 'apollo-angular';

const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $sessionId: ID
  ) {
    createUser(
      name: $name
      sessionId: $sessionId
    ) {
      id
      name
    }
  }
`

export {
  CREATE_USER
}
