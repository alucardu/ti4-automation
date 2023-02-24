import { User } from "./userTypes";

export type GetSessions = {
  getSessions: Array<Session>
}

export type GetSession = {
  getSession: Session;
}

export type CreateSession = {
  createSession: Session;
}

export type DeleteSession = {
  deleteSession: Session;
}

export type Session = {
  id: number;
  code: string;
  name: string;
  players: Array<User>;
}
