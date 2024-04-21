import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBackofficesOptionsComponent } from './dashboard-backoffices-options.component';

describe('DashboardBackofficesOptionsComponent', () => {
  let component: DashboardBackofficesOptionsComponent;
  let fixture: ComponentFixture<DashboardBackofficesOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardBackofficesOptionsComponent]
    });
    fixture = TestBed.createComponent(DashboardBackofficesOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
