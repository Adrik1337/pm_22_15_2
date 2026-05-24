import { Component, input } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="section">
      <h3>Contact</h3>
      <div class="contact-info">
        <p><strong>Phone</strong><br>{{ phone() }}</p>
        <p><strong>Email</strong><br>{{ email() }}</p>
        <p><strong>Address</strong><br>{{ address() }}</p>
      </div>
    </section>
  `,
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  phone = input.required<string>();
  email = input.required<string>();
  address = input.required<string>();
}