import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshMessagesComponent } from './refresh-messages.component';

describe('RefreshMessagesComponent', () => {
  let component: RefreshMessagesComponent;
  let fixture: ComponentFixture<RefreshMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
