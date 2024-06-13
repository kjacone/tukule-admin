import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodFragmentComponent } from './food-fragment.component';

describe('OrderFragmentComponent', () => {
  let component: FoodFragmentComponent;
  let fixture: ComponentFixture<FoodFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodFragmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
