import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPaysComponent } from './dashboard-pays.component';

describe('DashboardPaysComponent', () => {
  let component: DashboardPaysComponent;
  let fixture: ComponentFixture<DashboardPaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPaysComponent]
    });
    fixture = TestBed.createComponent(DashboardPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
