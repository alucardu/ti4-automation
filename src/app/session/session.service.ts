import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Session } from 'src/types/sessionTypes';
import { User } from 'src/types/userTypes';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private subject = new ReplaySubject<Session>();
  public session$ = this.subject.asObservable();

  public setSession(session: Session): void {
    this.subject.next(session)
  }

  public addUserToSession(session: Session, user: User): void {
    this.subject.next({
      ...session,
      players: [...session.players, user]
    })
  }
}
