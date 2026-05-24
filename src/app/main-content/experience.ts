import { Component, input } from '@angular/core';
import { ResumeData } from '../models/resume.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section class="section-right">
      <h3 class="title-dark">Experience</h3>
      <div class="experience-list">
        @for (exp of experience(); track exp.role) {
          <div class="exp-block">
            <h4>{{ exp.role }}</h4>
            <span class="company-timeline">{{ exp.company }} / {{ exp.period }}</span>
            <p class="desc">{{ exp.description }}</p>
          </div>
        }
      </div>
    </section>
  `,
  styleUrls: ['./experience.scss']
})
export class ExperienceComponent {
  experience = input.required<ResumeData['experience']>();
}