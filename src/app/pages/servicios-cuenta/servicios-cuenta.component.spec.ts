import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosCuentaComponent } from './servicios-cuenta.component';

describe('ServiciosCuentaComponent', () => {
  let component: ServiciosCuentaComponent;
  let fixture: ComponentFixture<ServiciosCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiciosCuentaComponent]
    });
    fixture = TestBed.createComponent(ServiciosCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
