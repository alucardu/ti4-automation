import { gql } from 'apollo-angular';

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

const DELETE_SESSION_SUBSCRIPTION = gql`
  subscription sessionDeleted(
    $id: ID!
  ) {
    sessionDeleted(
      id: $id
    ) {
      session {
        name
      }
      sessions {
        id
        name
        code
        players {
          id
          name
        }
      }
    }
  }
`;

const USER_JOINED_SESSION = gql`
  subscription UserJoinedSession(
    $id: ID
    $name: String
  ) {
    userJoinedSession(
      id: $id
      name: $name
    ) {
      session {
        id
        name
        code
        host {
          id
          name
        }
        players {
          id
          name
        }
      }
      user {
        id
        name
      }
    }
  }
`;


export {
  CREATE_SESSION_SUBSCRIPTION,
  DELETE_SESSION_SUBSCRIPTION,
  USER_JOINED_SESSION
}
