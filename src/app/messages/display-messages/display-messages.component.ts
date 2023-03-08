import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_MESSAGES } from 'src/operations/messageOperations/queries';
import { Session } from 'src/types/sessionTypes';
import { MessageService } from '../message.service';
import { GetMessages } from 'src/types/messageTypes';

@Component({
  selector: 'app-display-messages',
  templateUrl: './display-messages.component.html',
  styleUrls: ['./display-messages.component.scss'],
})
export class DisplayMessagesComponent implements OnInit, AfterViewInit {
  @Input() session!: Session;

  protected messages$ = this.messageService.messages$;

  constructor(
    private apollo: Apollo,
    private messageService: MessageService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    this.getMessages(this.session);
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, "max-height", `${this.el.nativeElement.offsetHeight}px`);
    });
  }

  public getMessages(session: Session): void {
    this.apollo
      .query<GetMessages>({
        query: GET_MESSAGES,
        variables: {
          sessionId: session.id,
        },
      })
      .subscribe({
        next: ({ data }) => this.messageService.setMessages(data.getMessages),
      });
  }
}
