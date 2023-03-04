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

export {
  GET_SESSION,
}
