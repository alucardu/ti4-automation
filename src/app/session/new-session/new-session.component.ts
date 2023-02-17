import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { Apollo, QueryRef } from 'apollo-angular';
import sessionOperations from 'src/operations/sessionOperations';
import * as sessionType from '../../../types/sessionTypes';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})

export class NewSessionComponent implements OnInit {
  private sessionsQuery!: QueryRef<sessionType.GetSessions>;

  public sessionName = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(16)
  ])

  constructor(private apollo: Apollo) {}

  public ngOnInit(): void {
    this.sessionsQuery = this.apollo.watchQuery<sessionType.GetSessions>({
      query: sessionOperations.GET_SESSIONS,
    })
  }

  public createSession(): void {
    this.apollo.mutate({
        mutation: sessionOperations.CREATE_SESSION,
        variables: {
          name: this.sessionName.value
        }
    }).subscribe({
      next: () => {
        this.sessionsQuery.refetch()
        this.sessionName.reset()
      },
      error: (e) => console.log(e),
    });
  }
}
