import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Session } from 'src/types/sessionTypes';
import { User } from 'src/types/userTypes';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session = new ReplaySubject<Session>();
  public session$ = this.session.asObservable();

  private sessionsSubject = new BehaviorSubject<Array<Session> | null>(null);
  public sessions$ = this.sessionsSubject.asObservable();

  public setSession(session: Session): void {
    this.session.next(session)
  }

  public setSessions(sessions: Array<Session>): void {
    this.sessionsSubject.next(sessions)
  }

  public addUserToSession(session: Session, user: User): void {
    this.session.next({
      ...session,
      players: [...session.players, user]
    })
  }
}
