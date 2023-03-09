import { gql } from 'apollo-angular';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $sessionId: ID) {
    createUser(name: $name, sessionId: $sessionId) {
      id
      name
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;

export { CREATE_USER, DELETE_USER };
