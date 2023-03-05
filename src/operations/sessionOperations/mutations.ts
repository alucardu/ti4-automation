import { gql } from 'apollo-angular';

const CREATE_SESSION = gql`
  mutation CreateSession($name: String!) {
    createSession(name: $name) {
      id
      code
      name
      host {
        id
        name
      }
      players {
        id
        name
      }
    }
  }
`

const CONNECT_SESSION_USER = gql`
  mutation connectUserToSession(
    $sessionId: ID!,
    $userId: ID!
    $userType: String!
  ) {
    connectUserToSession(
      sessionId: $sessionId,
      userId: $userId
      userType: $userType
    ) {
      id
      code
      name
      players {
        id
        name
      }
      host {
        name
        id
      }
    }
  }
`

const DELETE_SESSION = gql`
  mutation DeleteSession($id: ID!) {
    deleteSession(id: $id) {
      session {
        id
        name
      }
      sessions {
        id
        name
      }
    }
  }
`;

export {
  CREATE_SESSION,
  CONNECT_SESSION_USER,
  DELETE_SESSION
}
