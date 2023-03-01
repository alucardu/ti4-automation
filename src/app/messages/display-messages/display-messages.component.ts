import { Component, Input, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_MESSAGES } from 'src/operations/messageOperations/queries';
import { Session } from 'src/types/sessionTypes';
import { MessageService } from '../message.service';
import { GetMessages } from 'src/types/messageTypes';

@Component({
  selector: 'app-display-messages',
  templateUrl: './display-messages.component.html',
  styleUrls: ['./display-messages.component.scss']
})
export class DisplayMessagesComponent implements OnInit {
  @Input() session!: Session;

  protected messages$ = this.messageService.messages$;

  private messagesQuery!: QueryRef<GetMessages>

  constructor(
    private apollo: Apollo,
    private messageService: MessageService,
  ) {}

  public ngOnInit(): void {
    this.getMessages(this.session);
  }

  public getMessages(session: Session): void {
    this.messagesQuery = this.apollo.watchQuery<GetMessages>({
      query: GET_MESSAGES,
      variables: {
        sessionId: session.id
      }
    })

    this.messagesQuery.valueChanges.subscribe(({data}) => {
      this.messageService.setMessages(data.getMessages)
    })
  }
}
