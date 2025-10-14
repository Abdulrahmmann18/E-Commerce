import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassCodeComponent } from './reset-pass-code.component';

describe('ResetPassCodeComponent', () => {
  let component: ResetPassCodeComponent;
  let fixture: ComponentFixture<ResetPassCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPassCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPassCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
