import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosPublicComponent } from './servicios-public.component';

describe('ServiciosPublicComponent', () => {
  let component: ServiciosPublicComponent;
  let fixture: ComponentFixture<ServiciosPublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiciosPublicComponent]
    });
    fixture = TestBed.createComponent(ServiciosPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
