import { Component, Input } from '@angular/core';
import { Session } from '@prisma/client';
import { Apollo, QueryRef } from 'apollo-angular';
import { NotificationService, notificationType } from 'src/app/material/notification.service';
import messageOperations from 'src/operations/messageOperations';
import { GetMessages } from 'src/types/messageTypes';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-refresh-messages',
  templateUrl: './refresh-messages.component.html',
  styleUrls: ['./refresh-messages.component.scss']
})
export class RefreshMessagesComponent {
  @Input() session!: Session

  protected messages$ = this.messageService.messages$;

  private messagesQuery!: QueryRef<GetMessages>;

  constructor(
    private apollo: Apollo,
    private messageService: MessageService,
    private notificationService: NotificationService
  ) {}

  public refreshMessages(): void {
   this.messagesQuery = this.apollo.watchQuery<GetMessages>({
    fetchPolicy: 'cache-and-network',
    query: messageOperations.GET_MESSAGES,
    variables: {
      sessionId: this.session.id
    }
   })

   this.messagesQuery.valueChanges.subscribe(({data}) => {
    this.messageService.setMessages(data.getMessages)
    this.notificationService.openSnackBar('Messages have been refreshed', notificationType.SUCCESS)
  })
  }
}
