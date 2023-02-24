import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentusersComponent } from './current-users.component';

describe('CurrentPlayersComponent', () => {
  let component: CurrentusersComponent;
  let fixture: ComponentFixture<CurrentusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
