import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyDetailsComponent } from './supply-details.component';

describe('SupplyDetailsComponent', () => {
  let component: SupplyDetailsComponent;
  let fixture: ComponentFixture<SupplyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplyDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
