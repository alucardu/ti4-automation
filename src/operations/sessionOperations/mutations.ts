import { gql } from 'apollo-angular';

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

export {
  CREATE_SESSION,
  DELETE_SESSION
}
