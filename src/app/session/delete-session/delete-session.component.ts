import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NotificationService,  notificationType } from 'src/app/material/notification.service';
import { DELETE_SESSION } from 'src/operations/sessionOperations/mutations';
import { DeleteSession, Session } from 'src/types/sessionTypes';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-delete-session',
  templateUrl: './delete-session.component.html',
  styleUrls: ['./delete-session.component.scss'],
})
export class DeleteSessionComponent {
  @Input() session!: Session;

  constructor(
    private apollo: Apollo,
    private notificationService: NotificationService,
    private sessionService: SessionService
  ) {}

  public deleteSession(index: number): void {
    this.apollo.mutate<DeleteSession>({
      mutation: DELETE_SESSION,
      variables: {
        id: index,
      },
    }).subscribe({
      next: ({ data }) => {
        this.notificationService.openSnackBar(
          `Removed session: ${data?.deleteSession.session.name}`,
          notificationType.SUCCESS
        );
        this.sessionService.setSessions(data!.deleteSession.sessions);
        this.sessionService.setSession(null);
      },
    });
  }
}
