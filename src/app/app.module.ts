import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NewSessionComponent } from './session/new-session/new-session.component';
import { JoinSessionComponent } from './session/join-session/join-session.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { CurrentPlayersComponent } from './session/current-players/current-players.component';
import { NewMessageComponent } from './messages/new-message/new-message.component';
import { DisplayMessagesComponent } from './messages/display-messages/display-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NewSessionComponent,
    JoinSessionComponent,
    NewUserComponent,
    CurrentPlayersComponent,
    NewMessageComponent,
    DisplayMessagesComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
