import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSocialmediaComponent } from './products-socialmedia.component';

describe('ProductsSocialmediaComponent', () => {
  let component: ProductsSocialmediaComponent;
  let fixture: ComponentFixture<ProductsSocialmediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsSocialmediaComponent]
    });
    fixture = TestBed.createComponent(ProductsSocialmediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
