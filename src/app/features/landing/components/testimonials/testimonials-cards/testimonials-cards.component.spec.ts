import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsCardsComponent } from './testimonials-cards.component';

describe('TestimonialsCardsComponent', () => {
  let component: TestimonialsCardsComponent;
  let fixture: ComponentFixture<TestimonialsCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialsCardsComponent]
    });
    fixture = TestBed.createComponent(TestimonialsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
