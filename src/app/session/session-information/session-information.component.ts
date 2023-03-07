import { Component, Input } from '@angular/core';
import { Session } from 'src/types/sessionTypes';
import { User } from 'src/types/userTypes';
import { Clipboard } from '@angular/cdk/clipboard';
import { NotificationService, notificationType } from 'src/app/material/notification.service';

@Component({
  selector: 'app-session-information',
  templateUrl: './session-information.component.html',
  styleUrls: ['./session-information.component.scss'],
})
export class SessionInformationComponent {
  @Input() session!: Session;
  @Input() user!: User;

  constructor(
    private clipBoard: Clipboard,
    private notificationService: NotificationService
  ) {}

  public copyCode(): void {
    this.clipBoard.copy(this.session.code);
    this.notificationService.openSnackBar(
      `Copied code: ${this.session.code}`,
      notificationType.INFO
    );
  }
}
