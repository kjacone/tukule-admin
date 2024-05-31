import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdriverComponent } from './newdriver.component';

describe('NewdriverComponent', () => {
  let component: NewdriverComponent;
  let fixture: ComponentFixture<NewdriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewdriverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewdriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
