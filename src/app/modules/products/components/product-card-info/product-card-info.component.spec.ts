import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardInfoComponent } from './product-card-info.component';

describe('ProductCardInfoComponent', () => {
  let component: ProductCardInfoComponent;
  let fixture: ComponentFixture<ProductCardInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardInfoComponent]
    });
    fixture = TestBed.createComponent(ProductCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
