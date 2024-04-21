import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMetodsComponent } from './payments-metods.component';

describe('PaymentsMetodsComponent', () => {
  let component: PaymentsMetodsComponent;
  let fixture: ComponentFixture<PaymentsMetodsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsMetodsComponent]
    });
    fixture = TestBed.createComponent(PaymentsMetodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
