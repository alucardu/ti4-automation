import { gql } from 'apollo-angular';

const GET_SESSIONS = gql`
  query GetSessions {
    sessions {
      id
      code
      name
    }
  }
`

const NEW_SESSION = gql`
  mutation NewSession($name: String!) {
    newSession(name: $name) {
      id
      code
      name
    }
  }
`

const REMOVE_SESSION = gql`
  mutation RemoveSession($id: ID!) {
    removeSession(id: $id) {
      id
    }
  }
`;

export default {
  GET_SESSIONS,
  NEW_SESSION,
  REMOVE_SESSION
}
