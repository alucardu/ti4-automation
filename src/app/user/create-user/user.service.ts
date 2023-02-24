import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/types/userTypes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private subject = new BehaviorSubject<User | null>(null);
  public user$ = this.subject.asObservable();

  public setUser(user: User): void {
    this.subject.next(user);
  }
}
