import { User } from "./userTypes";

// TYPES
export type Session = {
  id: number;
  code: string;
  name: string;
  players: Array<User>;
}

// QUERIES
export type GetSessions = {
  getSessions: Array<Session>
}

export type GetSession = {
  getSession: Session;
}

// MUTATIONS
export type CreateSession = {
  createSession: Session;
}

export type DeleteSession = {
  deleteSession: Session;
}

// SUBSCRIPTIONS
export type SessionCreated = {
  sessionCreated: Session;
}
