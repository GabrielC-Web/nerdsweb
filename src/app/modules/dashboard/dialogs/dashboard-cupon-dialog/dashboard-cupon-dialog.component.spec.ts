import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCuponDialogComponent } from './dashboard-cupon-dialog.component';

describe('DashboardCuponDialogComponent', () => {
  let component: DashboardCuponDialogComponent;
  let fixture: ComponentFixture<DashboardCuponDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCuponDialogComponent]
    });
    fixture = TestBed.createComponent(DashboardCuponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
