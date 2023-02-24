import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material/material.module';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './session/create-session/create-session.component';
import { JoinSessionComponent } from './session/join-session/join-session.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CurrentusersComponent } from './user/current-users/current-users.component';
import { CreateMessageComponent } from './messages/create-message/create-message.component';
import { DisplayMessagesComponent } from './messages/display-messages/display-messages.component';
import { RefreshMessagesComponent } from './messages/refresh-messages/refresh-messages.component';
import { DisplaySessionsComponent } from './session/display-sessions/display-sessions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CreateSessionComponent,
    JoinSessionComponent,
    CreateUserComponent,
    CurrentusersComponent,
    CreateMessageComponent,
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
