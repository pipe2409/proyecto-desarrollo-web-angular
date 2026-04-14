import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionesFormComponent } from './habitaciones-form.component';

describe('HabitacionesFormComponent', () => {
  let component: HabitacionesFormComponent;
  let fixture: ComponentFixture<HabitacionesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitacionesFormComponent]
    });
    fixture = TestBed.createComponent(HabitacionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
