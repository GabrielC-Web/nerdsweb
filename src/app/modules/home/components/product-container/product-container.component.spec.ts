import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCOntainerComponent } from './product-container.component';

describe('ProductCOntainerComponent', () => {
  let component: ProductCOntainerComponent;
  let fixture: ComponentFixture<ProductCOntainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCOntainerComponent]
    });
    fixture = TestBed.createComponent(ProductCOntainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
