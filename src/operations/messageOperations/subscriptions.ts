import { gql } from 'apollo-angular';

const USER_SEND_MESSAGE = gql`
  subscription UserSendMEssage($id: ID, $name: String) {
    userSendMessage(id: $id, name: $name) {
      session {
        id
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
      message {
        id
        message
        user {
          id
          name
        }
      }
    }
  }
`;

export { USER_SEND_MESSAGE };
