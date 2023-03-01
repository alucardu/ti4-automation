import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_SESSIONS } from 'src/operations/sessionOperations/queries';
import { GetSessions } from 'src/types/sessionTypes';
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
  ) {}

  public getSessions(): void {
    this.sessionsQuery = this.apollo.watchQuery<GetSessions>({
      query: GET_SESSIONS,
    })

    this.sessionsQuery.valueChanges.subscribe(({data}) => {
      this.sessionService.setSessions(data.getSessions)
    })
  }
}
