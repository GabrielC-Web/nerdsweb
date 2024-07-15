import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOrderDialogComponent } from './validate-order-dialog.component';

describe('ValidateOrderDialogComponent', () => {
  let component: ValidateOrderDialogComponent;
  let fixture: ComponentFixture<ValidateOrderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateOrderDialogComponent]
    });
    fixture = TestBed.createComponent(ValidateOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
