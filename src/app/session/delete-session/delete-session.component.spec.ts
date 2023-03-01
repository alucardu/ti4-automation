import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSessionComponent } from './delete-session.component';

describe('DeleteSessionComponent', () => {
  let component: DeleteSessionComponent;
  let fixture: ComponentFixture<DeleteSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
