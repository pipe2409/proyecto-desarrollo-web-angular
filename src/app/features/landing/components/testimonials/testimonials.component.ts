import { Component } from '@angular/core';
import { Testimonial } from '../../../../modelo/Testimonial';
import { TESTIMONIALS_DATA } from '../../data/testimonials.data';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = TESTIMONIALS_DATA;
}