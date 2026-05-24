import { Component, input } from '@angular/core';
import { ResumeData } from '../models/resume.model';
import { SidebarHeaderComponent } from './sidebar-header';
import { ContactComponent } from './contact';
import { EducationComponent } from './education';
import { ReferenceComponent } from './reference';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarHeaderComponent, ContactComponent, EducationComponent, ReferenceComponent],
  template: `
    <div class="sidebar">
      <app-sidebar-header [name]="data().name" [lastName]="data().lastName" [role]="data().role" />
      <app-contact [phone]="data().phone" [email]="data().email" [address]="data().address" />
      <app-education [education]="data().education" />
      <app-reference [references]="data().references" />
    </div>
  `,
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  data = input.required<ResumeData>();
}