import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingFloatButtonComponent } from './shopping-float-button.component';

describe('ShoppingFloatButtonComponent', () => {
  let component: ShoppingFloatButtonComponent;
  let fixture: ComponentFixture<ShoppingFloatButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingFloatButtonComponent]
    });
    fixture = TestBed.createComponent(ShoppingFloatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
