import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFragmentComponent } from './order-fragment.component';

describe('OrderFragmentComponent', () => {
  let component: OrderFragmentComponent;
  let fixture: ComponentFixture<OrderFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFragmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
