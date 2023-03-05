import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { MaterialModule } from './material/material/material.module';
import { CreateMessageComponent } from './messages/create-message/create-message.component';
import { DisplayMessagesComponent } from './messages/display-messages/display-messages.component';
import { CreateSessionComponent } from './session/create-session/create-session.component';
import { DeleteSessionComponent } from './session/delete-session/delete-session.component';
import { JoinSessionComponent } from './session/join-session/join-session.component';
import { SessionInformationComponent } from './session/session-information/session-information.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CurrentusersComponent } from './user/current-users/current-users.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSessionComponent,
    JoinSessionComponent,
    CreateUserComponent,
    CurrentusersComponent,
    CreateMessageComponent,
    DisplayMessagesComponent,
    DeleteSessionComponent,
    SessionInformationComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
