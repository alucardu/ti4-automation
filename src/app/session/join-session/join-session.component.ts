import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';

import sessionOperations from 'src/operations/sessionOperations';
import { stringIsSetAndFilled } from 'src/app/util/stringUtils';
import { SessionService } from '../session.service';
import { GetSession, Session } from 'src/types/sessionTypes';

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent implements OnDestroy {
  private sessionQuery!: QueryRef<GetSession>;
  private getSessionSubscription: Subscription = new Subscription;

  public code = new FormControl('', [
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

  public joinSession(code: FormControl) {
    this.sessionQuery = this.apollo.watchQuery<GetSession>({
      fetchPolicy: 'cache-and-network',
      query: sessionOperations.GET_SESSION,
      variables: {
        code: code.value
      }
    })

    this.getSessionSubscription = this.sessionQuery.valueChanges.subscribe(({data}) => {
      if (stringIsSetAndFilled(data.getSession?.code)) {
        this.errorMessage = false;
        this.session = data.getSession
        this.sessionService.setSession(data.getSession)
      } else {
        this.errorMessage = true;
        this.session = null
      }
    })
  }

  public ngOnDestroy(): void {
    this.getSessionSubscription.unsubscribe();
  }
}
