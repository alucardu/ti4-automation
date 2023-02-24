import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { NotificationService, notificationType } from 'src/app/material/notification.service';
import sessionOperations from 'src/operations/sessionOperations';
import { DeleteSession, GetSessions } from 'src/types/sessionTypes';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-display-sessions',
  templateUrl: './display-sessions.component.html',
  styleUrls: ['./display-sessions.component.scss']
})
export class DisplaySessionsComponent implements OnInit {
  private sessionsQuery!: QueryRef<GetSessions>;

  protected sessions$ = this.sessionService.sessions$

  public ngOnInit(): void {
    this.getSessions();
  }

  constructor(
    private apollo: Apollo,
    private sessionService: SessionService,
    private notificationService: NotificationService
  ) {}

  private getSessions(): void {
    this.sessionsQuery = this.apollo.watchQuery<GetSessions>({
      query: sessionOperations.GET_SESSIONS,
    })

    this.sessionsQuery.valueChanges.subscribe(({data}) => {
      this.sessionService.setSessions(data.getSessions)
    })
  }

  public deleteSession(index: number): void {
    this.apollo.mutate<DeleteSession>({
      mutation: sessionOperations.DELETE_SESSION,
      variables: {
        id: index,
      },
    }).subscribe({
      next: ({data}) => {
        this.notificationService.openSnackBar(`Removed session: ${data?.deleteSession.name}`, notificationType.SUCCESS)
        this.sessionsQuery.refetch()},
    });
  }
}
