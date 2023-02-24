import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material/material.module';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NewSessionComponent } from './session/new-session/new-session.component';
import { JoinSessionComponent } from './session/join-session/join-session.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { CurrentusersComponent } from './user/current-users/current-users.component';
import { NewMessageComponent } from './messages/new-message/new-message.component';
import { DisplayMessagesComponent } from './messages/display-messages/display-messages.component';
import { RefreshMessagesComponent } from './messages/refresh-messages/refresh-messages.component';
import { DisplaySessionsComponent } from './session/display-sessions/display-sessions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NewSessionComponent,
    JoinSessionComponent,
    NewUserComponent,
    CurrentusersComponent,
    NewMessageComponent,
    DisplayMessagesComponent,
    RefreshMessagesComponent,
    DisplaySessionsComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
