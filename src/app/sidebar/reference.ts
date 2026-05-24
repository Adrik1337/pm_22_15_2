import { Component, input } from '@angular/core';
import { ResumeData } from '../models/resume.model';

@Component({
  selector: 'app-reference',
  standalone: true,
  template: `
    <section class="section">
      <h3>Reference</h3>
      @for (ref of references(); track ref.name) {
        <div class="item-block">
          <h4>{{ ref.name }}</h4>
          <p>{{ ref.title }}</p>
          <span class="meta-text">Phone: {{ ref.phone }}</span>
        </div>
      }
    </section>
  `,
  styleUrls: ['./reference.scss']
})
export class ReferenceComponent {
  references = input.required<ResumeData['references']>();
}