import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sidebar-header',
  standalone: true,
  template: `
    <h1 class="name">{{ name() }}</h1>
    <h1 class="lastName">{{ lastName() }}</h1>
    <p class="role">{{ role() }}</p>
  `,
  styleUrls: ['./sidebar-header.scss']
})
export class SidebarHeaderComponent {
  name = input.required<string>();
  lastName = input.required<string>();
  role = input.required<string>();
}