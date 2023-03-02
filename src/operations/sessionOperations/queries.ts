import { gql } from 'apollo-angular';

const GET_SESSION = gql`
  query GetSession($code: String!) {
    getSession(code: $code) {
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

const GET_SESSIONS = gql`
  query GetSessions {
    getSessions {
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

export {
  GET_SESSION,
  GET_SESSIONS,
}
