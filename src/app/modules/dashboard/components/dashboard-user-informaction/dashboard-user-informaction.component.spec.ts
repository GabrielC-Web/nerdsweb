import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserInformactionComponent } from './dashboard-user-informaction.component';

describe('DashboardUserInformactionComponent', () => {
  let component: DashboardUserInformactionComponent;
  let fixture: ComponentFixture<DashboardUserInformactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardUserInformactionComponent]
    });
    fixture = TestBed.createComponent(DashboardUserInformactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
