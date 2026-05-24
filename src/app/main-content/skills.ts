import { Component, input, output } from '@angular/core';
import { ResumeData } from '../models/resume.model';

@Component({
  selector: 'app-software-skills',
  standalone: true,
  template: `
    <section class="section-right">
      <h3 class="title-dark">Software Skill</h3>
      <div class="skills-grid">
        @for (skill of skills(); track skill.name) {
          <div class="skill-row" (click)="skillSelect.emit(skill.name)">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="skill.level * 20"></div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styleUrls: ['./skills.scss']
})
export class SoftwareSkillsComponent {
  skills = input.required<ResumeData['skills']>();
  skillSelect = output<string>();
}