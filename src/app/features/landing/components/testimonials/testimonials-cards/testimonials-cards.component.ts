import { Component, Input } from '@angular/core';
import { Testimonial } from '../../../../../modelo/Testimonial';

@Component({
  selector: 'app-testimonials-cards',
  templateUrl: './testimonials-cards.component.html',
  styleUrls: ['./testimonials-cards.component.scss']
})
export class TestimonialsCardsComponent {
  @Input() testimonial!: Testimonial;
}
