import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailLayoutComponent } from './order-detail.component';

describe('OrderDetailLayoutComponent', () => {
  let component: OrderDetailLayoutComponent;
  let fixture: ComponentFixture<OrderDetailLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailLayoutComponent]
    });
    fixture = TestBed.createComponent(OrderDetailLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
