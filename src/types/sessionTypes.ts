import { User } from "./userTypes";

// TYPES
export type Session = {
  id: number;
  code: string;
  name: string;
  players: Array<User>;
  userId: number;
  host?: User;
}

// QUERIES
export type GetSession = {
  getSession: Session;
}

// MUTATIONS
export type CreateSession = {
  createSession: Session;
}

export type ConnectUserToSession = {
  connectUserToSession: Session
}

export type DeleteSession = {
  deleteSession: {
    session: Session
    sessions: Array<Session>
  }
}

// SUBSCRIPTIONS
export type SessionCreated = {
  sessionCreated: Session;
}

export type SessionDeleted = {
  sessionDeleted: {
    session: Session
    sessions: Array<Session>
  };
}

export type UserJoinedSession = {
  userJoinedSession: {
    user: User
    session: Session
  }
}
