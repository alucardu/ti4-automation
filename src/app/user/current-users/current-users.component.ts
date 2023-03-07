import { Component, Input, OnInit } from '@angular/core';
import { Session } from 'src/types/sessionTypes';
import { BreakpointObserver,  BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.scss'],
})
export class CurrentusersComponent implements OnInit {
  @Input() session!: Session;
  public showPlayers = true;
  public showPlayerToggleBtn = false;

  readonly breakpoint$ = this.breakpointObserver;
  currentBreakpoint = '';

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showPlayers = false;
          this.showPlayerToggleBtn = true;
        }
      });
  }

  public togglePlayers(): void {
    this.showPlayers = !this.showPlayers;
  }
}
