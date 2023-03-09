import { gql } from 'apollo-angular';

const USER_CREATED_SUBSCRIPTION = gql`
  subscription userCreated($id:ID, $name: String) {
    userCreated(id: $id, name: $name) {
      id
      name
    }
  }
`;

const USER_DELETED_SUBSCRIPTION = gql`
  subscription userDeleted($id: ID) {
    userDeleted(id: $id) {
      id
      name
    }
  }
`;

export {
  USER_CREATED_SUBSCRIPTION,
  USER_DELETED_SUBSCRIPTION
};
