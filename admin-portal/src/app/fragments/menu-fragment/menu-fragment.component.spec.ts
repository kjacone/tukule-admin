import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFragmentComponent } from './menu-fragment.component';

describe('MenuFragmentComponent', () => {
  let component: MenuFragmentComponent;
  let fixture: ComponentFixture<MenuFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFragmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
