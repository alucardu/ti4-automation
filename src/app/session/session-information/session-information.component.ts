import { Component, Input } from '@angular/core';
import { Session } from 'src/types/sessionTypes';

@Component({
  selector: 'app-session-information',
  templateUrl: './session-information.component.html',
  styleUrls: ['./session-information.component.scss']
})
export class SessionInformationComponent {
  @Input() session!: Session
}
