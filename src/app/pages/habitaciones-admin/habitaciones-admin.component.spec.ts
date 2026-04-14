import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionesAdminComponent } from './habitaciones-admin.component';

describe('HabitacionesAdminComponent', () => {
  let component: HabitacionesAdminComponent;
  let fixture: ComponentFixture<HabitacionesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitacionesAdminComponent]
    });
    fixture = TestBed.createComponent(HabitacionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
