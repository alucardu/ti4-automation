import { gql } from 'apollo-angular';

const GET_USER = gql`
  query GetUser($id: ID!) {
    createUser(id: $id) {
      id
      name
    }
  }
`

export {
  GET_USER,
}
