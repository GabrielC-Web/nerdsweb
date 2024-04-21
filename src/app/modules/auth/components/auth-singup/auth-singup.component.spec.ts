import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSingupComponent } from './auth-singup.component';

describe('AuthSingupComponent', () => {
  let component: AuthSingupComponent;
  let fixture: ComponentFixture<AuthSingupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthSingupComponent]
    });
    fixture = TestBed.createComponent(AuthSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
