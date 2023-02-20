import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPlayersComponent } from './current-players.component';

describe('CurrentPlayersComponent', () => {
  let component: CurrentPlayersComponent;
  let fixture: ComponentFixture<CurrentPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentPlayersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
