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



export {
  CREATE_SESSION_SUBSCRIPTION,
  DELETE_SESSION_SUBSCRIPTION
}
