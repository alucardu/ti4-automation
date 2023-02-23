import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySessionsComponent } from './display-sessions.component';

describe('DisplaySessionsComponent', () => {
  let component: DisplaySessionsComponent;
  let fixture: ComponentFixture<DisplaySessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySessionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
