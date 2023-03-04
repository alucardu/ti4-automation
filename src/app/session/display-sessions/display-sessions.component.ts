import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UserService } from 'src/app/user/create-user/user.service';
import { GET_SESSIONS } from 'src/operations/sessionOperations/queries';
import { GetSessions } from 'src/types/sessionTypes';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-display-sessions',
  templateUrl: './display-sessions.component.html',
  styleUrls: ['./display-sessions.component.scss']
})
export class DisplaySessionsComponent implements OnInit {
  protected sessions$ = this.sessionService.sessions$
  protected user$ = this.userService.user$

  constructor(
    private apollo: Apollo,
    private sessionService: SessionService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.getSessions();
  }

  public getSessions(): void {
    this.apollo.query<GetSessions>({
      query: GET_SESSIONS,
    }).subscribe({
      next: ({data}) => this.sessionService.setSessions(data.getSessions)
    })
  }
}
