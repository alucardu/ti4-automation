import { Component, Input } from '@angular/core';
import { Session } from 'src/types/sessionTypes';
import { User } from 'src/types/userTypes';

@Component({
  selector: 'app-session-information',
  templateUrl: './session-information.component.html',
  styleUrls: ['./session-information.component.scss']
})
export class SessionInformationComponent {
  @Input() session!: Session
  @Input() user!: User
}
