import { Component, Input } from '@angular/core';
import { Session } from 'src/types/sessionTypes';

@Component({
  selector: 'app-current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.scss'],
})
export class CurrentusersComponent {
  @Input() session!: Session;
}
