import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum notificationType {
  WARNING = 'warning',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private matSnackBar: MatSnackBar) {}

  public openSnackBar(
    message: string,
    type: notificationType,
    action?: string
  ): void {
    this.matSnackBar.open(message, action, {
      duration: 3000,
      panelClass: [type],
    });
  }
}
