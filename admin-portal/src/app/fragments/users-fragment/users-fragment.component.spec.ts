import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFragmentComponent } from './users-fragment.component';

describe('UsersFragmentComponent', () => {
  let component: UsersFragmentComponent;
  let fixture: ComponentFixture<UsersFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFragmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
