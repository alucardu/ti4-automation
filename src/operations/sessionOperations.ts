import { gql } from 'apollo-angular';

const GET_SESSION = gql`
  query GetSession($code: String!) {
    getSession(code: $code) {
      id
      code
      name
      players {
        id
        name
      }
    }
  }
`

const GET_SESSIONS = gql`
  query GetSessions {
    getSessions {
      id
      code
      name
    }
  }
`

const CREATE_SESSION = gql`
  mutation CreateSession($name: String!) {
    createSession(name: $name) {
      id
      code
      name
      players {
        id
        name
      }
    }
  }
`

const DELETE_SESSION = gql`
  mutation DeleteSession($id: ID!) {
    deleteSession(id: $id) {
      id
      name
    }
  }
`;

const CREATE_SESSION_SUBSCRIPTION = gql`
  subscription sessionCreated {
    sessionCreated {
      id
      name
      code
      players {
        id
        name
      }
    }
  }
`;

export default {
  GET_SESSION,
  GET_SESSIONS,
  CREATE_SESSION,
  DELETE_SESSION,
  CREATE_SESSION_SUBSCRIPTION
}
