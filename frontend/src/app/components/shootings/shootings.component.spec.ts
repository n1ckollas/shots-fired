import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingsComponent } from './shootings.component';

describe('ShootingsComponent', () => {
  let component: ShootingsComponent;
  let fixture: ComponentFixture<ShootingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
