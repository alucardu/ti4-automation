import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo, QueryRef } from 'apollo-angular';

import sessionOperations from 'src/operations/sessionOperations';
import { stringIsSetAndFilled } from 'src/app/util/stringUtils';
import { SessionService } from '../session.service';
import { GetSession, Session } from 'src/types/sessionTypes';

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent {
  private sessionQuery!: QueryRef<GetSession>;

  public sessionCode = new FormControl('', [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.minLength(6),
  ])

  public errorMessage: boolean = false;
  public session!: Session | null;

  constructor(
    private apollo: Apollo,
    private sessionService: SessionService,
  ) {}

  public joinSession(sessionCode: FormControl) {
    this.sessionQuery = this.apollo.watchQuery<GetSession>({
      query: sessionOperations.GET_SESSION,
      variables: {
        code: sessionCode.value
      }
    })

    this.sessionQuery.valueChanges.subscribe({
      next: ({data}) => {
        if (stringIsSetAndFilled(data.getSession?.code)) {
          this.errorMessage = false;
          this.session = data.getSession
          this.sessionService.setSession(data.getSession)
        } else {
          this.errorMessage = true;
          this.session = null
        }
      },
      error: (err) => console.log(err)
    })
  }
}
