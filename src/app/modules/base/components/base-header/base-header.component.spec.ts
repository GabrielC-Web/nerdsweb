import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseHeaderComponent } from './base-header.component';

describe('BaseHeaderComponent', () => {
  let component: BaseHeaderComponent;
  let fixture: ComponentFixture<BaseHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseHeaderComponent]
    });
    fixture = TestBed.createComponent(BaseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
