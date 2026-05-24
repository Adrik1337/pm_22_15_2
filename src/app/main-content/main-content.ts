import { Component, input, output } from '@angular/core';
import { ResumeData } from '../models/resume.model';

@Component({
  selector: 'app-main-content',
  standalone: true,
  template: `
  <div class="main-content">
    <div class="image-container">
      <img src="Jhon.jpg" alt="Jhon Parker Profile Photo" class="profile-image">
    </div>
      
      @if (data().about) {
        <div class="about-box">
          <h3>About</h3>
          <p>{{ data().about }}</p>
        </div>
      }

      <section class="section-right">
        <h3 class="title-dark">Software Skill</h3>
        <div class="skills-grid">
          @for (skill of data().skills; track skill.name) {
            <div class="skill-row" (click)="onSkillClick(skill.name)">
              <span class="skill-name">{{ skill.name }}</span>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="skill.level * 20"></div>
              </div>
            </div>
          }
        </div>
      </section>

      <section class="section-right">
        <h3 class="title-dark">Experience</h3>
        <div class="experience-list">
          @for (exp of data().experience; track exp.role) {
            <div class="exp-block">
              <h4>{{ exp.role }}</h4>
              <span class="company-timeline">{{ exp.company }} / {{ exp.period }}</span>
              <p class="desc">{{ exp.description }}</p>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .main-content { background: #fff; }
    .image-placeholder { width: 100%; height: 100%; background: #e2e2e2; position: relative;}
    .photo-bg { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: #c8c8cb; color: #555; font-size: 12px; letter-spacing: 2px; font-weight: bold;}
    .about-box { background: #0f141c; color: #fff; padding: 30px; margin-bottom: 30px; }
    .about-box h3 { margin: 0 0 10px 0; font-size: 15px; letter-spacing: 1.5px; font-weight: bold; background: #ffffff; color: #0f141c; padding: 0px 10px; display: inline-block; }
    .about-box p { margin: 0; font-size: 12px; line-height: 1.6; color: #b7b9bc; text-align: justify; }
    .section-right { padding: 10px; margin-bottom: 30px; }
    .title-dark { width: 160px; background: #000000; color: #fff; padding: 3px 10px; display: inline-block; font-size: 16px; letter-spacing: 1.5px; margin: 0 0 15px 0; margin-bottom: 30px; }
    .skill-row { display: flex; align-items: center; margin-bottom: 12px; cursor: pointer; }
    .skill-name { width: 150px; font-size: 14px; color: #333; font-weight: 600; }
    .progress-bar { width: 17px; background: #e8e8e8; height: 5px; position: relative; margin-left: 10px; display: inline-block; vertical-align: middle;}
    .progress-fill { background: #000; height: 100%; }
    .exp-block { margin-bottom: 20px; margin-right: 70px;}
    .exp-block h4 { margin: 0 0 3px 0; font-size: 15px; color: #000; font-weight: 600; }
    .company-timeline { font-size: 12px; color: #666; font-weight: 600;}
    .desc { margin: 10px 0 0 0; font-size: 13px; color: #444; line-height: 1.5; text-align: justify; }
  `]
})
export class MainContentComponent {
  data = input.required<ResumeData>();
  skillSelect = output<string>();

  onSkillClick(skillName: string) {
    this.skillSelect.emit(skillName);
  }
}