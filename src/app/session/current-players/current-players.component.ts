import { Component, Input } from '@angular/core';
import { Session } from 'src/types/sessionTypes';

@Component({
  selector: 'app-current-players',
  templateUrl: './current-players.component.html',
  styleUrls: ['./current-players.component.scss']
})
export class CurrentPlayersComponent {
  @Input() session!: Session;
}
