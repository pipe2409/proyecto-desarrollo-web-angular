import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosFormsComponent } from './servicios-forms.component';

describe('ServiciosFormsComponent', () => {
  let component: ServiciosFormsComponent;
  let fixture: ComponentFixture<ServiciosFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiciosFormsComponent]
    });
    fixture = TestBed.createComponent(ServiciosFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
