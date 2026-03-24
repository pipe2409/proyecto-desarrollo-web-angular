import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposHabitacionAdminComponent } from './tipos-habitacion-admin.component';

describe('TiposHabitacionAdminComponent', () => {
  let component: TiposHabitacionAdminComponent;
  let fixture: ComponentFixture<TiposHabitacionAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposHabitacionAdminComponent]
    });
    fixture = TestBed.createComponent(TiposHabitacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
