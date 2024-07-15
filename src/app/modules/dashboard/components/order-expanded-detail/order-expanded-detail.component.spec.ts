import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderExpandedDetailComponent } from './order-expanded-detail.component';

describe('OrderExpandedDetailComponent', () => {
  let component: OrderExpandedDetailComponent;
  let fixture: ComponentFixture<OrderExpandedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderExpandedDetailComponent]
    });
    fixture = TestBed.createComponent(OrderExpandedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
