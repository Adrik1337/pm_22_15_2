import { Component, input } from '@angular/core';
import { ResumeData } from '../models/resume.model';

@Component({
  selector: 'app-education',
  standalone: true,
  template: `
    <section class="section">
      <h3>Education</h3>
      @for (edu of education(); track edu.degree) {
        <div class="item-block">
          <span class="meta-text">Year: {{ edu.years }}</span>
          <h4>{{ edu.degree }}</h4>
          <p>{{ edu.college }}</p>
        </div>
      }
    </section>
  `,
  styleUrls: ['./education.scss']
})
export class EducationComponent {
  education = input.required<ResumeData['education']>();
}