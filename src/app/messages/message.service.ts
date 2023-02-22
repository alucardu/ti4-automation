import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'src/types/messageTypes';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new BehaviorSubject<Array<Message>>([])
  public messages$ = this.subject.asObservable();

  public setMessages(messages: Array<Message>): void {
    this.subject.next(messages)
  }

  public setMessage(message: Message): void {
    this.subject.next([...this.subject.value, message])
  }
}
