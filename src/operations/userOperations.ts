import { gql } from 'apollo-angular';

const GET_USER = gql`
  query GetUser($id: ID!) {
    createUser(id: $id) {
      id
      name
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`

export default {
  GET_USER,
  CREATE_USER
}
