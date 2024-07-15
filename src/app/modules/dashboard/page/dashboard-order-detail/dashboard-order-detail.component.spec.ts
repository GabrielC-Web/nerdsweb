import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrderDetailComponent } from './dashboard-order-detail.component';

describe('DashboardOrderDetailComponent', () => {
  let component: DashboardOrderDetailComponent;
  let fixture: ComponentFixture<DashboardOrderDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardOrderDetailComponent]
    });
    fixture = TestBed.createComponent(DashboardOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
