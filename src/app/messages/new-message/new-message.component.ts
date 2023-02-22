import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { UserService } from 'src/app/user/new-user/user.service';
import messageOperations from 'src/operations/messageOperations';
import { Session } from 'src/types/sessionTypes';
import { User } from 'src/types/userTypes';

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
    private userService: UserService,
  ) {}

  public sendMessage(): void {
    this.apollo.mutate({
      mutation: messageOperations.CREATE_MESSAGE,
      variables: {
        sessionId: this.session.id,
        userId: this.user.id,
        message: this.message.value
      }
    }).subscribe({
      next: ({data}) => console.log(data),
      error: (err) => console.log(err)
    })
  }
}
