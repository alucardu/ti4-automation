import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import messageOperations from 'src/operations/messageOperations';
import { CreateMessage } from 'src/types/messageTypes';
import { Session } from 'src/types/sessionTypes';
import { User } from 'src/types/userTypes';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent {
  @Input() session!: Session;
  @Input() user!: User;

  public message = new FormControl('', [
    Validators.required,
    Validators.maxLength(164)
  ])

  constructor(
    private apollo: Apollo,
    private messageService: MessageService
  ) {}

  public sendMessage(): void {
    this.apollo.mutate<CreateMessage>({
      mutation: messageOperations.CREATE_MESSAGE,
      variables: {
        sessionId: this.session.id,
        userId: this.user.id,
        message: this.message.value
      }
    }).subscribe({
      next: ({data}) => {
        console.log(data)
        this.messageService.setMessage(data!.createMessage)
      },
      error: (err) => console.log(err)
    })
  }
}
