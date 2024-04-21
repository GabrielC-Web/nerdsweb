import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartLayoutComponent } from './shopping-cart-layout.component';

describe('ShoppingCartLayoutComponent', () => {
  let component: ShoppingCartLayoutComponent;
  let fixture: ComponentFixture<ShoppingCartLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartLayoutComponent]
    });
    fixture = TestBed.createComponent(ShoppingCartLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
