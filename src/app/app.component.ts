import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_HELLO = gql`
  query ExampleQuery {
    hello
  }
`

type Hello = {
  hello: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public title = 'ti4-automation';
  public loading = false;
  public something: string = "Old world..."

  constructor(private apollo: Apollo) {}

  public ngOnInit(): void {
    this.apollo.query<Hello>({
      query: GET_HELLO
    }).subscribe((
      { data, loading}) => {
        this.loading = true;
        setTimeout(() => {
          this.something = data.hello;
          this.loading = loading;
        }, 2500)
      })
  }
}
