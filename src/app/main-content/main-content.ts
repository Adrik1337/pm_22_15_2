import { Component, input, output } from '@angular/core';
import { ResumeData } from '../models/resume.model';
import { AboutComponent } from './about';
import { SoftwareSkillsComponent } from './skills';
import { ExperienceComponent } from './experience';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [AboutComponent, SoftwareSkillsComponent, ExperienceComponent],
  template: `
    <div class="main-content">
      <app-about [aboutText]="data().about" />
      <app-software-skills [skills]="data().skills" (skillSelect)="skillSelect.emit($event)" />
      <app-experience [experience]="data().experience" />
    </div>
  `,
  styleUrls: ['./main-content.scss']
})
export class MainContentComponent {
  data = input.required<ResumeData>();
  skillSelect = output<string>();
}