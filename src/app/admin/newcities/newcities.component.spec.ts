import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcitiesComponent } from './newcities.component';

describe('NewcitiesComponent', () => {
  let component: NewcitiesComponent;
  let fixture: ComponentFixture<NewcitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewcitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
