import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEcommerceComponent } from './products-ecommerce.component';

describe('ProductsEcommerceComponent', () => {
  let component: ProductsEcommerceComponent;
  let fixture: ComponentFixture<ProductsEcommerceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsEcommerceComponent]
    });
    fixture = TestBed.createComponent(ProductsEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
