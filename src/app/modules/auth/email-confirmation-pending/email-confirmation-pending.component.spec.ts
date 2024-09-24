import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmationPendingComponent } from './email-confirmation-pending.component';

describe('EmailConfirmationPendingComponent', () => {
  let component: EmailConfirmationPendingComponent;
  let fixture: ComponentFixture<EmailConfirmationPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailConfirmationPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConfirmationPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
