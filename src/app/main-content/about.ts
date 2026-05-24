import { Component, input } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="image-container">
      <img src="Jhon.jpg" alt="Profile Photo" class="profile-image" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    
    @if (aboutText()) {
      <div class="about-box">
        <h3>About</h3>
        <p>{{ aboutText() }}</p>
      </div>
    }
  `,
  styleUrls: ['./about.scss']
})
export class AboutComponent {
  aboutText = input<string>('');
}