import { Component, input } from '@angular/core';
import { ResumeData } from '../models/resume.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <div class="sidebar">
      <h1 class="name">{{ data().name }}</h1>
      <h1 class="lastName">{{ data().lastName }}</h1>
      <p class="role">{{ data().role }}</p>

      <section class="section">
        <h3>Contact</h3>
        <div class="contact-info">
          <p><strong>Phone</strong><br>{{ data().phone }}</p>
          <p><strong>Email</strong><br>{{ data().email }}</p>
          <p><strong>Address</strong><br>{{ data().address }}</p>
        </div>
      </section>

      <section class="section">
        <h3>Education</h3>
        @for (edu of data().education; track edu.degree) {
          <div class="item-block">
            <span class="meta-text">Year: {{ edu.years }}</span>
            <h4>{{ edu.degree }}</h4>
            <p>{{ edu.college }}</p>
          </div>
        }
      </section>

      <section class="section">
        <h3>Reference</h3>
        @for (ref of data().references; track ref.name) {
          <div class="item-block">
            <h4>{{ ref.name }}</h4>
            <p>{{ ref.title }}</p>
            <span class="meta-text">Phone: {{ ref.phone }}</span>
          </div>
        }
      </section>
    </div>
  `,
  styles: [`
    .sidebar { padding: 70px 60px; background: #ffffff; }
    .name { font-size: 3.5rem; font-weight: 500; color: #000; margin: 0; line-height: 1; }
    .lastName { font-size: 3.5rem; font-weight: 900; color: #000; margin: 0; line-height: 1; }
    .role { font-size: 1.5rem; letter-spacing: 3px; color: #000000; margin: 5px 0 50px 0; font-weight: 600; }
    .section { margin-bottom: 40px; }
    .section h3 { width: 140px; background: #000; color: #fff; padding: 3px 10px; display: inline-block; font-size: 16px; letter-spacing: 1.5px; margin: 0 0 20px 0; }
    .contact-info p { margin: 10px 0; font-size: 13px; color: #333; line-height: 1.4; }
    .contact-info strong { font-size: 14px; color: #000; letter-spacing: 0.5px; }
    .item-block { margin-bottom: 30px; }
    .item-block h4 { margin: 4px 0; font-size: 14px; color: #000; font-weight: 500; }
    .item-block p { margin: 0; font-size: 13px; color: #565656; }
    .meta-text {font-size: 12px; color: #777; font-weight: 500; }
  `]
})
export class Sidebar {
  data = input.required<ResumeData>();
}