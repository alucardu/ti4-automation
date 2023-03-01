import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { CREATE_MESSAGE } from 'src/operations/messageOperations/mutations';
import { CreateMessage } from 'src/types/messageTypes';
import { Session } from 'src/types/sessionTypes';
import { User } from 'src/types/userTypes';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent {
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
      mutation: CREATE_MESSAGE,
      variables: {
        sessionId: this.session.id,
        userId: this.user.id,
        message: this.message.value
      }
    }).subscribe({
      next: ({data}) => {
        data ? this.messageService.setMessage(data.createMessage) : null
        this.message.reset();
      },
      error: (err) => console.log(err)
    })
  }
}
