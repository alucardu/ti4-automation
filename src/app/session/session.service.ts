import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import * as sessionType from 'src/types/sessionTypes';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private subject = new ReplaySubject<sessionType.Session>();
  public session$ = this.subject.asObservable();

  constructor() { }

  public setSession(session: sessionType.Session) {
    this.subject.next(session)
  }
}
