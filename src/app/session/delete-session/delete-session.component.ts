import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private sessionService: SessionService,
    private dialog: MatDialog
  ) {}

  public openDeleteDialog(session: Session): void {
    const dialogRef = this.dialog.open(DialogDeleteSessionComponent, {
      data: {...session},
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) this.deleteSession(session.id);
    });
  }

  private deleteSession(index: number): void {
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

@Component({
  selector: 'app-dialog-delete-session',
  templateUrl: 'dialog-delete-session.html',
})
export class DialogDeleteSessionComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteSessionComponent>,
    @Inject(MAT_DIALOG_DATA) public session: Session,
  ) {}
}
