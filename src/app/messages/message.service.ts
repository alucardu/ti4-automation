import { Injectable } from '@angular/core';
import { Session } from '@prisma/client';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { USER_SEND_MESSAGE } from 'src/operations/messageOperations/subscriptions';
import { Message, UserSendMessage } from 'src/types/messageTypes';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<Array<Message>>([])
  public messages$ = this.messageSubject.asObservable();


  constructor(
    private apollo: Apollo,
  ) {}

  public setMessages(messages: Array<Message>): void {
    this.messageSubject.next(messages)
  }

  public setMessage(message: Message): void {
    this.messageSubject.next([...this.messageSubject.getValue(), message])
  }

  public subscribeToMessages(session: Session): void {
    this.apollo.subscribe<UserSendMessage>({
      query: USER_SEND_MESSAGE,
      variables: {
        ...session
      }
    }).subscribe({
      next: ({data}) => {
        this.setMessage(data!.userSendMessage.message)
      }
    })
  }
}
