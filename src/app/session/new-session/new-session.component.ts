import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { Apollo, QueryRef } from 'apollo-angular';
import { NotificationService, notificationType } from 'src/app/material/notification.service';
import sessionOperations from 'src/operations/sessionOperations';
import { CreateSession, GetSessions } from 'src/types/sessionTypes';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})

export class NewSessionComponent implements OnInit {
  private sessionsQuery!: QueryRef<GetSessions>;

  public sessionName = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(24)
  ])

  constructor(
    private apollo: Apollo,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.sessionsQuery = this.apollo.watchQuery<GetSessions>({
      query: sessionOperations.GET_SESSIONS,
    })
  }

  public getErrorMessage(): string {
    if (this.sessionName.hasError('required')) {
      return 'A session name is required';
    }

    if (this.sessionName.hasError('minlength')) {
      return 'Session name must be between 4 and 16 charachters long';
    }

    if (this.sessionName.hasError('maxlength')) {
      return 'Session name cannot be longer than 16 characters';
    }

    return ''
  }

  public createSession(): void {
    this.apollo.mutate<CreateSession>({
        mutation: sessionOperations.CREATE_SESSION,
        variables: {
          name: this.sessionName.value
        }
    }).subscribe({
      next: ({data}) => {
        this.notificationService.openSnackBar(`Created session: ${data?.createSession.name}`, notificationType.SUCCESS)
        this.sessionsQuery.refetch()
        this.sessionName.reset()
      },
      error: (e) => console.log(e),
    });
  }
}
