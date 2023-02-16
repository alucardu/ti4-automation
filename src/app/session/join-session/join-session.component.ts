import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';

import * as sessionType from 'src/types/sessionTypes';
import sessionOperations from 'src/operations/sessionOperations';
import { stringIsSetAndFilled } from 'src/app/util/stringUtils';

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent implements OnDestroy {
  private sessionQuery!: QueryRef<sessionType.GetSession>;
  private getSessionSubscription: Subscription = new Subscription;

  public code = new FormControl('', [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.minLength(6),
  ])

  public errorMessage: boolean = false;
  public session!: sessionType.Session | null;

  constructor(
    private apollo: Apollo
  ) {}

  public joinSession(code: FormControl) {
    this.sessionQuery = this.apollo.watchQuery<sessionType.GetSession>({
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
