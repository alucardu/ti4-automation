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
  subscription sessionDeleted {
    sessionDeleted {
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
