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
const CONNECT_SESSION_HOST = gql`
  mutation connectHostToSession($sessionId: ID!, $userId: ID!) {
    connectHostToSession(sessionId: $sessionId, userId: $userId) {
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

const CONNECT_SESSION_USER = gql`
  mutation connectUserToSession($sessionId: ID!, $userId: ID!) {
    connectUserToSession(sessionId: $sessionId, userId: $userId) {
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
  CONNECT_SESSION_HOST,
  CONNECT_SESSION_USER,
  DELETE_SESSION
}
